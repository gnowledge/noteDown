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
<<<<<<< HEAD
=======
Template.Navbar.events({
	'keyup #search': function(event) {
    	Session.set('search/keyword', event.target.value);
    	Router.go('Search');
  	}
});
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de

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
<<<<<<< HEAD
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
=======
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
	}
});