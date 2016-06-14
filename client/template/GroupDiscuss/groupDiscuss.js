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
<<<<<<< HEAD
        var post_id= this._id;
        var text = event.target.commentbox.value;
        var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        Meteor.call("addThread",text, groupId,post_id);
=======
        var post_id= Session.get('postId');
        var post = Posts.findOne({ _id: post_id });
        var pname = post.Title;
        var text = event.target.commentbox.value;
        var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        Meteor.call("addThread",text, groupId,post_id, pname);
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
        event.target.commentbox.value='';  
    }
});

Template.postMessage.helpers({
    'count':function(){
<<<<<<< HEAD
        var postid= this._id;
         return Thread.find({ postId:postid}).count();
    },
    'gdPost': function(){   
        var postid= this._id;
        return Thread.find({ postId:postid});
=======
        var postid= Session.get('postId');
         return Thread.find({ postId:postid}).count();
    },
    'gdPost': function(){   
        var postid= Session.get('postId');
        return Thread.find({ postId:postid, type: "comment"},{sort: {publishedAt: -1}});
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
    },
    admin: function(){
       var owner= this.owner.id;
       if(owner === Meteor.userId())
        return true;
<<<<<<< HEAD
=======
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
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
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
<<<<<<< HEAD
        var note_id= note._id;
=======
        var note_id= Session.get('postId');
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
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
<<<<<<< HEAD
            //console.log(likedBy[i]);
=======
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
            if(likedBy[i]===Meteor.user().profile.name){
                return false;
            }
        }
        like++;
        Meteor.call('likeThread',this._id,like,owner,owner_name,group_id,content);
<<<<<<< HEAD
    }
});
=======
    },
    'click #replyIcon' : function(e){
        var $this = $(e.target);
        $($this).parents("#li1").siblings("#commentboxContainer").slideToggle();
        
    },
    /*'click #hidebtn' : function(e){
        e.preventDefault();
        var $this = $(e.target);         
        $($this).parents("#commentboxContainer").find("#replyPostboxContainer").slideToggle();

    },*/

    'click #replyOkbtn' : function(e){
        e.preventDefault();
        var value = $("#replyBox1").val();
        if(value === ""){
            $("#replyBox1").focus();
            return false;
        }
        var $this = $(e.target);
        var userid= Meteor.userId();
        var username = Meteor.user().profile.name;
        var id= this._id;
        var type = "thread";
        Meteor.call('setReply', userid, username, value, id, type, function(err,res){
            if(!err){
                $("#replyBox1").val(" ");
                $('#replyPostboxContainer').hide();
            }
        });   
    },

    'click #reply_replyIcon':function(e){
        e.preventDefault();
        var $this = $(e.target); 
        var count = 1;
        var idgenerate = "reply_replyBox_"+(count++);
        var textbox = '<li id="reply_replyBox_li1"><div class="container-fluid"><div class="col-md-12"><form id="form_reply_replyIcon"><input type="text" id="reply_replyBox" style="float:left;"><input type="submit" id="reply_replyOkbtn" class="btn btn-primary" value="Ok"></form></div></div></li>';
        $($this).after(textbox);
        $($this).off('click');
        
    },
    'click #reply_replyOkbtn':function(e){
        e.preventDefault();
        var $this = $(e.target);
        var id = this._id;
        var value = $($this).prev("#reply_replyBox").val();
        var userid= Meteor.userId();
        var username = Meteor.user().profile.name;
        var id= this._id;
        var type = "reply";
        Meteor.call('setReply', userid, username, value, id,type, function(err,res){
            if(!err){
                $('#reply_replyBox_li1').hide();
            }
        });
        
        $($this).prev().val(" ");
    }/*,
    'click #reply_hidebtn' : function(e){
        e.preventDefault();
        var $this = $(e.target);
        $($this).parents("#reply_replyBox_li1").find("#li_test").slideToggle();
    } */
});


>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
