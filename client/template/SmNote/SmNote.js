Template.CreateNote.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
	console.log(Meteor.status());
});

Template.CreateNote.events({
	'submit #addPost' : function (event) {
		event.preventDefault();
		var title = event.target.postTitle.value;
		var result = Posts.findOne({ Title: title, "owner.id": Meteor.userId() });
        if (result) {
              alert("Post name already exists");
              event.target.postTitle.value = "";
              return false;
        }
		//var message = event.target.postMessage.value;
		var postBody = $('#summernote').summernote('code');
		var loc = Session.get('location');
		var tags = Session.get('tag');
		var privacy= "private";
		var created_date = new Date().toLocaleString();
		Meteor.call('addPost', title, /*message,*/ postBody,loc, tags, privacy, created_date, function(err, res){
				if(!err){//all good
					var note= Posts.findOne({ Title: title });
					var id= note._id;
					Router.go('/posts/'+id);
				}
			});
		//location.reload();
	}
});

//every time the template rendered
Template.CreateNote.onRendered(function () {
		$(document).ready(function() {
		  $('#summernote').summernote();
		});
});

//-------------------single note page------------------

Template.SingleNote.helpers({
	post: function() { 
		var id = Session.get('postId');
		var post=Posts.findOne({_id: id});
		return post;
	},
	owner: function(){
		var id = Session.get('postId');
		var post=Posts.findOne({_id: id});
		var owner= post.owner.id;
		if(owner=== Meteor.userId())
			return owner;
	},
	tags:function(){
		var id = Session.get('postId');
		var post=Posts.findOne({_id: id});
		if(post.Tags)
			return true;
	}
});

Template.SingleNote.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});


Template.SingleNote.events({
	'click #deletePost': function () {
		var id = Session.get('postId');
		console.log(id);
		Meteor.call('deletePost', id);
		Router.go('User');
	},
	'click #publishNote': function () {
		var id = Session.get('postId');
		Session.set('note_id',id);
		Router.go('publishNote');
	}
});
//-------------------------------editing personal notes-----------------
Template.EditNote.events({
	'submit #editPost' : function (event) {
		event.preventDefault();
		var id = Session.get('postId');
		var title = event.target.postTitle.value;
		//var message = event.target.postMessage.value;
		var post= Posts.findOne({_id: id});
		var owner= post.owner.id;
		var postBody = $('#summernote').summernote('code');
		var loc = Session.get('location');
		var tags = Session.get('tag');
		var updatedAt = new Date().toLocaleString();
		Meteor.call('editPost',id, title, /*message,*/ postBody, owner, loc, tags, updatedAt, function (error) {
			if(!error){
				Router.go('/posts/'+id);
			}
		});
	}
});

Template.EditNote.onRendered(function () {
	$(document).ready(function() {
		  $('#summernote').summernote();
		});
});

Template.EditNote.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});

Template.EditNote.helpers({
	edit : function(){
		var id = Session.get('postId');
		var edit=Posts.findOne({_id: id});
		return edit;
	}

});
//------------------------------------------
/*Template.ShareNotes.helpers({
	posts: function() {
		return Posts.find({"owner.id": Meteor.userId()},{sort: {createdOn: 1}},{limit: 6});
	}
});

Template.ShareNotes.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});

Template.ShareNotes.events({
	'click #Share':function(event){
		event.preventDefault();
		var note_id=this._id;
		var note_owner= this.owner.id;
		var group_id= Session.get('groupId');
		Meteor.call('shareNotes',note_id, group_id);
	}
});
*/
//----------------------------------------
Template.SharedNotes.helpers({
	posts: function() {
		var group_id= Session.get('groupId');
		return Posts.find({groupID: group_id, privacy: "public"}, { sort: {createdOn: -1}});
	},
	post:function(){
		var group_id= Session.get('groupId');
		return Posts.find({groupID: group_id, privacy: "public"}).count();
	}
});

Template.SharedNotes.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});



//--- Notes of user-------------
Template.YourNotes.helpers({
	posts: function() {
		return Posts.find({"owner.id":Meteor.userId(), privacy: "private"},{sort: {createdOn: -1, updatedAt: 1}});
	},
	post:function(){
		return Posts.find({"owner.id":Meteor.userId(), privacy: "private"}).count();
	}
});

