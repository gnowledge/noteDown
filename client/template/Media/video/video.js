Template.video.created = function(){
	this.filename = new ReactiveVar('');
};

Template.video.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('videos');
	});
});


Meteor.startup(function() {

	Template.video.events({
	'change input.videoFile' : FS.EventHandlers.insertFiles(Collections.Videos,{
		metadata : function(fileobj){
			var groupId = Session.get('groupId');
			return {
				owner:{
              		id: Meteor.userId(),
             		name: Meteor.user().profile.name
            	},
            	groupID: groupId,
            	dropped: false
			};
		},

		after : function (error,fileobj){
			if(!error){
				console.log("Inserted",fileobj.name());
			}
		}
	}),
	
	'keyup .filename': function(){
		var ins = Template.instance();
		if(ins){
			ins.filename.set($('.filename').val());
			}
		}
	});
});


Template.video.helpers({
  uploadedVideos: function() {
    var groupId = Session.get('groupId');
    return Collections.Videos.find({groupID: groupId});
  }
});