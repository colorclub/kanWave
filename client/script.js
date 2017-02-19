let bottom = true;

function bounce(singer) {
	let width = screen.width/2 - 400;
	let height = screen.height/2 - 100;

	let onComplete = function() {
		console.log('ON COMPLETE')
		if(bottom) {
			let width = screen.width/2 - 400;
			let height = screen.height/2 - 200;
			bottom = !bottom;
		}
		else{
			let width = screen.width/2 - 400;
			let height = screen.height/2 - 100;
			bottom = !bottom;
		}
		TweenLite.to(document.getElementById(singer), 1, {x: width, y: height, onComplete: onComplete});
	}
	TweenLite.to(document.getElementById(singer), 1.5, {x: width, y: height, onComplete: onComplete});
}

window.onload = function() {
	bounce("headrow");
}
