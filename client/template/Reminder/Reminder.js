Template.CreateTodo.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('tasks');
	});
});

Template.CreateTodo.onRendered(function() {
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

Template.CreateTodo.events({
    "submit .new-task": function (event) {
		// Prevent default browser form submit
		event.preventDefault();
		// Get value from form element
		var text = event.target.text.value;
		var desc = event.target.desc.value;
		var date= event.target.datefilter.value;
		Meteor.call("createReminder",text, desc, date , function(err,res){
			if(!err){
				console.log("callback recieved: "+res);
			}
		});
		
		// Insert a task into the collection
		// Clear form
		event.target.text.value = "";
		event.target.desc.value = "";
		event.target.datefilter.value = "";
		}
  });


Template.Task.events({
	"click .toggle-checked": function () {
	 	// Set the checked property to the opposite of its current value
		Meteor.call("setCheckedReminder",this._id, !this.checked);
	},
	"click .delete": function () {
		//Tasks.remove(this._id);
		Meteor.call("deleteReminder",this._id);
	}
});

//-------------Todo-------------------
Template.YourTodo.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('tasks');
	});
});

Template.YourTodo.events({
	"change .hide-completed input": function (event) {
		Session.set("hideCompleted", event.target.checked);
	}
});

Template.YourTodo.helpers({
    tasks: function () {
      	if (Session.get("hideCompleted")) {
        	// If hide completed is checked, filter tasks
        	return Tasks.find({checked: {$ne: true},"owner.id": Meteor.userId()}, {sort: {createdAt: -1}});
      	} 
      	else {
        	// Otherwise, return all of the tasks
        	return Tasks.find({ "owner.id": Meteor.userId() }, {sort: {createdAt: -1}});
      	}
    },
    task: function () {
      	if (Session.get("hideCompleted")) {
        	// If hide completed is checked, filter tasks
        	return Tasks.find({checked: {$ne: true},"owner.id": Meteor.userId()}).count();
      	} 
      	else {
        	// Otherwise, return all of the tasks
        	return Tasks.find({"owner.id": Meteor.userId()}).count();
      	}
    },
    hideCompleted: function () {
      	return Session.get("hideCompleted");
    },
    incompleteCount : function(){
      	return Tasks.find({checked : {$ne: true}}).count();
    }
  });

//--------- Group Task----------------
Template.GroupTask.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('tasks');
		self.subscribe('groups');
	});
});

Template.GroupTask.events({
	"change .hide-completed input": function (event) {
		Session.set("hideCompleted", event.target.checked);
	}
});

Template.GroupTask.helpers({
    tasks: function () {
    	var groupId = Session.get('groupId'); 
      	if (Session.get("hideCompleted")) {
        	// If hide completed is checked, filter tasks
        	return Tasks.find({checked: {$ne: true},groupID:groupId}, {sort: {createdAt: -1}});
      	} 
      	else {
        	// Otherwise, return all of the tasks

        	return Tasks.find({groupID: groupId}, {sort: {createdAt: -1}});
      	}
    },
    task: function () {
    	var groupId = Session.get('groupId');
      	if (Session.get("hideCompleted")) {
        	// If hide completed is checked, filter tasks
        	return Tasks.find({checked: {$ne: true}, groupID:groupId}).count();
      	} 
      	else {
        	// Otherwise, return all of the tasks
        	return Tasks.find({groupID:groupId}).count();
      	}
    },
    hideCompleted: function () {
      	return Session.get("hideCompleted");
    },
    incompleteCount : function(){
      	return Tasks.find({checked : {$ne: true}}).count();
    }
  });

//--------------Group create task--------------
Template.CreateTask.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('tasks',Session.get('group'));
		console.log(Session.get('group'));
	});
});

Template.CreateTask.onRendered(function() {
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

Template.CreateTask.events({
    "submit .new-task": function (event) {
		// Prevent default browser form submit
		event.preventDefault();
		// Get value from form element
		var text = event.target.text.value;
		var desc = event.target.desc.value;
		var date= event.target.datefilter.value;
		var groupID= Session.get('group');
		Meteor.call("createTask",text, desc, date , groupID, function(err,res){
			if(!err){
				console.log("callback recieved: "+res);
			}
		});
		
		// Insert a task into the collection
		// Clear form
		event.target.text.value = "";
		event.target.desc.value = "";
		event.target.datefilter.value = "";
		}
  });