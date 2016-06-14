Meteor.subscribe("documents");
Meteor.subscribe("editingUsers");

Template.editor.helpers({
	docid:function(){
		setupCurrentDocument();
		return Session.get("docid");
	},
	config:function(){
		return function(editor){
			editor.setOption("lineNumbers",true);
			editor.setOption("theme","cobalt");
			editor.on("change",function(cm_editor,info){
				console.log(cm_editor.getValue());
				//$("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
				Meteor.call("addEditingUser", Session.get("docid"));
			});
		}
	}
});

Template.editingUsers.helpers({
	users:function(){ // return users editing current document
		var doc,eusers,users;
		doc=Documents.findOne({_id:Session.get("docid")});
		if(!doc){return;} //givr up
		eusers=EditingUsers.findOne({docid:doc._id});
		if(!eusers){return;} // give up
		users = new Array();
		var i=0;
		for(var user_id in eusers.users){
			users[i]=fixObjectKeys(eusers.users[user_id]);
			i++;
		}
		return users;
	}
})

Template.noteHeader.helpers({
	documents:function(){
		var group = Session.get('groupId');
		return Documents.find({ groupID: group },{sort: {createdAt: -1}});
	},
	owner:function(){
		var doc = Documents.findOne({_id: Session.get('docid')});
		if(doc.owner===Meteor.userId()){
			return true;
		}
	}
})

Template.docMeta.helpers({
	document:function(){
		var group = Session.get('groupId');
		return Documents.findOne({_id:Session.get("docid")});
	}
})



/////////
//Events
/////////

Template.noteHeader.events({
	"click .js-add-doc":function(event){
		event.preventDefault();
		var group = Session.get('groupId');
		var id = Meteor.call("addDoc", group, function(err, res){
			if(!err){//all good
				console.log("callback recieved: "+res);
				Session.set("docid",res);
			}
		}); // DB ops only works from methods.
	},

	"click .js-del-doc":function(event){
		event.preventDefault();
		var doc={_id:Session.get("docid")};
		//They are logged in lets add a document
		Meteor.call("delDoc", doc); // DB ops only works from methods.
	},

	"click .js-load-doc":function(event){
		console.log(this);
		Session.set("docid",this._id);
	}
})




function setupCurrentDocument(){
	var doc;
	if(!Session.get("docid")){// NO doc id Set
		doc = Documents.findOne();
		if(doc){
			Session.set("docid",doc._id);
		}
	}
}

// this renames object keys by removing hyphens to make the compatible 
// with spacebars. 
function fixObjectKeys(obj){
  var newObj = {};
  for (key in obj){
    var key2 = key.replace("-", "");
    newObj[key2] = obj[key];
  }
  return newObj;
}