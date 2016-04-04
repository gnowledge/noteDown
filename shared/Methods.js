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
				owner:
					{
						"id": this.userId,
					    "name": Meteor.user().username 
					},
				
				createdOn: new Date()
			};
			var id= Groups.insert(group);
			return id;
		}
	},

	deleteGroup : function(groupId){
		var data = Groups.findOne(groupId);
		var owner= data.owner.id;
		console.log(owner);
		if(owner !== Meteor.userId()){ // if not the owner of the group
			throw new Meteor.Error("not-authorised");
			alert("Not authorised to delete");
		}
		var id=Groups.remove(groupId);
		return id;
	},

	joinGroup : function(groupId){
		var data= Groups.findOne(groupId);
		console.log("data: " +data);
		
		var id= data._id;
		console.log("id: " +id);

		//member= data.members.id;
		if(!this.userId){// NOt logged in
			return;
		}
		else{
				var id=Groups.update({ "_id":id }, {
					$push:{
						"members":{
							"id" : this.userId,
							"name":Meteor.user().username
						}
					}
				});
				return id;
		}
	},

	//---------------Todo Function--------------------------------------------
	addList: function(list) {
		var List;
		if(!this.userId){// NOt logged in
			return;
		}
		else {
			List={
				title: list,
				owner: this.userId,
				createdOn: new Date()
			};
			var id= Todo.insert(List);
			return id;
		}
	}
})