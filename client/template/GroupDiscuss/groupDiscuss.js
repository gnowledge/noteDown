Template.groupdiscussion.onCreated(function(){
    var self= this;
    this.autorun( function() {
        self.subscribe('threads');
        self.subscribe('groups');
    });
});

Template.groupdiscussion.events({
    "submit .new-post": function(event){
        event.preventDefault();
        var text = event.target.commentbox.value;
        var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        Meteor.call("addThread",text, groupId);
        event.target.commentbox.value='';  
    }
});

Template.postMessage.helpers({
    'count':function(){
        var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
         return Thread.find({groupID: groupId}).count();
    },
    'gdPost': function(){   
        var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        return Thread.find({groupID: groupId},{sort: { publishedAt: -1}});
    },
    admin: function(){
       var owner= this.owner.id;
       if(owner === Meteor.userId())
        return true;
    }
});
 
Template.postMessage.onCreated(function(){
    var self= this;
    this.autorun( function() {
        self.subscribe('threads');
        self.subscribe('groups');
    });
});

Template.postMessage.events({
    'click #deletePost' : function(){
        var group_id= Session.get('groupId');
        Meteor.call('deleteThread',this._id,group_id);
    },
    'click #likePost' :function(text){
        var owner=this.owner.id;
        var thread= Thread.findOne({_id: this._id});
        var likedBy= thread.likedBy;
        var like = thread.like;;
        var content=this.content
        var user= Meteor.user().profile.name;
        var group_id= Session.get('groupId');
        for(var i=0;i<likedBy.length;i++){
            //console.log(likedBy[i]);
            if(likedBy[i]===Meteor.user().profile.name){
                return false;
            }
        }
        like++;
        Meteor.call('likeThread',this._id,like,owner,group_id,content);
    }
});
