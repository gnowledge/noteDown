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
          alert('done');
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
          alert('done');
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
