var uniqueNum =0;
var uniquevar ='A';
var arr = [];

Template.Tags.events({
	"submit .form": function(event,tag){		
		event.preventDefault();
		var tagsVar = event.target.tagsTxt.value;
<<<<<<< HEAD
		$('<div class="btn-group" style="margin-top:20px;"><input type="button" class="btn-group " id="tag'+ uniqueNum + uniquevar +'" value="'+ tagsVar + '" style=" border-right:none; border-radius:0px; border: 3px solid #808080; height:34px" readonly disabled><button class="glyphicon glyphicon-remove btn btn-group btn-danger btn-xs" id="tag'+uniqueNum +'" style="border-radius:0px; height:33px;"></button>&nbsp;&nbsp;&nbsp;&nbsp;</input></div>').insertAfter("h3");
=======
		$('<div class="btn-group" style="margin-top:10px; margin-bottom:4px margin-left:1px margin-right:1px background:#9a9aff"><input type="button" class="btn-group btn-xs " id="tag'+ uniqueNum + uniquevar +'" value="'+ tagsVar + '" style=" background:#eafaff; border-right:none; border-radius:0px; border: 1px solid border: 1px solid #000000; height:34px" readonly disabled><button class="glyphicon glyphicon-remove btn btn-group btn-danger btn-md" id="tag'+uniqueNum +'" style="border-radius:0px; height:33px; border: 3px solid #808080"></button>&nbsp;&nbsp;&nbsp;&nbsp;</input></div>').insertAfter("h3");
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
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
