Router.configure({
	layoutTemplate: 'Main', 
	yieldTemplates: {
		'Header': { to: 'header'},
		'Footer': { to: 'footer'}
	}
});

if(Meteor.isClient) {
	Accounts.onLogin(function() {
		Router.go('User');
	});

	Accounts.onLogout(function() {
		Router.go('Home');
	});
}

Router.route('Home',{
	path:'/',
	name:'Home'
});

Router.route('User',{
	path:'/user',
	name:'User'	
});
//------------------------------------
Router.route('Note',{
	path:'/note',
	name:'Note'
});

Router.route('publishNote',{
	path:'/publish_note',
	name:'publishNote'
});

Router.route('SmNote',{
	path:'/SmNote',
	name:'SmNote'
});

Router.route('ShowNotes',{
	path:'/user/showNotes',
	name:'ShowNotes'
});

/*Router.route('ShowNote',{
	path:'/ShowNote',
	name:'ShowNote'
});*/


Router.route('SinglePost', {
	path: '/posts/:id',
	name: 'SinglePost',
	waitOn: function() {
        return Meteor.subscribe('posts');
    },
    onBeforeAction: function() {
    	var id= this.params.id;
        Session.set('postId', id);
        this.next();
    }
});

Router.route('EditPosts',{
	path:'/editPost',
	name:'EditPosts'
});


Router.route('SharedNotesInGroup',{
	path:'/shared_notes',
	name:'SharedNotesInGroup'
});

Router.route('CreateNote',{
	path:'/group_notes',
	name:'CreateNote'
});


//--------------------------------------
Router.route('newGroup',{
	path:'/new_group',
	name:'newGroup'
});

Router.route('YourGroup',{
	path:'/user/showGroups',
	name:'YourGroup'
});

Router.route('createGroup',{
	path:'/create_group',
	name:'createGroup'
});

Router.route('singleGroup', {
	path: '/group/:id',
	name: 'singleGroup',
	waitOn: function() {
        return Meteor.subscribe('groups');
    },
    onBeforeAction: function() {
        Session.set('groupId', this.params.id);
        this.next();
    }
});

Router.route('Members',{
	path:'/group_member',
	name:'Members'
});
//----------------------------------------
Router.route('CreateTodo',{
	path:'/Create_todo',
	name:'CreateTodo'
});

Router.route('CreateTask',{
	path:'/create_task',
	name:'CreateTask'
});


Router.route('GroupTask',{
	path:'/group_task',
	name:'GroupTask'
});

Router.route('YourTodo',{
	path:'/user/showTodo',
	name:'YourTodo'
});

Router.route('groupDiscuss',{
	path:'/groupDiscuss',
	name:'groupDiscuss'
});

Router.route('postMessage',{
	path:'/postMessage',
	name:'postMessage'
});



//--------------------------------------------------------------------

Router.route('SharedMediaInGroup',{
	path:'/shared_media',
	name:'SharedMediaInGroup'
});

Router.route('SharedMedia',{
	path:'/user/showMedia',
	name:'SharedMedia'
});

Router.route('Media',{
	path:'/Media',
	name:'Media'
});

Router.route('updown',{
	path:'/updown',
	name:'updown'
});

Router.route('images',{
	path:'/images',
	name:'images'
});

Router.route('files',{
	path:'/files',
	name:'files'
});

Router.route('audio',{
	path:'/audio',
	name:'audio'
});

Router.route('video',{
	path:'/video',
	name:'video'
});
if (Meteor.isClient) {

  // Scroll to top or requested hash after loading each page
  Router.onAfterAction(function() {
    Meteor.setTimeout(function () {
      var hash = $(window.location.hash);
      var scrollTo = hash.length ? hash.offset().top : 0;
      $("html, body").animate({ scrollTop: scrollTo }, 700, "easeInOutQuart");
    }, 0);
  });

  // Route-related helpers
  Template.registerHelper("absoluteUrl", function(path) {
    return Meteor.absoluteUrl(path);
  });

  Template.registerHelper("currentRouteIs", function(name) {
    var current = Router.current();
    return current && current.route && current.route.name === name || false;
  });

  Template.registerHelper("activeRoute", function(name) {
    var current = Router.current();
    return current && current.route && current.route.name === name && "active" || "";
  });

}

Router.route('Updates',{
	path:'/user/updates',
	name:'Updates'
});

Router.route('Search',{
	path:'/user/search',
	name:'Search'
});


