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
          privacy:"private",
          createdAt: new Date().toLocaleString()
        }
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
    })
  });

});

Template.images.uploadedImage = function() {
  
  return Collections.Images.find({});
};

Template.images.onCreated(function(){
  var self= this;
  this.autorun( function() {
    self.subscribe('images');
  });
});

Meteor.startup(function () {
  Template.images_group.events({
    'change input.images': FS.EventHandlers.insertFiles(Collections.Images, {
      metadata: function (fileObj) {
        var groupId = Session.get('groupId');
        var group= Groups.findOne({ _id: groupId});
        var group_name = group.gname;
        var rss_title = "has added a new ";
        var title = "image";
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
    'keyup .filename': function(){
      var ins = Template.instance();
      if(ins){
        ins.filename.set($('.filename').val());
      }
    }
  });
});

Template.images_group.uploadedImage = function() {
  return Collections.Images.find({});
};

Template.images_group.onCreated(function(){
  var self= this;
  this.autorun( function() {
    self.subscribe('images');
  });
});
