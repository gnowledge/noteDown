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

Router.route('Note',{
	path:'/note',
	name:'Note'
});

Router.route('createNote',{
	path:'/create_note',
	name:'createNote'
});

Router.route('displayGroup',{
	path:'/display_group',
	name:'displayGroup'
});

Router.route('showGroup',{
	path:'/show_group',
	name:'showGroup'
});

Router.route('createGroup',{
	path:'/create_group',
	name:'createGroup'
});

Router.route('newGroup',{
	path:'/new_group',
	name:'newGroup'
});

Router.route('Group', {
	path: '/group/:id',
	name: 'Group',
	waitOn: function() {
        return Meteor.subscribe('groups');
    },
    onBeforeAction: function() {
        Session.set('groupId', this.params.id);
        console.log('group id set '+Session.get('groupId'));
        this.next();
    },
    onStop: function() {
        // do something when user navigate away from this route
    }
	
});
Router.route('createReminder',{
	path:'/create_reminder',
	name:'createReminder'
});
