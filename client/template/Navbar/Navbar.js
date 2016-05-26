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