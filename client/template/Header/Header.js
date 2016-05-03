Template.Header.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('rss');
	});
});

Template.Header.helpers({
	feed:function(){
		var feed= Rss.find();
		return feed;
	},
	feedCount:function(){
		return Rss.find().count();
	}
});

Template.Header.events({
	'click #check': function(event){
		var id= this._id;
		var action= this.action;
		var itemId= this.id;
		console.log(itemId);
		if(action=== "Post"){
			Router.go('/posts/'+itemId);
		}
		else if(action=== "Group"){
			Router.go('/group/'+itemId);
		}
	}
});


/*$(document).ready(function(e){
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
		var concept = $(this).text();
		$('.search-panel span#search_concept').text(concept);
		$('.input-group #search_param').val(param);
	});
});*/