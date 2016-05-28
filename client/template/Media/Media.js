Template.updown.events({
  'click .pauseUploads': function(event, template) {
    FS.HTTP.uploadQueue.pause();
  },
  'click .resumeUploads': function(event, template) {
    FS.HTTP.uploadQueue.resume();
  },
  'click .cancelUploads': function(event, template) {
    FS.HTTP.uploadQueue.cancel();
  }
});

$(document).on('click', '.panel-heading span.clickable', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});

$(document).on('click', '.panel div.clickable', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});

$(document).ready(function () {
    $('.panel-heading span.clickable').click();
    $('.panel div.clickable').click();
});

Template.SharedMediaInGroup.helpers({
    images: function() {
        var group_id= Session.get('groupId');
        return Collections.Images.find({groupID: group_id});
    },
    image: function() {
        var group_id= Session.get('groupId');
        return Collections.Images.find({"owner.id":Meteor.userId(),groupID: group_id}).count();
    },
    videos: function() {
        var group_id= Session.get('groupId');
        return Collections.Videos.find({groupID: group_id});
    },
    video: function() {
         var group_id= Session.get('groupId');
        return Collections.Videos.find({"owner.id":Meteor.userId(),groupID: group_id}).count();
    },
    audios: function() {
         var group_id= Session.get('groupId');
        return Collections.Audios.find({groupID: group_id});
    },
    audio: function() {
         var group_id= Session.get('groupId');
        return Collections.Audios.find({"owner.id":Meteor.userId(),groupID: group_id}).count();
    },
    files: function() {
         var group_id= Session.get('groupId');
        return Collections.Files.find({groupID: group_id});
    },
    file: function() {
         var group_id= Session.get('groupId');
        return Collections.Files.find({"owner.id":Meteor.userId(),groupID: group_id}).count();
    }
});

Template.SharedMediaInGroup.onCreated(function(){
    var self= this;
    this.autorun( function() {
        self.subscribe('images');
        self.subscribe('audios');
        self.subscribe('files');
        self.subscribe('videos');
    });
});

Template.YourMedia.helpers({
    images: function() {
        return Collections.Images.find({"owner.id":Meteor.userId()});
    },
    image: function() {
        return Collections.Images.find({"owner.id":Meteor.userId()}).count();
    },
    videos: function() {
        return Collections.Videos.find({"owner.id":Meteor.userId()});
    },
    video: function() {
        return Collections.Videos.find({"owner.id":Meteor.userId()}).count();
    },
    audios: function() {
        return Collections.Audios.find({"owner.id":Meteor.userId()});
    },
    audio: function() {
        return Collections.Audios.find({"owner.id":Meteor.userId()}).count();
    },
    files: function() {
        return Collections.Files.find({"owner.id":Meteor.userId()});
    },
    file: function() {
        return Collections.Files.find({"owner.id":Meteor.userId()}).count();
    }
});

Template.YourMedia.onCreated(function(){
    var self= this;
    this.autorun( function() {
        self.subscribe('images');
        self.subscribe('audios');
        self.subscribe('files');
        self.subscribe('videos');
    });
});