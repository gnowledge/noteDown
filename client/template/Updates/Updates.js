Template.Updates.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('rss');
	});
});

Template.Updates.helpers({
	feed:function(){
		var feed= Rss.find({},
			{sort: {createdAt: -1}},{limit: 6});
		return feed;
	},
	feedCount:function(){
		return Rss.find().count();
	}
});

Template.Updates.events({
	'click #check': function(event){
		var id= this._id;
		var action= this.action;
		var itemId= this.id;
		console.log(itemId);
		if(action=== "Post"){
			Router.go('/posts/'+itemId);
		}
		else if(action=== "Group"){
			Router.go('/group/'+itemId);
		}
		
	}
});