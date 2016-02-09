(function(){
	loginApp.service('auth', ['$http','$location','config', 'cookie', function($http, $location,config, cookie) {

   		this.login = function(username,password) {
			var body = 'username='+username+'&password='+password;
			return $http.post( config.serviceUrl + 'auth/login',body, {
				headers: { 'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'},
				withCredentials: true
			});
		}

		this.persistUsername = function(username) {
			cookie.create('username_'+config.cookie,username,30,'/',config.cookieDomain);
		}

		this.getUsername = function() {
			return cookie.read('username_'+config.cookie);
		}

		// send an email to the user with a link to reset their password. link expires after 72 hours
		this.requestReset = function(username) {
			return $http.post( config.serviceUrl + 'auth/resetHash?username='+username, {} );
		}

		// given a hash (temporary authorization), sets a new password for the user
		this.resetPassword = function(username,password,hash) {
			return $http.post( config.serviceUrl + 'auth/resetPassword?username='+escape(username)+'&password='+escape(password)+'&hash='+escape(hash), {} );
		}

		this.needHelp = function(replyto,message) {
			var body = 'message='+message;
			return $http.post( config.serviceUrl + 'auth/help/login?replyto='+escape(replyto),body,{
				headers: { 'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'},
				withCredentials: false
			});
		}
	}]);
})();