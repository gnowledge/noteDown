Meteor.subscribe("groups");

Template.newGroup.events({
	"submit .form": function(event) {
	  event.preventDefault();
	  var privacy_flag;
      // Get value from form element
      var gtitle = event.target.gTitle.value;
      var gdesc = event.target.gDescription.value;
      
      // Insert a task into the collection
      if(event.target.privacy.checked){
      	privacy_flag = "private";
      }
      else{
      	privacy_flag = "public";
      }
      Meteor.call("addGroup", gtitle, gdesc, privacy_flag, function(err, res){
		if(!err){//all good
			console.log("callback recieved: "+res);
                  alert('Group created succesfully');
		}
	});

      // Clear form
      event.target.gTitle.value = "";
      event.target.gDescription.value = "";
	}  
});

