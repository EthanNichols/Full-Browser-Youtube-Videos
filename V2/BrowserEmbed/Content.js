let embedTool = null;
let pos1, pos2, pos3, pos4;

function Start() {
	embedTool = document.querySelector("#EmbedTool");

	embedTool.addEventListener("click", SayHi);
}

function SayHi() {
	alert("Hi");
}

document.onload = Start();