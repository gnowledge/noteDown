Template.files.created = function () {
  this.filename = new ReactiveVar('');
};

Template.files.onCreated(function(){
  var self= this;
  this.autorun( function() {
    self.subscribe('files');
  });
});

// Can't call getHandler until startup so that Collections object is available
Meteor.startup(function () {

  Template.files.events({
    'change input.any': FS.EventHandlers.insertFiles(Collections.Files, {
      metadata: function (fileObj) {
        return {
              owner:{
                id: Meteor.userId(),
                name: Meteor.user().profile.name
              },
              dropped: false,
              privacy:"private",
              createdAt: new Date().toLocaleString()
            };
      },
      after: function (error, fileObj) {
        if(!error){
          Toast.success('Successful');
          Router.go('/user/showMedia/');
      }
        else{
          Toast.error('Unsuccessful');
        }
      }
    }),
    'keyup .filename': function () {
      var ins = Template.instance();
      if (ins) {
        ins.filename.set($('.filename').val());
      }
    }
  });

});



Template.files.helpers({
  uploadedFiles: function() {
    return Collections.Files.find({});
  }
});


Template.files_group.created = function () {
  this.filename = new ReactiveVar('');
};

Template.files_group.onCreated(function(){
  var self= this;
  this.autorun( function() {
    self.subscribe('files');
  });
});

// Can't call getHandler until startup so that Collections object is available
Meteor.startup(function () {

  Template.files_group.events({
    'change input.any': FS.EventHandlers.insertFiles(Collections.Files, {
      metadata: function (fileObj) {
        var groupId = Session.get('groupId');
        var group= Groups.findOne({ _id: groupId});
        var group_name = group.gname;
        var rss_title = "has added a new ";
        var title = "file";
        var user_id = Meteor.userId();
        var user_name = Meteor.user().profile.name;
        Meteor.call('Media_Rss', rss_title, title, user_id, user_name, group_name, groupId);
          return {
              owner:{
                id: Meteor.userId(),
                name: Meteor.user().profile.name
              },
              groupID: groupId,
              dropped: false,
              privacy:"public",
              createdAt: new Date().toLocaleString()
            };
      },
      after: function (error, fileObj) {
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
    'keyup .filename': function () {
      var ins = Template.instance();
      if (ins) {
        ins.filename.set($('.filename').val());
      }
    }
  });

});



Template.files_group.helpers({
  uploadedFiles: function() {
    return Collections.Files.find({});
  }
});




Meteor.startup(function() {
Template.uploadedFile.events({
  "click .btn-shareFiles":function(event){
    var idFile = event.target.id;
    var urlFile =event.target.value;
    //alert("id : "+idFile+"...... urlFile : "+urlFile);
    Session.set("urlFiles",urlFile);  
  }
});
});


Template.uploadedFile.helpers({
    opts: function() {
      var srcFile = Session.get('urlFiles');
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
            url:'http://localhost:3000'+srcFile,
            facebookAppId: '195380783916970',
            subject: 'test subject',
            textbody:'http://localhost:3000'+srcFile,
            redirectUrl: 'http://localhost:3000/user/showMedia'
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