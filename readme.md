Login APP
=============

A generic login APP written to accomodate any login page to be created going forward. Right now it is written in AngularJS. It could end up in AngularJS 2, React or just plain JS CSS and HTML as this will be fairly lightweight (the goal is to log users in then forward them to the real app)

Will store the information needed in the other APPs as cookies. It is up to the other APPs to read the cookies to identify them as logged in and erase the cookies once they logout.

# Setup
+ look at config.js for your environment variables.

# Testing

these features should be tested once hooked up:

+ login
+ writing cookies correctly
+ redirecting correctly to a config variable
+ password reset
+ forgot password

# Todo

+ [DONE] Make sure login actually writes the proper cookies to store (don't send the cookies to the backend send JSON)
+ [DONE] configize login redirect

# Future

+ actually make sure resetting password logs you into the app or redirects you back to login appropriately
+ add in analytics information if desired (configize whether or not that is done)
+ Add example route for after login that receiving apps will use
+ configize help form email to field
+ configize endpoint locations for Auth.js
+ configize expiry time in cookie creation
+ configize error messages
+ setup using vagrant
+ cleanup fonts / images / libs
+ rename app

