Accounts.onCreateUser(function(options, user) {
    user.profile = user.profile || {}; //If the google service exists 
    if ((service = user.services) !== undefined ? service.google : undefined) { 
        user.profile.emails = user.services.google.email;
        user.profile.name = user.services.google.name;
    }
    else if ((service = user.services) !== undefined ? service.facebook : undefined) { 
        user.profile.emails = user.services.facebook.email;
        user.profile.name = user.services.facebook.name; 
    }
    else
        {
            user.profile.name= user.username;
        } 
    return user;
});