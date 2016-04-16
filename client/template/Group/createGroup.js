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
            var gtitle = event.target.gTitle.value;
            var gdesc = event.target.gDescription.value;
            var result = Groups.findOne({gname: gtitle});
            if (result) {
                  alert("Group name already exists");
                  event.target.gTitle.value = "";
                  return false;
            }
            // Insert a task into the collection
            if(event.target.privacy.checked){
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
                              Meteor.call('Successfully');
            		}
            	});
            }

            // Clear form
            event.target.gTitle.value = "";
            event.target.gDescription.value = "";
	}  
});

