/*
this.Documents = new Mongo.Collection("documents");
EditingUsers = new Mongo.Collection("editingUsers");

usersIndex = new EasySearch.Index({
    collection: Meteor.users,
    fields: ['profile.id','profile.id'],
    engine: new EasySearch.MongoDB()
});

//Groups
Groups = new Ground.Collection("groups");
 groupsIndex = new EasySearch.Index({
    collection: Groups,
    fields: ['gname','privacy'],
    engine: new EasySearch.MongoDB()
  });

Notify = new Ground.Collection('notify');

Tasks = new Ground.Collection("tasks");


//-------------------gd-------------------------
Thread = new Ground.Collection('threads');

//-----------------------summernote-------------------
Posts = new Ground.Collection("posts");
 postsIndex = new EasySearch.Index({
    collection: Posts,
    fields: ['Title'],
    engine: new EasySearch.MongoDB()
  });

Rss = new Ground.Collection("rss");

*///Note
this.Documents = new Mongo.Collection("documents");
EditingUsers = new Mongo.Collection("editingUsers");

usersIndex = new EasySearch.Index({
    collection: Meteor.users,
    fields: ['profile.id','profile.name'],
    engine: new EasySearch.MongoDB()
});

//Groups
Groups = new Meteor.Collection("groups");
 groupsIndex = new EasySearch.Index({
    collection: Groups,
    fields: ['gname','privacy'],
    engine: new EasySearch.MongoDB()
  });

Notify = new Meteor.Collection('notify');

Tasks = new Meteor.Collection("tasks");


//-------------------gd-------------------------
Thread = new Meteor.Collection('threads');

//-----------------------summernote-------------------
Posts = new Meteor.Collection("posts");
 postsIndex = new EasySearch.Index({
    collection: Posts,
    fields: ['Title','Tags'],
    engine: new EasySearch.MongoDB()
  });

Rss = new Meteor.Collection("rss");



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

