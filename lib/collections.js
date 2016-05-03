//Note
this.Documents = new Mongo.Collection("documents");
EditingUsers = new Mongo.Collection("editingUsers");

Documents.allow({
  insert: function (userId, doc) {
    return true;
  },
  update:function (userId, doc) {
    return true;
  }
});


//Groups
Groups = new Meteor.Collection("groups");
Groups.allow({
  insert: function (userId, doc) {
    return true;
  }
});

Notify = new Meteor.Collection('notify');
Notify.allow({ 
  insert: function(userId, doc) {
    // only allow posting if you are logged in    
    return true;  
  },
  remove:function (userId, doc) {
    return true;
  }
});


Tasks = new Meteor.Collection("tasks");
Tasks.allow({
  insert: function (userId, doc) {
    return true;
  }
});


//-------------------gd-------------------------

Thread = new Meteor.Collection('threads');
Thread.allow({
  insert: function (userId, doc) {
    return userId;
  },
  remove:function (userId, doc) {
    return true;
  }
});

//-----------------------summernote-------------------
Posts = new Meteor.Collection("posts");
Posts.allow({
  insert: function (userId,loc) {
    return true;
  }
});
Rss = new Meteor.Collection("rss");
Rss.allow({
  insert: function (userId,loc) {
    return true;
  },
  remove:function (userId, doc) {
    return true;
  }
});


//Collections File*/
Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);


/*Creating Collection For Images*/
Collections.Images = new FS.Collection("images", {
  stores: [
    Stores.images,//Providing Storage Adaptor
    Stores.thumbs
  ],
  filter: {
    maxSize: 20 * 1024 * 1024, //Allowing size 20MB
    allow: {
      contentTypes: ['image/*']//Setting content type Image Only
    },
    onInvalid: function(message) {
      Meteor.isClient && alert(message);
      console.log(message);
    }
  }
});


/*Creating Collection For Files*/
Collections.Files = new FS.Collection("files", {
  stores: [Stores.any],
  chunkSize: 4 * 1024 * 1024
});

//Creating Collection for Audios
Collections.Audios = new FS.Collection("audios",{
  stores : [ Stores.audios],

  filter : { maxSize : 20 * 1024 * 1024 ,
      
      allow : {contentTypes : ['audio/*'] },
      
      onInvalid : function(message){
        Meteor.isClient && alert(message);
        console.log(message);
      }
    }
  });

//Creating Collection for Videos
Collections.Videos = new FS.Collection("videos",{
  stores : [
           Stores.videos ,
           Stores.thumbs 
           ],

  chunkSize : 4 * 1024 * 1024 ,

  filter : {
   maxSize : 64 * 1024 * 1024 ,
      
      allow : {contentTypes : ['video/*'] },
      
      onInvalid : function(message){
        Meteor.isClient && alert(message);
        console.log(message);
      }
    }
  });

