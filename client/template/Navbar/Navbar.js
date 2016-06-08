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
Template.Navbar.events({
	'keyup #search': function(event) {
    	Session.set('search/keyword', event.target.value);
    	Router.go('Search');
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
	}
});