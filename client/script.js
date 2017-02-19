
let bottom = true;

function bounce(singer) {
	let width = Math.random() * screen.width;
	let height;

	if(bottom) {
		height = screen.height - 25;
		bottom = !bottom;
	}
	else{
		height = 25;
		bottom = !bottom;
	}
	TweenLite.to(document.getElementById(singer), 2.5, {x: width, y: height});
	setInterval(function() {
		bounce(singer);
	}, 2700);
}

window.onload = function() {
	bounce("kanye");
}
