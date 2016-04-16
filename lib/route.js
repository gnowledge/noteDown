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


