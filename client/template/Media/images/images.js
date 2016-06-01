// Can't call getHandler until startup so that Collections object is available
Meteor.startup(function () {

  Template.images.events({
    'change input.images': FS.EventHandlers.insertFiles(Collections.Images, {
      metadata: function (fileObj) {
        return {
          owner:{
            id: Meteor.userId(),
            name: Meteor.user().profile.name
          },
          dropped: false,
          privacy:"private"
        }
      },
      after: function (error, fileObj) {
        if (!error) {
          alert('done');
        }
      }
    })
  });

});

Template.images.uploadedImages = function() {
  
  return Collections.Images.find({});
};

Template.images.onCreated(function(){
  var self= this;
  this.autorun( function() {
    self.subscribe('images');
  });
});


// Can't call getHandler until startup so that Collections object is available
Meteor.startup(function () {

  Template.images_group.events({
    'change input.images': FS.EventHandlers.insertFiles(Collections.Images, {
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
    'keyup .filename': function(){
      var ins = Template.instance();
      if(ins){
        ins.filename.set($('.filename').val());
      }
    }
  });

});

Template.images_group.uploadedImages = function() {
  
  return Collections.Images.find({});
};

Template.images_group.onCreated(function(){
  var self= this;
  this.autorun( function() {
    self.subscribe('images');
  });
});
