Meteor.methods({
	addDoc:function(loc,tags){		//, tags
		var doc;
		if(!this.userId){// NOt logged in
			return;
		}else{
			doc={
				owner:this.userId, 
				getLocation:loc,
				tagsName:tags,
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
		check(gtitle,String);
		check(gdesc,String);
		var group;
		var user=Meteor.user().profile.name;
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
					    "name": Meteor.user().profile.name 
				},
				members:[],
				member_count: 1,
				createdOn: new Date()
			};
			var id= Groups.insert(group);
			var group_Id= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					group_ids: id
				}
			});
			Rss.insert({
                rss_title: user + " has created a new group " + gtitle,
                user: user,
                createdAt: new Date(),
                action: "Group",
                id: id
          	});
			return id;
		}
	},

	deleteGroup : function(groupId){
		var data = Groups.findOne(groupId);
		var owner= data.owner.id;
		console.log(owner);
		if(owner !== this.userId){ // if not the owner of the group
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

	joinGroup : function(groupId, memberId, memberName){
		var data= Groups.findOne(groupId);
		var member=Groups.find({},{ "members_id":1, _id: 0 });
		var id= data._id;	
		var count= data.member_count;
		

		for (var i = 0; i < data.members.length; i++) {
      		if (data.members[i].id == memberId) {
        		return false;
      		}
    	}
    	count++;
		if(!memberId){// NOt logged in
			return;
		}
		else{
			var id= Groups.update(
				{"_id" : id},{
					$set:{ member_count: count},
					$addToSet: {
						members:{ 
							"id": memberId,
							"name":memberName
							}
						}
					});
			return id;
		}
	},

	leaveGroup: function(groupId) {
	    check(groupId, String);
	    var userId = Meteor.userId();
	    var name= Meteor.user().profile.name;
	    var result = Groups.findOne({_id: groupId});
	    var count= result.member_count;
	    if (!result) {
	      return false;
	    }
	    if (result.owner.id === userId) {
	      throw new Meteor.Error(403, 'You can\'t leave this group because you are owner');
	      return false;
	    } 
	    else {
	      count--;
	      return Groups.update(result._id, {
	      	$set: { member_count: count},
	      	$pull: {
				members:{
					id: userId,
					name: name 
				}
			}
			});
	    }
  	},

  	saveGroup: function(groupId,title, description){
  		var data= Groups.findOne(groupId);
  		check(title,String);
  		check(description,String);
  		if(!this.userId){// NOt logged in
			return;
		}
		else {
			var id= Groups.update({ _id: groupId },{
				$set:{
					gname: title,
					gdesc: description
				}
			});
			return id;
		}
  	},

  	requestJoin: function(groupId, ownerId,ownerName, user, username){
  		var data= Groups.findOne(groupId);
  		var name= data.gname;
  		var notification= {
  			title: username + " wants to join your group- " + name,
  			group:{
  				id: groupId,
  				name: name
  			},
  			owner:{
  				id: ownerId,
  				name: ownerName
  			},
  			user:{
  				id: user,
  				name: username
  			},
  			createdAt: new Date()
  		};
  		var id= Notify.insert(notification);
  		console.log(id);
  		return id;
  	},

  	removeMember: function(groupId, memberId, memberName){  
  		var data= Groups.findOne(groupId);
  		var count= data.member_count;
  		if (!data) {
	      return false;
	    }
	    if (data.owner.id === memberId) {
	      throw new Meteor.Error(403, 'You can\'t remove yourseld because you are owner');
	      return false;
	    } 
	    else {
	      count--;
	      return Groups.update({_id: groupId}, {
		      	$set: { member_count: count},
		      	$pull: {
					members:{
						id: memberId,
						name: memberName 
					}
				}
			});
	    }
  	},
	
	//---------------Todo Function--------------------------------------------

	createReminder : function(text, desc, date){
		check(text,String);
		check(desc,String);
		var task;
	    if(! this.userId){
	    	throw new Meteor.Error("non-authorized");
	    }
		else{
			task={
				title: text,
				desc: desc,
				date: date,
			    createdAt : new Date(),
			    owner:{
					"id": this.userId,
					"name": Meteor.user().profile.name 
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
		var task = Tasks.findOne(taskId);
		if(task.owner.id !== this.userId){
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
		var task = Tasks.findOne(taskId);
		if(task.owner.id !== this.userId){
			throw new Meteor.Error("not-authorized");
		}
		else{
			Tasks.update({_id: taskId},{$set: {checked:setChecked}});
		}
    },
     //--------------------------------group Discussion--------------------------
	addThread : function(msg, groupId){
		var thread = {
				content:msg,
				groupID:groupId,
				owner:{
					"id":this.userId,
					"name":Meteor.user().profile.name
				},
				publishedAt: new Date()
		};
		Thread.insert(thread);		
	},
	editThread : function(){	
	},
	//SummerNote------------------------------------
	addPost: function (title, message, postBody, loc, tags) {
		var doc;
		var user= Meteor.user().profile.name;
		if(!this.userId){// NOt logged in
			return;
		}
		else{
			doc={
				
				Title: title,
				Message: message,
				Body: postBody,
				owner:{
					id:this.userId, 
					name:Meteor.user().profile.name
				},
				getLocation:loc,
				tagsName:tags,
				createdOn:new Date(), 
			};
			var id = Posts.insert(doc);
			Rss.insert({
				rss_title: user + " has created a new note " + title,
				user: user,
				owner: user,
				createdAt: new Date(),
				action: "Post",
				id: id
			});
			return id;
		}  
		
	},

	editPost: function (postID, title, message, postBody) {
		var user=Meteor.user().profile.name;
		var id =Posts.update(postID,{
			$set:{
				Title: title,
				Message: message,
				Body: postBody,
				updatedAt: new Date(),
				editedUser: user	
			}
		});
		Rss.insert({
			rss_title: user + " has edited a note " + title,
			user: user,
			createdAt: new Date(),
			action: "Post",
			id: postID
		});
		return id;
	},
	
	deletePost: function (postID) {
		Posts.remove(postID);
	}
});



