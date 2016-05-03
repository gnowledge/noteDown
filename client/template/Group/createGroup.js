Meteor.subscribe("groups");

Template.newGroup.helpers({
      group_name: function(){
            return Groups.find({},{ gname: 1, _id: 0});
      }
});

Template.newGroup.events({
	"submit .form": function(event) {
      	event.preventDefault();
      	var privacy_flag;
            // Get value from form element
            var gtitle = event.target.Title.value;
            var gdesc = event.target.Description.value;
            var result = Groups.findOne({ gname: gtitle });
            if (result) {
                  alert("Group name already exists");
                  event.target.Title.value = "";
                  return false;
            }
            // Insert a task into the collection
            if(event.target.Privacy.checked){
            	privacy_flag = "private";
            }
            else{
            	privacy_flag = "public";
            }
            if(confirm("Are the details correct ?")== true){
                  Meteor.call("addGroup", gtitle, gdesc, privacy_flag, function(err, res){
            		if(!err){//all good
            			//console.log("callback recieved: "+res);
                              alert('Group created succesfully');
                              //Meteor.call('Successfully');
            		}
            	});
            }

            // Clear form
            event.target.Title.value = "";
            event.target.Description.value = "";
	}  
});

