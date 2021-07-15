

let modBtn = document.getElementById('modal');
let mod = document.getElementById('modal_wrpr');
let closeMod= document.getElementById('close_modal');

modBtn.onclick = function (){
    mod.style.display = "block";
}

closeMod.onclick = function (){
    mod.style.display = "none";
}


let todoList = [];
let tiTle; 

document.getElementById('add_title').onclick = () => {
	tiTle = document.getElementById('title').value;
}



document.getElementById('inp').onkeyup = function inpt(){
    let b = document.getElementById('inp').value;
    localStorage.setItem('input', b);
}
document.getElementById('inp').value = localStorage.getItem('input');

if (localStorage.getItem('todo')) {
	todoList = JSON.parse(localStorage.getItem('todo'));
	out();
}

document.getElementById('add_list').onclick = function (){
	let temp = {};
	let item = document.getElementById('inp').value;
	temp.todo = item;
	temp.check = false;
	temp.title = tiTle;
	todoList.push(temp);
	out();
	localStorage.setItem('todo', JSON.stringify(todoList));
    document.getElementById('inp').value = '';
    localStorage.removeItem('input');
    let sDate = new Date();
    localStorage.setItem('date', JSON.stringify(sDate));
	
}

document.getElementById('out').onchange = function (event){
	currentKey = event.target.parentNode.childNodes[1].data.slice(1);
	for (i = 0; i<todoList.length; i++) {
		if (todoList[i].todo == currentKey) {
			todoList[i].check = !todoList[i].check;
			out();
			localStorage.setItem('todo', JSON.stringify(todoList));
			break;
		}
	}
}

function out() {
	let out = '';
	for (let i=0; i<todoList.length; i++) {
		if (todoList[i].check) {
			out += '<span class="underlined"><input type="checkbox" checked> ' + todoList[i].todo + '<button onclick="delList()">Удалить</button>' + '</span><br>';
		}

		else {
			out+='<span><input type="checkbox"> '+ todoList[i].todo + '</span><br>';
		}
		if (todoList[i].check === true) {
			document.getElementById('inp').value = todoList[i].todo;
		}

		
		
	}
	let daTe = JSON.parse(localStorage.getItem('date'))
	document.getElementById('out').innerHTML = out;
    document.getElementById('item').innerHTML = out + daTe;
    document.getElementById('date').innerHTML = daTe;
	
}
document.getElementById('clear').onclick = function(){
    localStorage.clear();
	window.location.reload();   
}


function delList(){
	for (let i=0; i<todoList.length; i++) {
		if (todoList[i].check === true){
			 todoList.splice(i, 1);
			 localStorage.setItem('todo', JSON.stringify(todoList));
			 out();
		}
	}	
}


