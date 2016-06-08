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
        var post_id= Session.get('postId');
        var text = event.target.commentbox.value;
        var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        Meteor.call("addThread",text, groupId,post_id);
        event.target.commentbox.value='';  
    }
});

Template.postMessage.helpers({
    'count':function(){
        var postid= Session.get('postId');
         return Thread.find({ postId:postid}).count();
    },
    'gdPost': function(){   
        var postid= Session.get('postId');
        return Thread.find({ postId:postid},{sort: {publishedAt: -1}});
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
        self.subscribe('posts');
    });
});

Template.postMessage.events({
    'click #deletePost' : function(){
        var thread_id= this._id;
        var note=Posts.findOne({ threads: thread_id},{ _id:1});
        var note_id= Session.get('postId');
        Meteor.call('deleteThread',thread_id, note_id);
    },
    'click #likePost':function(text){
        var owner=this.owner.id;
        var thread= Thread.findOne({_id: this._id});
        var likedBy= thread.likedBy;
        var like = thread.like;;
        var content=this.content
        var user= Meteor.user().profile.name;
        var group_id= Session.get('groupId');
        var owner_name= this.owner.name;
        for(var i=0;i<likedBy.length;i++){
            //console.log(likedBy[i]);
            if(likedBy[i]===Meteor.user().profile.name){
                return false;
            }
        }
        like++;
        Meteor.call('likeThread',this._id,like,owner,owner_name,group_id,content);
    },
    'click #replyIcon' : function(e){
        var $this = $(e.target);
        count =1;
        var textbox = $('<div id="replyboxContainer" class="container-fluid"><div class="col-md-8">Reply: &nbsp;<input type="text" id="replyBox"><input type="submit" id="replyOkbtn" class="btn btn-primary" value="Ok"></div></div><br>');
        $($this).parents("#ultest").append(textbox);
        
    },
    'click #replyOkbtn' : function(e){
        var value = $("#replyBox").val();
        var $this = $(e.target);
        $($this).parents("#ultest").append('<li>'+ value +'</li>');
        $("#replyboxContainer").hide(" ");
    }
});


