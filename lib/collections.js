

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
Groups = new Mongo.Collection("groups");
Groups.allow({
  insert: function (userId, doc) {
    return true;
  }
});

//Todo
Todo = new Mongo.Collection("todo");
Todo.allow({
  insert: function (userId, doc) {
    return true;
  }
});


