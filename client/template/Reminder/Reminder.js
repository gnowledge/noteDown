Meteor.subscribe('todo');

$(document).ready(function () {
	// Attach Button click event listener 
	$("#Btn").click(function(){
	    // show Modal
	    $('#myModal').modal('show');
	});
});

Template.createReminder.events({
	"submit .save": function(event) {
		event.defaultPrevented();

		// Get value from form element
		var list = event.target.list_name.value;

		// Insert a task into the collection
		Meteor.call("addList", list, function(err, res){
			if(!err){//all good
				console.log("callback recieved: "+res);
			};
		});

		// Clear form
		event.target.list_name.value = "";
	}  
});