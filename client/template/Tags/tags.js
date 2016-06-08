var uniqueNum =0;
var uniquevar ='A';
var arr = [];

Template.Tags.events({
	"submit .form": function(event,tag){		
		event.preventDefault();
		var tagsVar = event.target.tagsTxt.value;
		$('<div class="btn-group" style="margin-top:20px;"><input type="button" class="btn-group btn-xs " id="tag'+ uniqueNum + uniquevar +'" value="'+ tagsVar + '" style=" border-right:none; border-radius:0px; border: 3px solid #808080; height:34px" readonly disabled><button class="glyphicon glyphicon-remove btn btn-group btn-danger btn-xs" id="tag'+uniqueNum +'" style="border-radius:0px; height:33px;"></button>&nbsp;&nbsp;&nbsp;&nbsp;</input></div>').insertAfter("h3");
    	var c = document.getElementById('tag'+ uniqueNum + uniquevar +'').value;
    	arr.push(c);
    	Session.set('tag', arr);
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
