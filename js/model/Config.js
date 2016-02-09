/**
* fill out this file with your own configuration settings
*  this file should not be included in the build. In this position, it will serve as the default for loose-leaf setups.
* each environment should have its own copy of this file in /etc/, symlinked to dist/config
* it is picked up by index.html, using script src="/config/config.js"
*/
 
(function(){
	loginApp.service('config', function() {
		_.extend(this, getConfigFromURL());			
	});
	function getConfigFromURL() {
		var host = window.location.hostname;
		if (host.match('loc')) return CONFIG_LOC;
		if (host.match('alpha')) return CONFIG_ALPHA;
	}
	var CONFIG_LOC = {
    	environment:'LOCAL',
		serviceUrl: 'login rest api link', 
		appUrl: 'redirect to app link',		
		cookie: 'SESSIONID-LOC',
		cookieDomain: '.loc.domain.com',
	};
	var CONFIG_ALPHA = {
    	environment:'DEV',
		serviceUrl: 'login rest api link',
		appUrl: 'redirect to app link',		
		cookie: 'SESSIONID-DEV',
		cookieDomain: '.alpha.domain.com',
	};
})();