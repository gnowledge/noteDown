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
          Router.go('/user/showMedia/');
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


// Can't call getHandler until startup so that Collections object is available
Meteor.startup(function () {

  Template.images_group.events({
    'change input.images': FS.EventHandlers.insertFiles(Collections.Images, {
      metadata: function (fileObj) {
        var groupId = Session.get('groupId');
        var group= Groups.findOne({ _id: groupId});
        var group_name = group.gname;
        var ins = Template.instance();
        Rss.insert({
          rss_title: "has added a new",
          title: "image",
          user_action: "/user_dashboard/"+ Meteor.userId(),
          user_name: Meteor.user().profile.name,
          group_name: group_name,
          group_action: "/group/"+groupId,
          createdAt: new Date().toLocaleString(),
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
