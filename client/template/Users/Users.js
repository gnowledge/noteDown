Template.UserDashboard.onCreated(function() {
	var self= this;
	this.autorun( function() {
		self.subscribe('user');
	});
});

Template.UserDashboard.helpers({
	users: function(){
		var user= Session.get('userId');
		return Meteor.users.find({ _id: user});
	},
	user: function(){
		var user= Session.get('userId');
		var user= Meteor.users.findOne({ _id: user});
		if(user._id === Meteor.userId())
			return true;
	}
});

Template.UserDashboard.events({
	'click #edit':function(){
		var first_name = $("#firsttxt").text();
		var last_name = $("#lasttxt").text();
		var email = $("#emailtxt").text();
		var input2 = $('<input id="firsttxt" class="form-control" type="text" value="' + first_name + '" />');
		$("#firsttxt").replaceWith(input2);
		var input3 = $('<input id="lasttxt" class="form-control" type="text" value="' + last_name + '" />');
		$("#lasttxt").replaceWith(input3);
		var input4 = $('<input id="emailtxt" class="form-control" type="text" value="' + email + '" />');
		$("#emailtxt").replaceWith(input4);

		document.getElementById('save').disabled = false; 
		document.getElementById('edit').disabled = true;
	},
	'click #save':function(){
		var first_name = document.getElementById('firsttxt').value;
		var last_name = document.getElementById('lasttxt').value;
		var email = document.getElementById('emailtxt').value;
		var img= document.getElementById('myFile').innerHTML;
		var user_id = Meteor.userId();
		Meteor.call('editUser', user_id, first_name, last_name, email /*, img*/, function(err,res){
			if(!err){
				var input2 = $('<h3 id="firsttxt">' + first_name + '</h3>');
				$("#firsttxt").replaceWith(input2);
				var input3 = $('<h3 id="lasttxt">' + last_name + '</h3>');
				$("#lasttxt").replaceWith(input3);
				var input4 = $('<h3 id="emailtxt">' + email + '</h3>');
				$("#emailtxt").replaceWith(input4);
				Toast.success('Successfull');
				document.getElementById('save').disabled = true; 
				document.getElementById('edit').disabled = false;
			}
			else{ 
				console.log('error');
				Toast.error('Unsuccessfull');
			}
		});
	},
	'change #myFile': function(event){
	    
  	}
});

Template.VerifyUser.onCreated(function() {
	//alert('Please verify your email id');
});