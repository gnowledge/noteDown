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
        var groupId = Session.get('groupId');
        var thread= Thread.find({groupID: groupId});
        var 
        for(var i=0;i<thread.owner.length;i++){
            if(thread[i].owner.id === Meteor.userId())
                return true;
        }
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
        Meteor.call('deleteThread',this._id);
    },

    'click #likePost' :function(text){
        var id= this._id;
        console.log("id is: " +id);
        var thread= Thread.find({_id: id});
        var like = this.like;
        console.log("like value " +like);
        like++
        console.log("like value " +like);
        Meteor.call('likeThread',id,like);

    }
});
