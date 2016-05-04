Template.SmNote.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});

Template.SmNote.events({
	'submit #addPost' : function (event) {
		event.preventDefault();
		var title = event.target.postTitle.value;
		var message = event.target.postMessage.value;
		var postBody = $('#summernote').summernote('code');
		var loc = Session.get('location');
		var tags = Session.get('tag');
		Meteor.call('addPost', title, message, postBody,loc, tags);
		location.reload();
	}
});

//every time the template rendered
Template.SmNote.onRendered(function () {
		$(document).ready(function() {
		  $('#summernote').summernote();
		});
});

Template.ShowNotes.helpers({
	posts: function() {
		return Posts.find({},{sort: {createdOn: 1}},{limit: 6});
	}
});

Template.ShowNotes.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});

Template.SinglePost.helpers({
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
	}
});

Template.SinglePost.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});

Template.SinglePost.events({
	'click #deletePost': function () {
		var id = Session.get('postId');
		console.log(id);
		Meteor.call('deletePost', id);
		Meteor.call('Successfully');
	}
});
Template.EditPosts.events({
	'submit #editPost' : function (event) {
		event.preventDefault();
		var id = Session.get('postId');
		var title = event.target.postTitle.value;
		var message = event.target.postMessage.value;
		var postBody = $('#summernote').summernote('code');
		Meteor.call('editPost',id, title, message, postBody, function (error) {
			if(!error){
				//console.log('Successfully');
				Meteor.call('Successfully');
			}
		});
	}
});

Template.EditPosts.onRendered(function () {
	$(document).ready(function() {
		  $('#summernote').summernote();
		});
});

Template.EditPosts.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts');
	});
});

Template.EditPosts.helpers({
	edit : function(){
		var id = Session.get('postId');
		var edit=Posts.findOne({_id: id});
		return edit;
	}

});
