Template.SmNote.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('posts','rss-feed');
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
		/*var arr=[];
		arr[0]= title;
		arr[1]=message;
		arr[2]=postBody;
		arr[3]=loc;
		arr[4]=tags;*/
		var user= Meteor.user().profile.name;
		Meteor.call('addPost', title, message, postBody,loc, tags, function (error) {
			if(!error){
				var feed={
					rss_title: user + "has created a new note " + title,
					user: user,
					createdAt: new Date() 
				}
				Notify.insert(feed);
				Meteor.call('Successfully');
			}
		});
			
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
		return Posts.find({ "owner.id": Meteor.userId()},{sort: {createdOn: 1}},{limit: 6});
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
				console.log('Successfully');
				Router.go('ShowNotes');
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
