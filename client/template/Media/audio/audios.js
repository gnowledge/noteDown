Template.audio.created = function(){
	this.filename = new ReactiveVar('');
};


Template.audio.onCreated(function(){
	var self= this;
	this.autorun( function() {
		self.subscribe('audios');
	});
});


Meteor.startup(function() {

	Template.audio.events({
	'change input.audioFile' : FS.EventHandlers.insertFiles(Collections.Audios,{
		metadata : function(fileobj){
			return {
				owner : Meteor.userId(),
				dropped : false
			};
		},

		after : function (error,fileobj){
			if(!error){
				console.log("Inserted",fileobj.name());
			}
		}
	}),


	'keyup .filename': function(){
		var ins = Template.instance();
		if(ins){
			ins.filename.set($('.filename').val());
			}
		}
	});
});


Template.audio.helpers({
  uploadedAudios: function() {
    return Collections.Audios.find({owner: Meteor.userId()});
  }
});