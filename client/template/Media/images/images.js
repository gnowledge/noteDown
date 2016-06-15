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


Meteor.startup(function() {
Template.uploadedImage.events({
  "click .btn-shareImg":function(event){
    var idimg = event.target.id;
    var urlImg = event.target.value;
    //alert("id : "+idimg+"...... urlImg : "+urlImg);
    Session.set("urlImgs",urlImg);  
  }
});
});

Template.uploadedImage.helpers({
    opts: function() {
      var srcImgs = Session.get('urlImgs');
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
            url:'http://localhost:3000'+srcImgs,
            facebookAppId: '195380783916970',
            subject: 'test subject',
            textbody:'http://localhost:3000'+srcImgs,
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