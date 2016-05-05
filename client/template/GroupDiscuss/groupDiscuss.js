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
    gdPost: function(){   
        var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        return Thread.find({groupID: groupId});
        //return Thread.find(group);
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
        Thread.remove(this._id);
    }
    // 'click #edit' :function(text){
    //  
    //  var edittext = Thread.findOne({_id:this._id},{content:1,_id:0,createdAt:0});
    //  Meteor.call("editThread",edittext);
    //  console.log(edittext);
    //  //event.target.commentbox.value = "hello";
    // }
});
