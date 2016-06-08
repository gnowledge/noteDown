Accounts.onCreateUser(function(options, user) {
    
    user.profile = user.profile || {}; //If the google service exists 
    if ((service = user.services) !== undefined ? service.google : undefined) { 
        user.profile.id= user._id;
        user.profile.emails = user.services.google.email;
        user.profile.name = user.services.google.name;
        user.profile.first_name = user.services.google.given_name;
        user.profile.last_name = user.services.google.family_name; 
        user.profile.image = user.services.google.picture;
    }
    else if ((service = user.services) !== undefined ? service.facebook : undefined) {
        user.profile.id= user._id; 
        user.profile.emails = user.services.facebook.email;
        user.profile.name = user.services.facebook.name;
        user.profile.first_name = user.services.facebook.first_name;
        user.profile.last_name = user.services.facebook.last_name; 
        user.profile.image = user.services.facebook.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large"; 
    }
    else if ((service = user.services) !== undefined ? service.twitter : undefined) {
        user.profile.id= user._id; 
        user.profile.emails = "not set";
        user.profile.name = user.services.twitter.screenName;
        user.profile.first_name = "not set";
        user.profile.last_name = "not set";
        user.profile.image = user.services.twitter.profile_image_url_https; 
    }
    else {  
            user.profile.id= user._id;
            if(user.emails[0].verified===false){
                user.profile.emails = user.emails[0].address;
            }
            user.profile.name= user.username;
            user.profile.first_name = user.username;
            user.profile.last_name = "not set";
            user.profile.image = "/images/user.png"; 
    } 
    return user;
});

if(Meteor.isServer){
    Meteor.startup(function () {
        process.env.MAIL_URL="smtp://postmaster%40sandbox6c28b2070b3747f5b2423a1806578e02.mailgun.org:90c32d9797225358491cddf21e08139d@smtp.mailgun.org:465";
        //console.log(process.env);
        Accounts.emailTemplates.from= 'no-reply@yourdomain.com';
        Accounts.emailTemplates.sitename='noteDown.com';
        Accounts.emailTemplates.verifyEmail.subject = function(user){

            return 'Confirm Your Email Address';
        };
        Accounts.emailTemplates.verifyEmail.text = function(user,url){
            return 'click on the following link to verify your email address: ' + url;
        };
        Accounts.config({
            sendVerificationEmail: true
        });

        Accounts.emailTemplates.resetPassword.subject = function(user){
            return "Change your password";
        };
        Accounts.emailTemplates.resetPassword.text = function(user,url){
            return 'click on the following link to change your password: ' + url;
        };
        
    });
}

