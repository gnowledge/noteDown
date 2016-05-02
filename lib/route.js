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

	Meteor.methods({
		Successfully:function(){
			Router.go('User');
		}
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

Router.route('Note',{
	path:'/note',
	name:'Note'
});

Router.route('createNote',{
	path:'/create_note',
	name:'createNote'
});

Router.route('newGroup',{
	path:'/new_group',
	name:'newGroup'
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
        console.log('group id set '+Session.get('groupId'));
        this.next();
    }
});

Router.route('createReminder',{
	path:'/create_reminder',
	name:'createReminder'
});

Router.route('postMessage',{
	path:'/postMessage',
	name:'postMessage'
});

//--------------------------------------------------------------------

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