(function(){
	var injectables = [ '$location', '$routeParams', '$scope', '$timeout', 'auth', 'user' ];
	var LoginCtrl = function ($location, $routeParams, $scope, $timeout, auth, user) {
		var instance = $scope;
		$scope.mode = getMode() || 'login';
		$scope.data = {};

		function getMode() {
			var match = $location.path().match( /^\/?([^\/]+)/ );
			if (match) match = match[1].replace('/','-');
			return match;
		}

		$scope.setMode = function(mode) {
			$scope.mode = mode;
			$scope.status = '';
		}


		$scope.login = function() {
			instance.status = '';
			var data = instance.data;
			if (!data.email) return instance.status = 'Please enter an e-mail address.';
			if (!data.password) return instance.status = 'Please enter a password.';
			data.email = data.email.toLowerCase();
			auth.login( data.email, data.password )
				.success(function(data,status,headers,config,statusText){
					if (data != 'You have been logged in successfully') return alert('login error');
					// user.set(instance.data.email); // sets username in cookie
					auth.persistUsername(instance.data.email); // sets username in cookie
					//user.identify(); // indentifies user for analytics purposes
					var redirectUrl = decodeURIComponent(window.location.search);
					redirectUrl = redirectUrl.replace(/\?redirectTo=/, '');
					window.location = redirectUrl ? redirectUrl : config.appUrl + '/explore';
				})
				.error(function(data,status,headers,config,statusText) {
					console.log(data,status,headers,config,statusText);
					instance.status = status == 401 ? 'Invalid username or password' : 'An error occurred.';
				});
		}

		$scope.handleKey = function($event) {
			if ($event.keyCode==13 && $scope.mode === 'login') $scope.login();
		}


		$scope.requestReset = function() {
			if (!instance.data.email) return instance.status = 'Please enter your e-mail address.';
			auth.requestReset( instance.data.email )
				.success(function(data){
					$scope.mode = 'passwordReset_done';
				})
				.error(function(data,status){
					instance.status = 'An error has occurred. Please contact us or try again.';
				});
		}

		$scope.resetPassword = function() {
			if (!instance.data.email) return instance.status = 'Please enter your e-mail address.';
			if (!instance.data.password) return instance.status = 'Please enter a new password.';
			if (!$routeParams.hash) return instance.status = 'Error: no hash present. Please try "forgot password" again.';
			auth.resetPassword( instance.data.email, instance.data.password, $routeParams.hash )
				.success(function(data){
					instance.status = 'Password successfully changed. Logging in...';
					$timeout($scope.login(),1500);
				})
				.error(function(data,status){
					if (status==401) instance.status = 'Error: password was not changed. The request may have expired, or the email address may be invalid. Please try "forgot password" again.';
					else instance.status = 'error: '+status;
				})
		}

		$scope.loginHelp = function() {
			auth.needHelp( instance.data.email, instance.data.help )
				.success(function(data){
					$scope.mode = 'loginHelp_done';
				})
				.error(function(data,status){
					instance.status = 'There was a problem sending the email.';
				});
		}
	
	}
	loginApp.controller('LoginCtrl', LoginCtrl);
	LoginCtrl.$inject = injectables; 
})();