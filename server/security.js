function trueFunc(userId) {
  if (!userId) {
    // must be logged in
    return false;
  }

  return true;
}
function falseFunc() {return false;}

Collections.Files.allow({
  insert: trueFunc,
  update: trueFunc,
  remove: trueFunc,
  download: trueFunc
});

Collections.Files.deny({
  insert: falseFunc,
  update: falseFunc,
  remove: falseFunc,
  download: falseFunc
});

Collections.Images.allow({
  insert: trueFunc,
  update: trueFunc,
  remove: trueFunc,
  download: trueFunc
});

Collections.Images.deny({
  insert: falseFunc,
  update: falseFunc,
  remove: falseFunc,
  download: falseFunc
});

Collections.Audios.allow({
  insert: trueFunc,
  update: trueFunc,
  remove: trueFunc,
  download: trueFunc  
});

Collections.Audios.deny({
  insert: falseFunc,
  update: falseFunc,
  remove: falseFunc,
  download: falseFunc
});


Collections.Videos.allow({
  insert: trueFunc,
  update: trueFunc,
  remove: trueFunc,
  download: trueFunc  
});

Collections.Videos.deny({
  insert: falseFunc,
  update: falseFunc,
  remove: falseFunc,
  download: falseFunc
});

Groups.allow({
  insert: function (userId, doc) {
    return true;
  }
});

<<<<<<< HEAD
Notify.allow({ 
  insert: function(userId, doc) {
    // only allow posting if you are logged in    
    return true;  
  },
  remove:function (userId, doc) {
    return true;
  }
});

=======
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
Tasks.allow({
  insert: function (userId, doc) {
    return true;
  }
});

Thread.allow({
  insert: function (userId, doc) {
    return userId;
  },
  remove:function (userId, doc) {
    return true;
  }
});

Rss.allow({
  insert: function (userId,loc) {
    return true;
  },
  remove:function (userId, doc) {
    return true;
  }
});

Posts.allow({
  insert: function (userId,loc) {
    return true;
  },
  remove:function (userId, doc) {
    return true;
  }
});

<<<<<<< HEAD
=======
Meteor.users.allow({
  insert: function (userId,loc) {
    return true;
  },
  update: function (userId,loc) {
    return true;
  },
  remove:function (userId, doc) {
    return true;
  }
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});

>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
/*Documents.allow({
  insert: function (userId, doc) {
    return true;
  },
  update:function (userId, doc) {
    return true;
  }
});*/
