Template.Updates.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('rss');
		self.subscribe('user');
	});
	var rss= Rss.find({},{fields: { _id: 0, group_name: 1}});
		for(var i=0; i< rss.length; i++){
			var group_name= rss[i].group_name;
		}
});

Template.Updates.helpers({
	feed:function(){
		var feed= Rss.find({ user: Meteor.user().profile.name },{sort: {createdAt: -1}});
		return feed;
	},
	feedCount:function(){
		return Rss.find({}).count();
	},
	group: function(){
		var rss= Rss.find({ });
		for(var i=0; i< rss.length; i++){
			var group_name= rss[i].group_name;
		}
	}
});
