

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
  	}
});

Template.Search.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('groups');
		self.subscribe('posts');
	});
});

Template.Search.onRendered(function(){
  $("#search").focus();
});