var uniqueNum =0;
var uniquevar ='A';
var arr = [];

Template.Tags.events({
	"submit .form": function(event,tag){		
		event.preventDefault();
		var tagsVar = event.target.tagsTxt.value;
		//document.getElementById("showTags").innerHTML = tagsVar;
		//$('<input id="tag'+ uniqueNum + uniquevar +'" type="text" value="'+ tagsVar + '" readonly/> &nbsp;&nbsp;<input type="submit" id="tag'+uniqueNum +'" class="btn btn-danger" value="Delete" style="border-radius: 24px;"> &nbsp;&nbsp;&nbsp;&nbsp;</input>').insertAfter("h3");
		$('<div class="btn-group" style="margin-top:20px;"><input type="button" class="btn-group " id="tag'+ uniqueNum + uniquevar +'" value="'+ tagsVar + '" style=" border-right:none; border-radius:0px; border: 3px solid #008CBA; height:34px" readonly disabled><button class="glyphicon glyphicon-remove btn btn-group btn-danger" id="tag'+uniqueNum +'" style="border-radius:0px; height:34px;"></button>&nbsp;&nbsp;&nbsp;&nbsp;</input></div>').insertAfter("h3");
    	var c = document.getElementById('tag'+ uniqueNum + uniquevar +'').value;
    	arr.push(c);

    	Session.set('tag', arr);
    	console.log(arr);

		uniqueNum ++;
   	
    	event.target.tagsTxt.value="";
	},

	"click .btn-danger": function(event){
		event.preventDefault();
		var id = event.currentTarget.getAttribute('id'); // Get the id attribute.
        $('[id="'+ id + uniquevar +'"]').remove();
        $('[id="'+ id +'"]').remove();
	}
});
