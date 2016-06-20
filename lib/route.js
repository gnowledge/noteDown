Router.configure({
	layoutTemplate: 'Main', 
	yieldTemplates: {
		'Header': { to: 'header'},
		'Footer': { to: 'footer'}
	},
    notFoundTemplate: "NotFound"
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

Router.route('VerifyUser',{
	path:'/verify',
	name:'VerifyUser'
});

Router.route('/user_dashboard/:id',{
	template: 'UserDashboard',
	name: 'UserDashboard',
	waitOn: function() {
        return Meteor.subscribe('user');
    },
    onBeforeAction: function() {
    	var id= this.params.id;
        Session.set('userId', id);
        console.log('userId: '+ Session.get('userId'));
        this.next();
    }
});
//------------------------------------
Router.route('Note',{
	path:'/note',
	name:'Note'
});

Router.route('DiscussNote',{
	path:'/group/:_id/discuss/',
	name:'DiscussNote',
    waitOn: function() {
        return Meteor.subscribe('posts');
    },
    onBeforeAction: function() {
        var id= this.params.id;
        Session.set('postId', id);
        Session.set('groupId', this.params._id);
        this.next();
    }
});

Router.route('CreateNote',{
	path:'/new_note',
	name:'CreateNote'
});

Router.route('YourNotes',{
	path:'/user/showNotes',
	name:'YourNotes'
});

Router.route('SingleNote', {
	path: '/notes/:id',
	name: 'SingleNote',
	waitOn: function() {
        return Meteor.subscribe('posts');
    },
    onBeforeAction: function() {
    	var id= this.params.id;
        Session.set('postId', id);
        console.log('postId: '+ Session.get('postId'));
        this.next();
    }
});

Router.route('EditNote',{
	path:'/edit_note/:id/',
	name:'EditNote',
	waitOn: function() {
        return Meteor.subscribe('posts');
    },
    onBeforeAction: function() {
    	var id= this.params.id;
        Session.set('postId', id);
        console.log('postId: '+ Session.get('postId'));
        this.next();
    }
});


Router.route('SharedNotesInGroup',{
	path:'/group/:id/shared_notes',
	name:'SharedNotesInGroup',
	waitOn: function() {
        return Meteor.subscribe('groups', 'posts');
    },
    onBeforeAction: function() {
        Session.set('groupId', this.params.id);
        this.next();
    }
});

Router.route('CreateNoteInGroup',{
	path:'/create_groupNotes',
	name:'CreateNoteInGroup'
});

Router.route('SingleNoteOfGroup', {
	path: '/group/:_id/notes/:id/',
	name: 'SingleNoteOfGroup',
	waitOn: function() {
        return Meteor.subscribe('posts');
    },
    onBeforeAction: function() {
    	var id= this.params.id;
        Session.set('postId', id);
        Session.set('groupId', this.params._id);
        this.next();
    }
});

/*Router.route('/group/:id/create_groupNotes',{
	template:'CreateNoteInGroup',
	name:'CreateNoteInGroup',
	waitOn: function() {
        return Meteor.subscribe('groups', 'posts');
    },
    onBeforeAction: function() {
        Session.set('group', this.params.id);
        this.next();
    }
});
*/
Router.route('EditNoteOfGroup',{
	path:'/group/:_id/edit_note/:id/',
	waitOn: function() {
        return Meteor.subscribe('posts');
    },
    onBeforeAction: function() {
    	var id= this.params.id;
        Session.set('postId', id);
        Session.set('groupId', this.params._id);
        console.log('postId: '+ Session.get('postId'));
        this.next();
    },
	name:'EditNoteOfGroup'
});
//--------------------------------------
Router.route('CreateGroup',{
	path:'/new_group',
	name:'CreateGroup'
});

Router.route('YourGroup',{
	path:'/user/showGroups',
	name:'YourGroup'
});

Router.route('SingleGroup', {
	path: '/group/:id',
	name: 'SingleGroup',
	waitOn: function() {
        return Meteor.subscribe('groups');
    },
    onBeforeAction: function() {
        Session.set('groupId', this.params.id);
        console.log('groupid: '+ Session.get('groupId'));
        this.next();
    }
});

Router.route('Members',{
	path:'/group/:id/members',
	name:'Members',
	waitOn: function() {
        return Meteor.subscribe('groups');
    },
    onBeforeAction: function() {
        Session.set('groupId', this.params.id);
        console.log('groupid: '+ Session.get('groupId'));
        this.next();
    }
});

Router.route('Invite',{
	path:'/group/:id/invite',
	name:'Invite',
        waitOn: function() {
        return Meteor.subscribe('groups');
    },
    onBeforeAction: function() {
        Session.set('groupId', this.params.id);
        console.log('groupid: '+ Session.get('groupId'));
        this.next();
    }
});
//------------Todo----------------------
Router.route('CreateTodo',{
	path:'/Create_todo',
	name:'CreateTodo'
});

Router.route('YourTodo',{
	path:'/user/showTodo',
	name:'YourTodo'
});

//------------Group Task----------------------
Router.route('CreateTask',{
	path:'/create_groupTask',
	name:'CreateTask'
});

Router.route('GroupTask',{
	path:'/group/:id/group_task',
	name:'GroupTask',
	waitOn: function() {
        return Meteor.subscribe('groups');
    },
    onBeforeAction: function() {
        Session.set('groupId', this.params.id);
        console.log('groupid: '+ Session.get('groupId'));
        this.next();
    }
});



Router.route('groupDiscuss',{
	path:'/groupDiscuss',
	name:'groupDiscuss'
});

Router.route('postMessage',{
	path:'/postMessage',
	name:'postMessage'
});



//--------------Media---------------------------------------------

Router.route('AddMedia',{
	path:'/add_media',
	name:'AddMedia'
});

Router.route('AddMediaInGroup',{
	path:'/add_groupMedia',
	name:'AddMediaInGroup'
});


Router.route('SharedMediaInGroup',{
	path:'/group/:id/shared_media/',
	name:'SharedMediaInGroup',
	waitOn: function() {
        return Meteor.subscribe('groups');
    },
    onBeforeAction: function() {
        Session.set('groupId', this.params.id);
        console.log('groupid: '+ Session.get('groupId'));
        this.next();
    }
});

Router.route('YourMedia',{
	path:'/user/showMedia',
	name:'YourMedia'
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

