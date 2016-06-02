Accounts.onCreateUser(function(options, user) {
    user.profile = user.profile || {}; //If the google service exists 
    if ((service = user.services) !== undefined ? service.google : undefined) { 
        user.profile.id= user._id;
        user.profile.emails = user.services.google.email;
        user.profile.name = user.services.google.name;
        user.profile.first_name = user.services.google.given_name;
        user.profile.last_name = user.services.google.family_name; 
        user.profile.gender = "not set";
        user.profile.image = user.services.google.picture;
        user.profile.dob = "not set"; 
        user.profile.age = "not set";
    }
    else if ((service = user.services) !== undefined ? service.facebook : undefined) {
        user.profile.id= user._id; 
        user.profile.emails = user.services.facebook.email;
        user.profile.name = user.services.facebook.name;
        user.profile.first_name = user.services.facebook.first_name;
        user.profile.last_name = user.services.facebook.last_name; 
        user.profile.gender = user.services.facebook.gender;
        user.profile.image = "/images/user.png";
        user.profile.age = "not set";
        user.profile.dob = "not set";
    }
    else if ((service = user.services) !== undefined ? service.twitter : undefined) {
        user.profile.id= user._id; 
        user.profile.emails = "not set";
        user.profile.name = user.services.twitter.screenName;
        user.profile.first_name = "not set";
        user.profile.last_name = "not set";
        user.profile.gender = "not set";
        user.profile.age = "not set";
        user.profile.dob = "not set";
        user.profile.image = user.services.twitter.profile_image_url; 
    }
    else {
        user.profile.id= user._id;
        user.profile.emails = "not set";
        user.profile.name= user.username;
        user.profile.first_name = "not set";
        user.profile.last_name = "not set";
        user.profile.gender = "not set";
        user.profile.age = "not set";
        user.profile.dob = "not set";
        user.profile.image = "/images/user.png";
    } 
    return user;
});