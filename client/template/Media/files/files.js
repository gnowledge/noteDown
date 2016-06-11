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
