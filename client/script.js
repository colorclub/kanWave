
let bottom = true;

function bounce(singer) {
	let width = Math.random() * screen.width;
	let height = screen.height - 50;

	let onComplete = function() {
		console.log('ONCOMPLETE')
		if(bottom) {
			height = screen.height - 150;
			width = Math.random() * screen.width;
			bottom = !bottom;
		}
		else{
			height = 50;
			width = Math.random() * screen.width;
			bottom = !bottom;
		}
		TweenLite.to(document.getElementById(singer), 1.5, {x: width, y: height, onComplete: onComplete});
	}
	TweenLite.to(document.getElementById(singer), 1.5, {x: width, y: height, onComplete: onComplete});
}

function onComplete() {

}

window.onload = function() {
	bounce("kanye");
}
