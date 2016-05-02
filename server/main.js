Meteor.startup(function() {
  console.log("Images Uploads:", Collections.Images.find().count());
  console.log("Files:", Collections.Files.find().count());
  console.log("Videos:", Collections.Videos.find().count());
  console.log("Audios:", Collections.Files.find().count());
});

