Meteor.methods({
	addDoc:function(){
		var doc;
		if(!this.userId){// NOt logged in
			return;
		}else{
			doc={
				owner:this.userId, 
				createdOn:new Date(), 
				title:"Untitled Document"
			};
			var id = Documents.insert(doc);
			return id; //return was missing. caused problem in method call.
		}
	},
	delDoc:function(doc){
		
		if(!this.userId){// NOt logged in
			return;
		}else{
			var realDoc=Documents.findOne({_id:doc._id, owner:this.userId});
			if(realDoc){
				//realDoc.isPrivate=doc.isPrivate;
				Documents.remove({_id:doc._id}, realDoc);
			}
			
		}
	},
	updateDocPrivacy:function(doc){
		console.log("updateDocPrivacy Method");
		console.log(doc);

		var realDoc=Documents.findOne({_id:doc._id, owner:this.userId});
		if(realDoc){
			realDoc.isPrivate=doc.isPrivate;
			Documents.update({_id:doc._id}, realDoc);
		}

	},

	addEditingUser:function(docid){
		var doc, user, eusers;

		doc = Documents.findOne({_id:docid});
		if(!doc){return;} //No Doc Give up.
		if(!this.userId){return;}// No Loggen in user Give up.
		//NOw i have a doc anf possibly a user.

		user=Meteor.user().profile;
		eusers=EditingUsers.findOne({docid:doc._id});
		if(!eusers){
			eusers={
				docid:doc._id,
				users:{},
			};
		}
		user.lastEdit = new Date();
		eusers.users[this.userId] = user;
		EditingUsers.upsert({_id:eusers._id},eusers);
	},

	//---------------Group Function--------------------------------------------


	addGroup: function(gtitle,gdesc, privacy) {
		var group;
		if(!this.userId){// NOt logged in
			return;
		}
		else {
			group={
				gname: gtitle,
				gdesc: gdesc,
				privacy: privacy,
				owner:{
						"id": this.userId,
					    "name": Meteor.user().username 
				},
				members:[],
				createdOn: new Date()
			};
			var id= Groups.insert(group);
			//console.log(id);
			var group_Id= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					group_ids: id
				}
			});
			
			//console.log(Meteor.users.find());
			return id;
		}
	},

	deleteGroup : function(groupId){
		var data = Groups.findOne(groupId);
		var owner= data.owner.id;
		console.log(owner);
		if(owner !== this.userId()){ // if not the owner of the group
			throw new Meteor.Error("not-authorised");
			alert("Not authorised to delete");
		}
		var id=Groups.remove(groupId);
		Meteor.users.update(
			{ _id: this.userId },
			{ 
				$pull: {
					group_ids: groupId 
				}
			}
		);
		return id;
	},

	joinGroup : function(groupId){
		var data= Groups.findOne(groupId);
		//console.log("data: " +data);
		var member=Groups.find({},{ "members_id":1, _id: 0 });
		var id= data._id;
		console.log("id: " +id);
		console.log(member);
		//member= data.members.id;
		if(!this.userId){// NOt logged in
			return;
		}
		else{
			var id= Groups.update(
				{"_id" : id},{
					$addToSet: {
						members:{ 
							"id": this.userId,
							 "name":Meteor.user().username 
							}
						}
					});
			return id;
		}
	},
	deletedSuccessfully:function(){
		Router.go('User');
	},

	//---------------Todo Function--------------------------------------------

	createReminder : function(text){
		var task;
	    if(! this.userId){
	    	throw new Meteor.Error("non-authorized");
	    }
		else{
			task={
				text: text,
		    createdAt : new Date(),
		    owner:{
				"id": this.userId,
				"name": Meteor.user().username 
			}
			}
		}
		var id=Tasks.insert(task);
		var reminderId= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					reminder_ids: id
				}
			});
		return id;
    },

    deleteReminder : function(taskId){
		//Tasks.remove(taskId);
		var task = Tasks.findOne(taskId);
		if(task.private && task.owner.id !== this.userId){
			throw new Meteor.Error("not-authorized");
		}
		var id=Tasks.remove(taskId);
		Meteor.users.update({ _id: this.userId },{ 
				$pull: {
					reminder_ids: taskId 
				}
		});
		return id;

    },

    setCheckedReminder : function(taskId, setChecked){
		//Tasks.update(taskId, {$set : {checked:setChecked} });
		var task = Tasks.findOne(taskId);
		if(task.private && task.owner.id !== this.userId){
			throw new Meteor.Error("not-authorized");
		}
		else{
			Tasks.update({_id: taskId},{$set: {checked:setChecked}});
		}
    }
})