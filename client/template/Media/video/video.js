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
<<<<<<< HEAD
          		privacy:"private"
=======
          		privacy:"private",
          		createdAt: new Date().toLocaleString()
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
	        };
		},

		after : function (error,fileobj){
			if(!error){
<<<<<<< HEAD
				alert('done');
=======
				Toast.success('Successful');
				Router.go('/user/showMedia/');
			}
			else{
				Toast.error('Unsuccessful');
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
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
			var group= Groups.findOne({ _id: groupId});
			var group_name = group.gname;
<<<<<<< HEAD
			Rss.insert({
				rss_title: "has added a new video",
				title: $('.filename').val(),
				user_action: "/user_dashboard/"+ Meteor.userId(),
				user_name: Meteor.user().profile.name,
				group_name: group_name,
				createdAt: new Date().toLocaleString(),
				action: "/group/"+groupId
			});
=======
			 var rss_title = "has added a new ";
        	var title = "video";
        	var user_id = Meteor.userId();
        	var user_name = Meteor.user().profile.name;
        	Meteor.call('Media_Rss', rss_title, title, user_id, user_name, group_name, groupId);
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
		    	return {
					owner:{
						id: Meteor.userId(),
						name: Meteor.user().profile.name
					},
					groupID: groupId,
					dropped: false,
<<<<<<< HEAD
              		privacy:"public"
=======
              		privacy:"public",
          			createdAt: new Date().toLocaleString()
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
		        };
		},

		after : function (error,fileobj){
			if(!error){
<<<<<<< HEAD
				alert('done');
=======
				var groupID = Session.get('groupId');
				Toast.success('Successful');
          		Router.go('/group/'+groupID+'/shared_media/');
			}
			else{
				Toast.error('Unsuccessful');
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
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
<<<<<<< HEAD
=======
});


Meteor.startup(function() {
Template.uploadedVideo.events({
	"click .btn-shareVid":function(event){
		var idvid = event.target.id;
		var urlVideo =event.target.value;
		//alert("id : "+idvid+"...... urlVideo : "+urlVideo);
		Session.set("urlVideos",urlVideo);	
	}
});
});


Template.uploadedVideo.helpers({
    opts: function() {
    	var srcVideo = Session.get('urlVideos');
    	var opts = {
	        bootstrap: true, // enables bootstrap styles
	        email: true,
	        facebook: true,
	        facebookMessage: true,
	        gmail: true,
	        googlePlus: true,
	        linkedIn: true,
	        pinterest: true,
	        sms: false,
	        twitter: true,
	        url: false,
	        shareData: {
	          url:'http://localhost:3000'+srcVideo,
	          facebookAppId: '195380783916970',
	          subject: 'test subject',
	          textbody:'http://localhost:3000'+srcVideo,
	          redirectUrl: 'http://localhost:3000/test'
	        },
	        customClasses: {
		        facebook: 'btn-lg',
		        twitter: 'btn-lg',
		        pinterest: 'btn-lg',
		        bootstrap: 'btn-lg',
		        email: 'btn-lg',
		        facebookMessage:'btn-lg',
		        gmail: 'btn-lg',
		        googlePlus: 'btn-lg',
		        linkedIn:'btn-lg',
		        sms: 'btn-lg'
	        }
      };
      return opts;
    }
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
});