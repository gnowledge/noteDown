

Template.Search.helpers({
	/*searchIndexes: () => [groupsIndex, postsIndex],
  		groupIndex: () => groupsIndex,
  		postIndex: () => postsIndex*/
  	posts: function () {
    	var regexp = new RegExp(Session.get('search/keyword'), 'i');
    	return Posts.find({Title: regexp});
  	},
  	groups:function () {
  		var regexp = new RegExp(Session.get('search/keyword'), 'i');
    	return Groups.find({gname: regexp, "privacy": "public"});
  	}/*,
    images: function(){
      var regexp = new RegExp(Session.get('search/keyword'), 'i');
      return Collections.Images.find({ "original.name": regexp, "privacy": "public"});
    },
    videos: function(){
      var regexp = new RegExp(Session.get('search/keyword'), 'i');
      return Collections.Videos.find({ "original.name": regexp, "privacy": "public"});
    },
    audios: function(){
      var regexp = new RegExp(Session.get('search/keyword'), 'i');
      return Collections.Audios.find({ "original.name": regexp, "privacy": "public"});
    },
    files: function(){
      var regexp = new RegExp(Session.get('search/keyword'), 'i');
      return Collections.Files.find({ "original.name": regexp, "privacy": "public"});
    }*/
});

Template.Search.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('groups');
		self.subscribe('posts');
    /*self.subscribe('images');
    self.subscribe('files');
    self.subscribe('audios');
    self.subscribe('videos');*/
	});
});

Template.Search.onRendered(function(){
  $("#search").focus();
});