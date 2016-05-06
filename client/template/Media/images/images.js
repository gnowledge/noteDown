function getHandler(dropped) {
  return FS.EventHandlers.insertFiles(Collections.Images, {
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
        console.log("Inserted", fileObj.name());
      }
    }
  });
}

// Can't call getHandler until startup so that Collections object is available
Meteor.startup(function () {

  Template.images.events({
    'dropped .imageArea': getHandler(true),
    'dropped .imageDropArea': getHandler(true),
    'change input.images': getHandler(false)
  });

});

Template.images.uploadedImages = function() {
  var groupId = Session.get('groupId');
  return Collections.Images.find({groupID: groupId});
};

Template.images.onCreated(function(){
  var self= this;
  this.autorun( function() {
    self.subscribe('images');
  });
});

Template.images.events({
  'submit #preview':function(events){
    event.preventDefault();

    alert('Preview');
  }
});