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
    videos: function() {
        var group_id= Session.get('groupId');
        return Collections.Videos.find({groupID: group_id});
    },
    audios: function() {
         var group_id= Session.get('groupId');
        return Collections.Audios.find({groupID: group_id});
    },
    files: function() {
         var group_id= Session.get('groupId');
        return Collections.Files.find({groupID: group_id});
    },
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