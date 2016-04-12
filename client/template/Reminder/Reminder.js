/*
Template.createReminder.rendered=function() {
	this.$('.datetimepicker').datetimepicker();
}*/

Template.createReminder.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('tasks');
	});
});
  
Template.createReminder.helpers({
    tasks: function () {
      	if (Session.get("hideCompleted")) {
        	// If hide completed is checked, filter tasks
        	return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      	} 
      	else {
        	// Otherwise, return all of the tasks
        	return Tasks.find({}, {sort: {createdAt: -1}});
      	}
    },
    hideCompleted: function () {
      	return Session.get("hideCompleted");
    },
    incompleteCount : function(){
      	return Tasks.find({checked : {$ne: true}}).count();
    }
  });

Template.createReminder.events({
    "submit .new-task": function (event) {
		// Prevent default browser form submit
		event.preventDefault();
		// Get value from form element
		var text = event.target.text.value;
		Meteor.call("createReminder",text, function(err,res){
			if(!err){
				console.log("callback recieved: "+res);
			}
		});
		// Insert a task into the collection
		// Clear form
		event.target.text.value = "";
		},
		"change .hide-completed input": function (event) {
			Session.set("hideCompleted", event.target.checked);
		}
  });


Template.task.events({
	"click .toggle-checked": function () {
	 	// Set the checked property to the opposite of its current value
		Meteor.call("setCheckedReminder",this._id, !this.checked);
	},
	"click .delete": function () {
		//Tasks.remove(this._id);
		Meteor.call("deleteReminder",this._id);
	}
});