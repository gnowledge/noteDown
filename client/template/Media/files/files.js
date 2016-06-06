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
              privacy:"private"
            };
      },
      after: function (error, fileObj) {
        if (!error) {
          Router.go('/user/showMedia/');
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
        Rss.insert({
          rss_title: "has added a new file",
          title: "file",
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
      after: function (error, fileObj) {
        if (!error) {
          var groupID = Session.get('groupId');
          Router.go('/group/'+groupID+'/shared_media/');
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
