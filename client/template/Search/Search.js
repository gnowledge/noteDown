
Template.Search.helpers({
	searchIndexes: () => [groupsIndex, postsIndex],
  		groupIndex: () => groupsIndex,
  		postIndex: () => postsIndex,
  		userIndex: () => usersIndex
});

Template.Search.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('groups');
		self.subscribe('posts');
		self.subscribe('user');
	});
});