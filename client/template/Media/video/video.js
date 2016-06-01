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
			return {
	          	owner:{
	            	id: Meteor.userId(),
	            	name: Meteor.user().profile.name
	          	},
	          	dropped: false,
          		privacy:"private"
	        };
		},

		after : function (error,fileobj){
			if(!error){
				alert('done');
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
    return Collections.Videos.find({});
  }
});


Template.video_group.created = function(){
	this.filename = new ReactiveVar('');
};

Template.video_group.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('videos');
	});
});


Meteor.startup(function() {

	Template.video_group.events({
	'change input.videoFile' : FS.EventHandlers.insertFiles(Collections.Videos,{
		metadata : function(fileobj){
			var groupId = Session.get('groupId');
		    	return {
					owner:{
						id: Meteor.userId(),
						name: Meteor.user().profile.name
					},
					groupID: groupId,
					dropped: false,
              		privacy:"public"
		        };
		},

		after : function (error,fileobj){
			if(!error){
				alert('done');
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


Template.video_group.helpers({
  uploadedVideos: function() {
    return Collections.Videos.find({});
  }
});