Template.Updates.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('rss');
		self.subscribe('user');
	});
<<<<<<< HEAD
=======
	var rss= Rss.find({},{fields: { _id: 0, group_name: 1}});
		for(var i=0; i< rss.length; i++){
			var group_name= rss[i].group_name;
		}
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
});

Template.Updates.helpers({
	feed:function(){
<<<<<<< HEAD
		var feed= Rss.find({},
			{sort: {createdAt: -1}},{limit: 6});
		return feed;
	},
	feedCount:function(){
		return Rss.find().count();
	}
});

Template.Updates.events({
	/*'click #check': function(event){
		var id= this._id;
		var action= this.action;
		var itemId= this.id;
		console.log(itemId);
		if(action=== "Post"){
			Router.go('/group_notes/'+itemId);
		}
		else if(action=== "Group"){
			Router.go('/group/'+itemId);
		}
		
	}*/
});
=======
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
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
