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
        var groupId = Session.get('groupId');
        return {
          owner:{
            id: Meteor.userId(),
            name: Meteor.user().profile.name
          },
          groupID: groupId,
          foo: "bar",
          dropped: false
        };
      },
      after: function (error, fileObj) {
        if (!error) {
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
    var groupId = Session.get('groupId');
    return Collections.Files.find({groupID: groupId});
  }
});
