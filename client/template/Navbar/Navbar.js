Template.Navbar.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('users');
	});
});

Template.Navbar.helpers({
	user : function(){
		return Meteor.users.find({ _id: Meteor.userId() });
	}
});

Template.navbarGroup.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('groups');
	});
});

Template.navbarGroup.helpers({
	group : function(){
		var groupId = Session.get('groupId'); 
        var group = Groups.findOne({_id: groupId});
        return group;
	},
	private:function(){
		var groupId = Session.get('groupId'); 
        var group = Groups.findOne({_id: groupId});
        var private= group.privacy;
        	if(private === "private")
        		return true;
	},
	owner: function(){
		var groupId = Session.get('groupId'); 
        var group = Groups.findOne({_id: groupId});
        var owner= group.owner.id;
        if(owner=== Meteor.user()._id)
        	return owner;   
	}
});