Template.createReminder.onRendered(function() {
	var today = new Date(); 
	
	$(function() {
	  $('input[name="datefilter"]').daterangepicker({
	    "singleDatePicker": true,
	    "autoApply": true,
	    "linkedCalendars": false,
	    "startDate": today,
	    "endDate": "12/31/2016",
	    "minDate": today,
	    "maxDate": "12/31/2016",
	    "timePicker": true
	  });

	  $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
	      $(this).val(picker.endDate.format('MM/DD/YYYY h:mm A'));
	  });

	  $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
	      $(this).val('');
	  });

	});
});
	
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
		var desc = event.target.desc.value;
		var date= event.target.datefilter.value;
		Meteor.call("createReminder",text, desc, date ,function(err,res){
			if(!err){
				console.log("callback recieved: "+res);
			}
		});
		// Insert a task into the collection
		// Clear form
		event.target.text.value = "";
		event.target.desc.value = "";
		event.target.datefilter.value = "";
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
