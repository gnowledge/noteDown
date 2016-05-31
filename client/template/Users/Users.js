Template.UserDashboard.onCreated(function() {
	var self= this;
	this.autorun( function() {
		self.subscribe('users');
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
		//var name = $("#nametxt").text();
		var first_name = $("#firsttxt").text();
		var last_name = $("#lasttxt").text();
		var email = $("#emailtxt").text();
		var age = $("#agetxt").text();
		var dob = $("#dobtxt").text();
		var gender = $("#gendertxt").text();

		//var input1 = $('<input id="nametxt" type="text" value="' + name + '" />');
		//$("#nametxt").replaceWith(input1);
		var input2 = $('<input id="firsttxt" type="text" value="' + first_name + '" />');
		$("#firsttxt").replaceWith(input2);
		var input3 = $('<input id="lasttxt" type="text" value="' + last_name + '" />');
		$("#lasttxt").replaceWith(input3);
		var input4 = $('<input id="emailtxt" type="text" value="' + email + '" />');
		$("#emailtxt").replaceWith(input4);
		var input5 = $('<input id="agetxt" type="number" value="' + age + '" />');
		$("#agetxt").replaceWith(input5);

		var input6 = $('<input id="gendertxt" type="text" value="' + gender + '" />');
		$("#gendertxt").replaceWith(input6);

		document.getElementById('save').disabled = false; 
		document.getElementById('edit').disabled = true;
	},
	'click #save':function(){
		//var name = document.getElementById('nametxt').value;
		var first_name = document.getElementById('firsttxt').value;
		var last_name = document.getElementById('lasttxt').value;
		var email = document.getElementById('emailtxt').value;
		var age = document.getElementById('agetxt').value;
		var gender = document.getElementById('gendertxt').value;
		var img= document.getElementById('myFile').innerHTML;
		var user_id = Meteor.userId();
		Meteor.call('editUser', user_id,/* name,*/ first_name, last_name, email, age, gender/*, img*/, function(err,res){
			if(!err){

				//var input1 = $('<h2 id="nametxt">' + name + '</h2>');
				//$("#nametxt").replaceWith(input1);
				var input2 = $('<h3 id="firsttxt">' + first_name + '</h3>');
				$("#firsttxt").replaceWith(input2);
				var input3 = $('<h3 id="lasttxt">' + last_name + '</h3>');
				$("#lasttxt").replaceWith(input3);
				var input4 = $('<h3 id="emailtxt">' + email + '</h3>');
				$("#emailtxt").replaceWith(input4);
				var input5 = $('<h3 id="agetxt">' + age + '</h3>');
				$("#agetxt").replaceWith(input5);
				var input6 = $('<h3 id="gendertxt">' + gender + '</h3>');
				$("#gendertxt").replaceWith(input6);

				document.getElementById('save').disabled = true; 
				document.getElementById('edit').disabled = false;
			}
			else{ 
				console.log('error');
			}
		});
	}
});