/*Meteor.startup(function () {
  // code to run on server at startup
if(!Documents.findOne()){
  	//No Docs yet
  }
});
/*
Meteor.publish("documents", function(){
	return Documents.find({
		$or:[
  		{isPrivate:{$ne:true}},
  		{owner:this.userId}
		]
	});
})
*/

Meteor.publish("user",function(){
  return Meteor.users.find({ },{fields: { _id:1, profile: 1}});
});

Meteor.publish("editingUsers",function(){
	return EditingUsers.find({});
});

Meteor.publish("groups", function(){
  return Groups.find({},{sort: {createdAt: -1}});
});  

Meteor.publish("tasks",function(){
  return Tasks.find({},{sort: {createdAt: -1}});
});  

Meteor.publish("notify",function(){
  return Notify.find({});
});  
if (Meteor.isClient) {
  	Meteor.startup(function() {
    		GoogleMaps.load();
  	});
}

Meteor.publish("threads",function(){
  return Thread.find({});
});

Meteor.publish("posts",function(){
  return Posts.find({});
});

Meteor.publish("rss",function(){
  return Rss.find({});
});

Meteor.publish("images", function() {
  return Collections.Images.find();
});


Meteor.publish("files", function() {
  return Collections.Files.find();
});

Meteor.publish("audios",function(){
  return Collections.Audios.find();
});

Meteor.publish("videos",function(){
  return Collections.Videos.find();
});
