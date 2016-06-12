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
    },
    'reply': function(){
        var postid= Session.get('postId');
        return Thread.find({ postId:postid });
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
        $($this).parents("#li1").siblings("#commentboxContainer").slideToggle();
        
    },
    'click #hidebtn' : function(e){
        e.preventDefault();
        var $this = $(e.target);         
        $($this).parents("#commentboxContainer").find("#replyCommentbox").slideToggle();

    },

    'click #replyOkbtn' : function(e){
        e.preventDefault();
        var value = $("#replyBox1").val();
        var $this = $(e.target);
        //Toast.info("value : "+value);
        var replyIcon1 = '<span class="glyphicon glyphicon-comment" id="reply_replyIcon" style="margin-left:10px; cursor: pointer;" title="Reply"></span>';
        $($this).parents("#commentboxContainer").find("#replyCommentbox").append('<li id="commentboxContainer_li">'+value +replyIcon1+"</li>");
        var userid= Meteor.userId();
        var username = Meteor.user().profile.name;
        var id= this._id;
        var replyId = 1;
        Meteor.call('setReply', replyId, userid, username, value,id);
        replyId++;
        $("#replyBox1").val(" ");
        $('#replyPostboxContainer').hide();
    },

    'click #reply_replyIcon':function(e){
        e.preventDefault();
        var $this = $(e.target);
        var count = 1;
        var idgenerate = "reply_replyBox_"+(count++);
        var textbox = '<li id="reply_replyBox_li1"><div class="container-fluid"><div class="col-md-12" style="background-color:lavender"><form id="form_reply_replyIcon"><input type="text" id="reply_replyBox" style="float:left;"><input type="submit" id="reply_replyOkbtn" class="btn btn-primary" value="Ok"><input type="submit" id="reply_hidebtn" class="btn btn-primary" style="margin-left:5px;" value="hide"></form></div></div></li>';
        $($this).after(textbox);
        $($this).off('click');
        
    },
    'click #reply_replyOkbtn':function(e){
        e.preventDefault();
        var $this = $(e.target);
        var value = $($this).prev("#reply_replyBox").val();
        Toast.info("reply_replyOkbtn : "+value);
        var replyIcon1 = '<span class="glyphicon glyphicon-comment " id="reply_replyIcon" style="margin-left:10px; cursor: pointer;" title="Reply"></span>';
        
        $($this).parent().append('<li id="li_test">'+value+"   "+replyIcon1+"</li>");
        $($this).prev().val(" ");
    },
    'click #reply_hidebtn' : function(e){
        e.preventDefault();
        var $this = $(e.target);
        $($this).parents("#reply_replyBox_li1").find("#li_test").slideToggle();
    } 
});


