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
        return Thread.find({},{sort : {createdAt:-1} }); 
        //return Thread.find();
    },
    'count':function(){
        return Thread.find().count();
    },
    'admin': function(){
        return Thread.findOne({_id:this._id, "owner.id" : Meteor.user()._id });
    }
});

Template.postMessage.events({
    'click #delete' : function(){
        Thread.remove(this._id);
    },
    'click #rename' :function(text){
        var id= this._id;
        var edittext = Thread.findOne({_id: id});
        //Meteor.call("editThread",id, content);
        //console.log(content);
        //event.target.commentbox.value = "hello";
     }
});