Template.YourNotes.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});



//---- Creating notes in Groups----------

Template.CreateNoteInGroup.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});

Template.CreateNoteInGroup.events({
	'submit #addPost' : function (event) {
		event.preventDefault();
		var title = event.target.postTitle.value;
		var result = Posts.findOne({ Title: title, "owner.id": Meteor.userId() });
        if (result) {
              alert("Post name already exists");
              event.target.postTitle.value = "";
              return false;
        }
		//var message = event.target.postMessage.value;
		var postBody = $('#summernote').summernote('code');
		var loc = Session.get('location');
		var tags = Session.get('tag');
		var privacy= "public";
		var groupID= Session.get('groupId');
		var group= Groups.findOne({ _id: groupID});
		var group_name = group.gname;
		Meteor.call('addGroupNote', title, /*message,*/ postBody,loc, tags, privacy, groupID, group_name, function(err, res){
				if(!err){//all good
	                  var note= Posts.findOne({ Title: title });
	                  var id= note._id;
	                  Router.go('/group_notes/'+id);
	                  //location.reload();
				}
			});
		
	}
});

//every time the template rendered
Template.CreateNoteInGroup.onRendered(function () {
		$(document).ready(function() {
		  $('#summernote').summernote();
		});
});

Template.SingleNoteOfGroup.onRendered(function(){
	$(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 100;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show less >";
    var lesstext = "Show more";
    

    $('.more').each(function() {
        var content = $(this).html();
         if(content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
             var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
             $(this).html(html);
        }
 
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
	});
});

Template.SingleNoteOfGroup.helpers({
	post: function() { 
		var id = Session.get('postId');
		var post=Posts.findOne({_id: id});
		return post;
	},
	owner: function(){
		var id = Session.get('postId');
		var post=Posts.findOne({_id: id});
		var owner= post.owner.id;
		if(owner=== Meteor.userId())
			return owner;
	},
	tags:function(){
		var id = Session.get('postId');
		var post=Posts.findOne({_id: id});
		if(post.Tags)
			return true;
	}
});

Template.SingleNoteOfGroup.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});

Template.SingleNoteOfGroup.events({
	'click #deletePost': function () {
		var id = Session.get('postId');
		console.log(id);
		Meteor.call('deletePost', id);
		Router.go('/group/'+groupID+'/shared_notes/');
	},
	'click #publishNote': function () {
		var id = Session.get('postId');
		Session.set('note_id',id);
		Router.go('publishNote');
	}
});
//-------------------------------editing personal notes-----------------
Template.EditNoteOfGroup.events({
	'submit #editPost' : function (event) {
		event.preventDefault();
		var id = Session.get('postId');
		var title = event.target.postTitle.value;
		//var message = event.target.postMessage.value;
		var post= Posts.findOne({_id: id});
		var owner= post.owner.id;
		var postBody = $('#summernote').summernote('code');
		var loc = Session.get('location');
		var tags = Session.get('tag');
		var updatedAt = new Date().toLocaleString();
		Meteor.call('editGroupNote',id, title, /*message,*/ postBody, owner, loc, tags, updatedAt, function (error) {
			if(!error){
				Router.go('/group_notes/'+id);
			}
		});
	}
});

Template.EditNoteOfGroup.onRendered(function () {
	$(document).ready(function() {
		  $('#summernote').summernote();
		});
});

Template.EditNoteOfGroup.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});

Template.EditNoteOfGroup.helpers({
	edit : function(){
		var id = Session.get('postId');
		var edit=Posts.findOne({_id: id});
		return edit;
	}

});

//-----------------------------------------
Template.SharedNotesInGroup.helpers({
	posts: function() {
		var group_id= Session.get('groupId');
		return Posts.find({ groupID: group_id, privacy: "public"}, { sort: {createdOn: -1}});
	},
	post:function(){
		var group_id= Session.get('groupId');
		return Posts.find({groupID: group_id, privacy: "public"}).count();
	}
});

Template.SharedNotesInGroup.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});