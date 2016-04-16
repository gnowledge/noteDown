Template.singleGroup.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('groups');
	});
});

Template.singleGroup.helpers({
	group : function(){
		var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        var group = Groups.findOne({_id: groupId});
        return group;
	},
	owner: function(){
		var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        var group = Groups.findOne({_id: groupId});
        var owner= group.owner.id;
        //console.log("Owner is: " +owner);
        if(owner=== Meteor.user()._id)
        	return owner;
        
	},
	member: function(){
		var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        var group = Groups.findOne({_id: groupId});
        var member= Groups.find({ _id: groupId },{ "members.id":1, _id: 0 });
        var userId = Meteor.userId();
        for (var i = 0; i < group.members.length; i++) {
      		if (group.members[i].id === userId) {
        		return true;
      		}
    	}
    	
    }
});

Template.singleGroup.events({
	"click #delete": function(event) {
		if(confirm("Are you sure you want to delete ?")== true){
			var groupId = Session.get('groupId');
			Meteor.call('deleteGroup', groupId, function(err,res){
				if(!err){//all good
					//console.log("group deleted: "+res);
	                alert('Group deleted succesfully');
	                Meteor.call('Successfully');
				}
			});
		}
	},

	"click #join": function(event) {
		if(confirm("Are you sure you want to join ?")== true){
			var groupId = Session.get('groupId');
			console.log(groupId);
			Meteor.call('joinGroup',groupId, function(err,res){
				if(!err){//all good
					//console.log("group joined: "+res);
	                alert('Group joined succesfully');
	                Meteor.call('Successfully');
				}
			});	
		}	
	},

	"click #leave": function(event) {
		if(confirm("Are you sure you want to leave ?")== true){
			var groupId = Session.get('groupId');
			console.log(groupId);
			Meteor.call('leaveGroup',groupId, function(err,res){
				if(!err){//all good
					//console.log("group joined: "+res);
	                alert('Group left succesfully');
	                Meteor.call('Successfully');
				}
			});	
		}			
	},

	"click #edit": function(event) {
		if(confirm("Are you sure you want to edit ?")== true){
			var groupId = Session.get('groupId');
			var group= Groups.findOne({ _id: groupId});
			console.log(groupId);
			// Converting H3 tag into textbox
			var n= $("#gname").text();
			var d= $("#gdesc").text();

			var input= $('<input id="name" type="text" value="' + n + '" />');
			$("#gname").replaceWith(input);
			var input2 = $('<input id="desc" type="text" value="' + d + '" />');
			$("#gdesc").replaceWith(input2);

			
			$("#edit").prop('value', 'Save');
			$("#edit").prop('id', 'save');	
			//$('#gname').prop('id','gname');
			
		}			
	},
	"click #save": function(event){
		var groupId = Session.get('groupId');
		var group= Groups.findOne({ _id: groupId});
		console.log(groupId);
		var gtitle=document.getElementById('name').value;
		console.log("name" +gtitle);
		var gdesc= document.getElementById('desc').value;
		console.log("desc" +gdesc);	
		//$('#name').replaceWith($('<h3 id="gname"/>',{value:gtitle}));

		var h1= document.createElement('h3');
		var lblname= $(h1).attr({
			'id': "gname",
			'value': gtitle
		});
		$('#name').replaceWith(lblname);
		var h2= document.createElement('h3');
		var lbldesc= $(h2).attr({
			'id': "gdesc",
			'value': gdesc
		});
		$('#desc').replaceWith(lbldesc);


		Meteor.call('saveGroup',groupId,gtitle, gdesc, function(err,res){
			if(!err){//all good
				console.log("group saved: "+res);
				$('#gname').text(gtitle);
				$('#gdesc').text(gdesc);
                $("#save").prop('value', 'Edit');
				$("#save").prop('id', 'edit');
                Meteor.call('Successfully');
			}
		});
	}

});

Template.yourGroup.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('groups');
	});
});

Template.yourGroup.helpers({
	groups : function(){
		return Groups.find({ $or:[ 
				{"owner.id": Meteor.userId()},
				{"members.id": Meteor.userId()}
			]
		});
	}
});

Template.allGroup.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('groups');
	});
});

Template.allGroup.helpers({
	groups : function(){
		return Groups.find({
			$and:[ 
				{ "owner.id": {$ne: Meteor.userId() } },
				{"members.id": {$ne:  Meteor.userId() } },
				{ "privacy" : { $ne: "private"}}
			]
		});
	}
});


