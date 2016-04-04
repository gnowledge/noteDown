Template.showGroup.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('groups');
	});
});

Template.showGroup.helpers({
	groups : function(){
		return Groups.find({});
	}
});

Template.Group.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('groups');
	});
});

Template.Group.helpers({
	group : function(){
		var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        var group = Groups.findOne({_id: groupId});
        return group;
	}
});

Template.Group.events({
	"click #delete": function(event) {
		var groupId = Session.get('groupId');
		Meteor.call('deleteGroup', groupId, function(err,res){
			if(!err){//all good
				console.log("group deleted: "+res);
                alert('Group deleted succesfully');
			}
		});
	},

	"click #join": function(event) {
		var groupId = Session.get('groupId');
		console.log(groupId);
		Meteor.call('joinGroup',groupId, function(err,res){
			if(!err){//all good
				console.log("group joined: "+res);
                alert('Group joined succesfully');
			}
		});		
	}
});