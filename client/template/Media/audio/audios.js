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
		metadata : function(fileObj){
			var fileName = fileObj.name();
            var fileExt = fileObj.extension();
            var fileSize = fileObj.size();
            var fileFrmtSize = fileObj.formattedSize(); 
            var fileType = fileObj.type();
            var md5 = fileName+fileExt+fileSize+fileFrmtSize+fileType;
            var fileMd = CryptoJS.MD5(md5).toString();
            var CurrentUser = Meteor.userId();
            var match = Collections.Audios.findOne({ $and: [{MD5:fileMd},{'owner.id':CurrentUser}]});
            if (match){
                Toast.info("This audio already exist.","Warning!!!");
                Router.go('/user/showMedia/');
                this.data.queue.cancel();
            }
            else{
				return {
		          	owner:{
		            	id: Meteor.userId(),
		            	name: Meteor.user().profile.name
		          	},
		          	dropped: false,
	          		privacy:"private",
	          		MD5:fileMd,
	          		createdAt: new Date().toLocaleString()
		        };
		    }
		},

		after : function (error,fileObj){
			if(!error){
				Toast.success('Successful');
				Router.go('/user/showMedia/');
			}
			else{
				Toast.error('Unsuccessful');
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
		metadata : function(fileObj){
			var groupId = Session.get('groupId');
			var group= Groups.findOne({ _id: groupId});
	        var group_name = group.gname;
	        var rss_title = "has added a new ";
        	var title = "audio";
        	var user_id = Meteor.userId();
        	var user_name = Meteor.user().profile.name;
        	var fileName = fileObj.name();
            var fileExt = fileObj.extension();
            var fileSize = fileObj.size();
            var fileFrmtSize = fileObj.formattedSize(); 
            var fileType = fileObj.type();
            var md5 = fileName+fileExt+fileSize+fileFrmtSize+fileType;
            var fileMd = CryptoJS.MD5(md5).toString();

            var match = Collections.Audios.findOne({ $and: [{MD5:fileMd},{groupID:groupId}]});
            if (match){
                Toast.info("This Image already exist.","Warning!!!");
                Router.go('/group/'+groupId+'/shared_media/');
                this.data.queue.cancel();
            }
            else{
        		Meteor.call('Media_Rss', rss_title, title, user_id, user_name, group_name, groupId);
		    	return {
		          	owner:{
		            	id: Meteor.userId(),
		            	name: Meteor.user().profile.name
		          	},
		          	groupID: groupId,
		          	dropped: false,
	          		privacy:"public",
	          		MD5:fileMd,
	          		createdAt: new Date().toLocaleString()
		        };
		    }
		},
		after : function (error,fileObj){
			if(!error){
				var groupID = Session.get('groupId');
				Toast.success('Successful');
          		Router.go('/group/'+groupID+'/shared_media/');
			}
			else{
				Toast.error('Unsuccessful');
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


Meteor.startup(function() {
Template.uploadedAudio.events({
	"click .btn-share":function(event){
		var idurl = event.target.id;
		var urlAudio =$('#'+idurl).val();
		//alert("idss : "+idurl+"...... urlAudio : "+urlAudio);
		Session.set("urlData",urlAudio);	
	}
});
});


Template.uploadedAudio.helpers({
    opts: function() {
    	var srcAudio = Session.get('urlData');
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
	          url:'http://localhost:3000'+srcAudio,
	          facebookAppId: '195380783916970',
	          subject: 'test subject',
	          textbody:'http://localhost:3000'+srcAudio,
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
});