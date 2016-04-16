ServiceConfiguration.configurations.upsert({
	service: "facebook"
},
{
	$set: {
    		appId: Meteor.settings.facebook.appId,
    		loginStyle: "popup",
    		secret: Meteor.settings.facebook.secret
  	}
});
ServiceConfiguration.configurations.upsert({
	service: "google"
},
{
	$set: {
    		clientId: Meteor.settings.google.clientId,
    		loginStyle: "popup",
    		secret: Meteor.settings.google.secret
  	}
});

