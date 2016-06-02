Stores = {};

/*Stores for Images*/
Stores.images = new FS.Store.GridFS("images");

/*Stores for Audios*/
Stores.audios = new FS.Store.GridFS("audios");

/*Stores for Videos*/
Stores.videos = new FS.Store.GridFS("videos");

/*Stores for Files*/
Stores.any = new FS.Store.GridFS("any");


/*Stores for Thumbnils*/
Stores.thumbs = new FS.Store.GridFS("thumbs", {
  beforeWrite: function(fileObj) {
    // We return an object, which will change the
    // filename extension and type for this store only.
    return {
      extension: 'png',
      type: 'image/png'
    };
  },
  transformWrite: function(fileObj, readStream, writeStream) {
    // Transform the image into a 60px x 60px PNG thumbnail
    gm(readStream).resize(60).stream('PNG').pipe(writeStream);
    // The new file size will be automatically detected and set for this store
  }
});

