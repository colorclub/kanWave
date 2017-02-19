// fork getUserMedia for multiple browser versions, for those
// that need prefixes

navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var voiceSelect = document.getElementById("voice");
var source;
var stream;

//set up the different audio nodes we will use for the app

var analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

var distortion = audioCtx.createWaveShaper();
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();
var convolver = audioCtx.createConvolver();

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

// grab audio track via XHR for convolver node

var soundSource, concertHallBuffer;

ajaxRequest = new XMLHttpRequest();

ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);

ajaxRequest.responseType = 'arraybuffer';


ajaxRequest.onload = function() {
  var audioData = ajaxRequest.response;

  audioCtx.decodeAudioData(audioData, function(buffer) {
      concertHallBuffer = buffer;
      soundSource = audioCtx.createBufferSource();
      soundSource.buffer = concertHallBuffer;
    }, function(e){"Error with decoding audio data" + e.err});

  //soundSource.connect(audioCtx.destination);
  //soundSource.loop = true;
  //soundSource.start();
}

ajaxRequest.send();

// set up canvas2 context for visualizer

var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");

var intendedWidth = document.querySelector('.wrapper').clientWidth;

canvas.setAttribute('width',intendedWidth);

var visualSelect = document.getElementById("visual");
console.log(visualSelect.value)
var drawVisual;

//main block for doing the audio recording

if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      },

      // Success callback
      function(stream) {
         source = audioCtx.createMediaStreamSource(stream);
         source.connect(analyser);
         analyser.connect(distortion);
         distortion.connect(biquadFilter);
         biquadFilter.connect(convolver);
         convolver.connect(gainNode);
         gainNode.connect(audioCtx.destination);

      	 visualize();

      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

function visualize() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);
  var dataArray = new Uint8Array(bufferLength);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = 'black';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      if (i < 7) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',0,0)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 14) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',127,0)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 21) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',255,0)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 28) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',255,0)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 35) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',0,255)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 42) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',0,130)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',0,211)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      }
      x += barWidth + 1;
    }
  };
  draw();
}

// event listeners to change visualize and voice settings

visualSelect.onchange = function() {
  visualize();
}

var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");

var intendedWidth = document.querySelector('.wrapper').clientWidth;

canvas.setAttribute('width',intendedWidth);

var visualSelect = document.getElementById("visual");
console.log(visualSelect.value)
var drawVisual;

//main block for doing the audio recording

if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      },

      // Success callback
      function(stream) {
         source = audioCtx.createMediaStreamSource(stream);
         source.connect(analyser);
         analyser.connect(distortion);
         distortion.connect(biquadFilter);
         biquadFilter.connect(convolver);
         convolver.connect(gainNode);
         gainNode.connect(audioCtx.destination);

      	 visualize();

      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

function visualize() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);
  var dataArray = new Uint8Array(bufferLength);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = 'black';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      if (i < 7) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',0,0)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 14) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',127,0)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 21) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',255,0)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 28) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',255,0)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 35) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',0,255)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 42) {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',0,130)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else {
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',0,211)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      }
      x += barWidth + 1;
    }
  };
  draw();
}

// event listeners to change visualize and voice settings


//SECOND WAVE@@@@@@@@@@@@@@@@@@@@@

var canvas2 = document.querySelector('.visualizer2');
var secondBox = canvas2.getContext("2d");

var intendedWidth = document.querySelector('.wrapper').clientWidth;

canvas2.setAttribute('width',intendedWidth);

var visualSelect2 = document.getElementById("visual");
console.log(visualSelect2.value)
var drawVisual2;

//main block for doing the audio recording

if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      },

      // Success callback
      function(stream) {
         source = audioCtx.createMediaStreamSource(stream);
         source.connect(analyser);
         analyser.connect(distortion);
         distortion.connect(biquadFilter);
         biquadFilter.connect(convolver);
         convolver.connect(gainNode);
         gainNode.connect(audioCtx.destination);

      	 visualize2();

      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

function visualize2() {
  WIDTH = canvas2.width;
  HEIGHT = canvas2.height;
  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);
  var dataArray = new Uint8Array(bufferLength);

  secondBox.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    drawVisual2 = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    secondBox.fillStyle = 'black';
    secondBox.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      if (i < 7) {
        secondBox.fillStyle = 'rgb(' + (barHeight+100) + ',0,0)';
        secondBox.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 14) {
        secondBox.fillStyle = 'rgb(' + (barHeight+100) + ',127,0)';
        secondBox.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 21) {
        secondBox.fillStyle = 'rgb(' + (barHeight+100) + ',255,0)';
        secondBox.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 28) {
        secondBox.fillStyle = 'rgb(' + (barHeight+100) + ',255,0)';
        secondBox.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 35) {
        secondBox.fillStyle = 'rgb(' + (barHeight+100) + ',0,255)';
        secondBox.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else if (i < 42) {
        secondBox.fillStyle = 'rgb(' + (barHeight+100) + ',0,130)';
        secondBox.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      } else {
        secondBox.fillStyle = 'rgb(' + (barHeight+100) + ',0,211)';
        secondBox.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      }
      x += barWidth + 1;
    }
  };
  draw();
}

// event listeners to change visualize2 and voice settings

visualSelect2.onchange = function() {
  visualize2();
}
