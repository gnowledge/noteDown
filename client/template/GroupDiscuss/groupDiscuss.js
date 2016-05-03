Template.groupdiscussion.onCreated(function(){
    var self= this;
    this.autorun( function() {
        self.subscribe('threads');
    });
});

Template.groupdiscussion.events({
    "submit .new-post": function(event){
        event.preventDefault();
        var text = event.target.commentbox.value;
        //alert(text);
        Meteor.call("addThread",text);
        event.target.commentbox.value='';
        
    }
});

Template.postMessage.helpers({
    'message':function(){
        //return Thread.find({},{sort : {createdAt:-1} }); 
        return Thread.find();
    },
    'count':function(){
        return Thread.find().count();
    },
    'admin': function(){
        return Thread.find({ "owner.id" : Meteor.user()._id });
    }
});

Template.postMessage.events({
    'click #delete' : function(){
        Thread.remove(this._id);
    },
    'click #rename' :function(event){
        
        //Meteor.call("editThread",edittext);
        //event.target.commentbox.value = "hello";
    }
});