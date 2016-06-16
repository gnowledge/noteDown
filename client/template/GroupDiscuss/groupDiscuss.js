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
        var post = Posts.findOne({ _id: post_id });
        var pname = post.Title;
        var text = event.target.commentbox.value;
        var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        Meteor.call("addThread",text, groupId,post_id, pname);
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
        return Thread.find({ postId:postid, type: "comment"},{sort: {publishedAt: -1}});
    },
    admin: function(){
       var owner= this.owner.id;
       if(owner === Meteor.userId())
        return true;
    },
    'threads': function(){
        return Thread.find({type: "thread"},{sort: {publishedAt: -1}});
    },
    'threadCount': function(){
        return Thread.find({type: "thread"}).count();
    },
    'reply': function(){
        return Thread.find({type: "reply"});
    },
    'replyCount': function(){
        return Thread.find({type: "reply"}).count();
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
            if(likedBy[i]===Meteor.user().profile.name){
                return false;
            }
        }
        like++;
        Meteor.call('likeThread',this._id,like,owner,owner_name,group_id,content);
    },
    'click #replyIcon' : function(e){
        
        var $this = $(e.target);
        $($this).parents("#li1").siblings("#commentboxContainer").show();
        
    },
    'click #hidebtn' : function(e){
        event.preventDefault();
        var $this = $(e.target);               $($this).parents("#commentboxContainer").find("#replyCommentbox").slideToggle();
    },
    'click #replyOkbtn' : function(e){
        event.preventDefault();
        var value = $("#replyBox").val();
        var $this = $(e.target);
        var userid= Meteor.userId();
        var username = Meteor.user().profile.name;
        var id= this._id;
        var type = "thread";
        alert("value : "+value);
        var replyIcon1 = '<span class="glyphicon glyphicon-comment" id="reply_replyIcon" style="margin-left:10px; cursor: pointer;" title="Reply"></span>';
                $($this).parents("#commentboxContainer").find("#replyCommentbox").append('<li id="commentboxContainer_li"> Text: '+replyIcon1+"</li>");
        
        if(value === ""){
            $("#replyBox").focus();
            return false;
        }
        Meteor.call('setReply', userid, username, value, id, type);
        $("#replyBox").val(" ");
        $(".reply-post").hide();
    },
    'click #reply_replyIcon':function(e){
        event.preventDefault();
        var $this = $(e.target);       
        var textbox = '<li id="reply_replyBox_li1"><div class="container-fluid"><div class="col-md-12" style="background-color:lavender"><form id="form_reply_replyIcon"><input type="text" id="reply_replyBox" style="float:left;"><input type="submit" id="reply_replyOkbtn" class="btn btn-primary" value="Ok"></form></div></div></li>';
        
        $($this).closest("li").after(textbox);//.css({"color":"red"});
        
    },
    'click #reply_replyOkbtn':function(e){
        event.preventDefault();
        var $this = $(e.target);
        var id = this._id;
        var value = $($this).prev("#reply_replyBox").val();
        alert("reply_replyOkbtn : "+value);
        var userid= Meteor.userId();
        var username = Meteor.user().profile.name;
        var id= this._id;
        var type = "reply";
        var replyIcon1 = '<span class="glyphicon glyphicon-comment " id="reply_replyIcon" style="margin-left:10px; cursor: pointer;" title="Reply"></span>';
                $($this).parent().append('<li id="li_test" style="margin-right:0px">'+value+replyIcon1+"</li>");
        Meteor.call('setReply', userid, username, value, id,type);
                $($this).parent().find("input").hide();
    }
});



