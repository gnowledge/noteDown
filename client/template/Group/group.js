Template.singleGroup.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('groups');
	});
});

Meteor.subscribe('notify');
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
	private:function(){
		var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        var group = Groups.findOne({_id: groupId});
        var private= group.privacy;
        	if(private === "private")
        		return true;
	},
	member: function(){
		var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        var group = Groups.findOne({_id: groupId});
        //var member= Groups.find({ _id: groupId },{ "members.id":1, _id: 0 });
        var userId = Meteor.userId();
        for (var i = 0; i < group.members.length; i++) {
      		if (group.members[i].id === userId) {
        		return true;
      		}
    	}
    },
    members: function(){
    	var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        var group = Groups.findOne({_id: groupId});
        var members= group.members;
        return members;
    },
    notification: function(){
    	var groupId = Session.get('groupId');
    	var notification= Notify.find({"owner.id": Meteor.user()._id},{sort : {createdAt:-1} });
    	return notification;
    },
    notificationCount: function(){
    	var groupId = Session.get('groupId');
    	return Notify.find({"group.id": groupId}).count();
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
	                Router.go('User');
				}
			});
		}
	},
	
	"click #join": function(event) {
		if(confirm("Are you sure you want to join ?")== true){
			var groupId = Session.get('groupId');
			var group= Groups.findOne(groupId);
			var name= group.gname;
			var memberId= Meteor.user()._id;
			var memberName= Meteor.user().profile.name;
			var ownerId= group.owner.id;
			var ownerName= group.owner.name;
			var msg;
			Meteor.call('joinGroup',groupId, memberId, memberName, function(err,res){
				if(!err){//all good
				}
			});	
		}	
	},

	"click #leave": function(event) {
		if(confirm("Are you sure you want to leave ?")== true){
			var groupId = Session.get('groupId');
			console.log(groupId);
			var data= Groups.findOne(groupId);
			var user= Meteor.user().profile.name;
			var name= data.gname;
			Meteor.call('leaveGroup',groupId, function(err,res){
				if(!err){//all good
	               Router.go('User');
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
			var input2 = $('<textarea id="desc" rows="3">'+ d +'</textarea>');
			$("#gdesc").replaceWith(input2);

			//Change button text
			$("#edit").prop('value', 'Save');
			$("#edit").prop('class', 'btn btn-success pull-right glyphicon glyphicon-file');
			$("#edit").prop('id', 'save');	
			$("#edit").prop('title', 'Save');
			
		}			
	},
	"click #save": function(event){
		var groupId = Session.get('groupId');
		var group= Groups.findOne({ _id: groupId});
		var gtitle=document.getElementById('name').value;
		var gdesc= document.getElementById('desc').value;
		
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
                $("#save").prop('class', 'btn btn-primary pull-right glyphicon glyphicon-pencil');
				$("#save").prop('id', 'edit');
				$("#save").prop('title', 'Edit');
			}
		});
	},

	"click #request": function(event){
		var groupId = Session.get('groupId');
		var group= Groups.findOne({ _id: groupId});
		var owner= group.owner.id;
		var ownerName=group.owner.name;
		var currentUser= Meteor.user()._id;
		var currentUserName= Meteor.user().profile.name;
		if(owner!== currentUser){
			Meteor.call("requestJoin", groupId, owner,ownerName, currentUser, currentUserName, function(err,res){
				if(!err){//all good)
					alert("Request sent succesfully");
					Router.go('User');
				}
			});
		}
	},

	"click #accept": function(event){
		var id= this._id;
		console.log(id);
		var data= Notify.findOne(id);
		var userId= data.user.id;
		var username= data.user.name;
		var groupId= data.group.id;
		var group=Groups.findOne(groupId);
		var gname= group.gname;
		Meteor.call('joinGroup',groupId, userId, username, function(err,res){
				if(!err){//all good
					var nid= Notify.remove(id);
	                return nid;
				}
		});	
	},
	"click #decline": function(event){
		var id= this._id;
		var nid= Notify.remove(id);
	    return nid;
	},
	"click .delete": function(event) {
		var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        var group = Groups.findOne({_id: groupId});
		var memberId= this.id;
		var memberName= this.name;
		console.log(memberName);
		Meteor.call('removeMember',groupId, memberId, memberName, function(err,res){
			if(!err){
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
		},{sort: {createdAt: 1}},{limit: 6});
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
				{"members.id": {$ne:  Meteor.userId() } }/*,
				{ "privacy" : { $ne: "private"}}*/
			]
		},{sort: {createdAt: 1}},{limit: 6});
	}
});
