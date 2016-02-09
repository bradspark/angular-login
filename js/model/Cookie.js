// creating own simple cookie creation service as it's much lighter than ngCookies and it can't delete cookies

(function() {
	loginApp.service('cookie', function() {
		this.create = function(name,value,days,path,domain) {
		    if (days) {
		        var date = new Date();
		        date.setTime(date.getTime()+(days*24*60*60*1000));
		        var expires = "; expires="+date.toGMTString();
		    }
		    else var expires = "";
		    document.cookie = name+"="+value+expires+"; path="+(path||'/')+"; domain="+(domain||'');
		}
	});
})();