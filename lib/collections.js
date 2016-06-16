this.Documents = new Mongo.Collection("documents");
EditingUsers = new Mongo.Collection("editingUsers");

//Groups
Groups = new Ground.Collection("groups");

Tasks = new Ground.Collection("tasks");

Tags = new Ground.Collection("tags");

//-------------------gd-------------------------
Thread = new Ground.Collection('threads');

//-----------------------summernote-------------------
Posts = new Ground.Collection("posts");

Rss = new Ground.Collection("rss");
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
      }
    }
  });

