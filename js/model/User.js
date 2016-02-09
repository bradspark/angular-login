// from loginCtrl functions needed - indentify, set

(function(){
	loginApp.service('user', ['$http','$location','config', function($http, $location,config) {
		
		// login completed successfully; store username in a cookie
		// this.set = function(username) {
		// 	this.username = username;
		// 	auth.persistUsername(username);
		// }

	    this.identify = function() {
	    	// identify the user to analytics
	    	this.get().then(function(obj){
	    		$rootScope.$emit('identify',obj);
	    	});
	    }

	    this.get = function() {
			var promise = new Promise(function(resolve,reject){
				if (!_this.username) _this.username = auth.getUsername();
				if (!_this.username) return reject(new Error('Unable to get user. There is no stored username or user data.'));
				$http.get( config.nodeUrl+'user/'+_this.username )
					.success(function(data){ resolve(data) })
					.error(function(data){ reject(data) });
			});
			return promise;
		}

	}]);
})();