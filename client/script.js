let bottom = true;

function bounce(singer) {
	let width = screen.width/2 - 400;
	let height = screen.height/2 - 100;

	let onComplete = function() {
		console.log('ON COMPLETE')
		if(bottom) {
			width = screen.width/2 - 400;
			height = screen.height/2 - 110;
			bottom = !bottom;
		}
		else{
			width = screen.width/2 - 400;
			height = screen.height/2 - 100;
			bottom = !bottom;
		}
		TweenLite.to(document.getElementById(singer), .2, {x: width, y: height, onComplete: onComplete});
	}
	TweenLite.to(document.getElementById(singer), 1.5, {x: width, y: height, onComplete: onComplete});
}

window.onload = function() {
	bounce("headrow");
}
