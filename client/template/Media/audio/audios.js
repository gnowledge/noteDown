Template.audio.created = function(){
	this.filename = new ReactiveVar('');
};

Template.audio.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('audios');
	});
});

Meteor.startup(function() {
	Template.audio.events({
	'change input.audioFile' : FS.EventHandlers.insertFiles(Collections.Audios,{
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
				Router.go('/user/showMedia/');
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


Template.audio.helpers({
  uploadedAudios: function() {
  	
    return Collections.Audios.find({});
  }
});

Template.audio_group.created = function(){
	this.filename = new ReactiveVar('');
};


Template.audio_group.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('audios');
	});
});


Meteor.startup(function() {
	Template.audio_group.events({
	'change input.audioFile' : FS.EventHandlers.insertFiles(Collections.Audios,{
		metadata : function(fileobj){
			var groupId = Session.get('groupId');
			var group= Groups.findOne({ _id: groupId});
	        var group_name = group.gname;
	        Rss.insert({
	          rss_title: "has added a new ",
	          title: "audio",
	          user_action: "/user_dashboard/"+ Meteor.userId(),
	          user_name: Meteor.user().profile.name,
	          group_name: group_name,
	          createdAt: new Date().toLocaleString(),
	          group_action: "/group/"+groupId,
	          action: '/group/'+groupId+'/shared_media/'
	        });
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
				var groupID = Session.get('groupId');
          		Router.go('/group/'+groupID+'/shared_media/');
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


Template.audio_group.helpers({
  uploadedAudios: function() {
  	
    return Collections.Audios.find({});
  }
});

/*Template.uploadedAudio.events({
	'click .btnmd5': function(event) {
		event.preventDefault();
		var urltxt = event.target.utlTxt.value;
		Session.set('urlData',urltxt);
		console.log(urltxt);
	}
})

Template.uploadedAudio.helpers({
    opts: function() {
    	var src = Session.get('urlData');
    	alert(src);
    	var opts = {
	        bootstrap: true, // enables bootstrap styles
	        email: true,
	        facebook: true,
	        facebookMessage: true,
	        gmail: true,
	        googlePlus: true,
	        linkedIn: true,
	        pinterest: true,
	        sms: true,
	        twitter: true,
	        url: true,
	        shareData: {
	          url:'//'+src,
	          facebookAppId: '195380783916970',
	          subject: 'test subject',
	          body: 'test body',
	          redirectUrl: 'http://localhost:3000/test'
	        },
	        customClasses: {
		        facebook: 'btn-sm btn-xs',
		        twitter: 'btn-sm btn-xs',
		        pinterest: 'btn-sm btn-xs',
		        bootstrap: 'btn-sm btn-xs',
		        email: 'btn-sm btn-xs',
		        facebookMessage:'btn-sm btn-xs',
		        gmail: 'btn-sm btn-xs',
		        googlePlus: 'btn-sm btn-xs',
		        linkedIn:'btn-sm btn-xs',
		        sms: 'btn-sm btn-xs'
	        }
      };
      return opts;
    }
});*/