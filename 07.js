var list      = [];
const options = $("#priority").html();

$("#form_task").on('submit', function(e){
	e.preventDefault();
		append({
			name : $("#name").val(),
			date : $("#date").val(),
			priority : $("#priority").val(),
			description : $("#description").val()
		});
});

const append = data => {
	list.push(data);

	var tr = '<tr data="'+(list.length -1)+'"><td for="name">'+data.name+'</td>'
		   +  '<td for="date">'+data.date+'</td>'
		   +  '<td for="priority">'+data.priority+'</td>'
		   +  '<td for="description">'+data.description+'</td>'
		   +  '<td><button type="button" class="btn btn-primary" onclick="edit_action(this);"><i class="bi bi-pencil-square"></i> Edit</button>'
		   +      '<button class="btn btn-success save" onclick="save_form(this)" style="display:none;"><i class="bi bi-check"></i>Save</button></td>'
		   +  '<td><button type="button" class="btn btn-danger" onclick="delete_action(this);"><i class="bi bi-scissors"></i> Delete</button></td>'
		   + '</tr>';
	$("table tbody").append(tr);
}

function edit_action(e){
	$(e).next('button').show();
	$(e).hide();
	let tr   = $(e).parent().parent();
	let tds  = $(tr).children();
	tds.splice(tds.length -1);
	tds.splice(tds.length -1);

	for(let i=0; i< tds.length; i++){
		let td = tds[i];
		let text = td.textContent;
		let _for = td.getAttribute('for');
		if(_for == 'name'){
			content = '<input type="text" value="'+text+'" class="form-control" />';
		}else if(_for == 'description'){
			content = '<textarea class="form-control">'+text+'</textarea>';
		}else if(_for == 'date'){
			content = '<input type="date" class="form-control" value="'+text+'" />';
		}else{
			content = '<select class="for-control">' + options + '</option>';
		}
		$(td).html(content);
	}
}

function save_form(e){
	$(e).hide();
	$(e).prev('button').show();
	let tr   = $(e).parent().parent();
	let pos  = $(tr).attr('data');
	let tds  = $(tr).children();
	let data = {};
	tds.splice(tds.length -1);
	tds.splice(tds.length -1);

	for(let i=0; i< tds.length; i++){
		let td     = tds[i];
		let _for   = td.getAttribute('for');
		let value  = $(td).children().val();
		data[_for] = value; 
		$(td).text(value);
	}
	list[pos] = data;
}

function delete_action(e){
	let tr  = $(e).parent().parent();
	let pos = $(tr).attr('data');
	list.splice(pos, 1, null);
	$(tr).fadeOut(400, function(){
		$(this).remove();
	});
}
