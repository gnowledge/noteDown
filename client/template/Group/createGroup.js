Template.CreateGroup.onCreated(function(){
      var self= this;
      this.autorun( function() {
            self.subscribe('groups');
      });
});

Template.CreateGroup.helpers({
      group_name: function(){
            return Groups.find({},{ gname: 1, _id: 0});
      }
});

Template.CreateGroup.events({
      "submit .form": function(event) {
            event.preventDefault();
            var privacy_flag;
            // Get value from form element
            var gtitle = event.target.Title.value;
            var gdesc = event.target.Description.value;
            var result = Groups.findOne({ gname: gtitle });
            if (result) {
                  Toast.info("Group with same name already exist.","Warning!!!");
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
            Meteor.call("addGroup", gtitle, gdesc, privacy_flag, function(err, res){
                  if(!err){//all good
                        var group = Groups.findOne({ gname: gtitle });
                        var id= group._id;
                        Toast.success('Created successfully');
                        Router.go('/group/'+id);
      		}
                  else{
                        Toast.error('Unsuccessful');
                  }
      	});
            // Clear form
            event.target.Title.value = "";
            event.target.Description.value = "";
            event.target.Privacy.checked = false;
	}  
});

