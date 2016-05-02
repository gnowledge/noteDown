var uniqueNum =0;
var uniquevar ='A';
var arr = [];

Template.Tags.events({

	"submit .form": function(event,tag){		
		event.preventDefault();
 
		var tagsVar = event.target.tagsTxt.value;

		//document.getElementById("showTags").innerHTML = tagsVar;

		//$('<input id="tag'+ uniqueNum + uniquevar +'" type="text" value="'+ tagsVar + '" readonly/> &nbsp;&nbsp;<input type="submit" id="tag'+uniqueNum +'" class="btn btn-danger" value="Delete" style="border-radius: 24px;"> &nbsp;&nbsp;&nbsp;&nbsp;</input>').insertAfter("h3");
		$('<input id="tag'+ uniqueNum + uniquevar +'" type="text" value="'+ tagsVar + '" readonly/><input type="submit" id="tag'+uniqueNum +'" class="btn btn-danger" value="Delete" style="border-radius: 24px;"> &nbsp;&nbsp;&nbsp;&nbsp;</input>').insertAfter("h3");

    	var c = document.getElementById('tag'+ uniqueNum + uniquevar +'').value;
    	arr.push(c);

    	Session.set('tag', arr);
    	console.log(arr);

		uniqueNum ++;
   	
    	event.target.tagsTxt.value="";
	}
})

Template.Tags.events({
	"click .btn-danger": function(event){
		event.preventDefault();

		var id = event.currentTarget.getAttribute('id'); // Get the id attribute.
        console.log(id);
        alert(id);
        $('[id="'+ id + uniquevar +'"]').remove();
        $('[id="'+ id +'"]').remove();

	}
})