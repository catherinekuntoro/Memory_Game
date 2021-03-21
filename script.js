//Global constants
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var clueHoldTime = 200; //how long to hold each clue's light/sound
var cluePauseTime = 200; //how long to pause in between clues
var pattern = [2, 2, 4, 3, 2, 1, 1, 1, 1]; //secret pattern of button presses
var progress = 0; //represents how far along the player is in guessing the pattern. By starting at 0, we can use progress as an index into the pattern array.
var gamePlaying = false; //assigned a Boolean value that will keep track of whether the game is currently active. It will be true once the user presses Start, and remain true until they win or lose, or press Stop.
var guessCounter = 0;

var chancesLeft = 3;

//for sound
var tonePlaying = false;
var volume = 0.5; //between 0.0 and 1.0
var audio;

//for timer
var maxTime = 16;
var counterTimer = null;

//function to call when the user wants to start the game
function startGame() {
  //initialize gam variables
  var i;
  for (i = 0; i < pattern.length; i++) {
    pattern[i] = Math.floor(Math.random() * 8) + 1;
  }
  progress = 0;
  gamePlaying = true;
  clueHoldTime = 200; //how long to hold each clue's light/sound
  cluePauseTime = 200;

  //hide start button
  document.getElementById("startBtn").classList.add("hidden");
  //un-hide stop button
  document.getElementById("stopBtn").classList.remove("hidden");
  
  playClueSequence();
  chancesLeft = 3;
}

function stopGame() {
  gamePlaying = false;

  //show start button
  document.getElementById("startBtn").classList.remove("hidden");
  //hide stop button
  document.getElementById("stopBtn").classList.add("hidden");

  clearTimeout(counterTimer);
  document.getElementById("timer").innerHTML = "Game stopped.";

  clueHoldTime = 200; //how long to hold each clue's light/sound
  cluePauseTime = 200;
  chancesLeft = 3;
}

function loseGame() {
  stopGame();
  clueHoldTime = 200; //how long to hold each clue's light/sound
  cluePauseTime = 200;
  alert("Game Over. You lost. You guessed the sequences correctly " + progress + " times!");
  clearTimeout(counterTimer);
}

function winGame() {
  clueHoldTime = 200; //how long to hold each clue's light/sound
  cluePauseTime = 200;
  stopGame();
  alert("Game Over. You won!");
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

//function for playing a single clue
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  document.getElementById("Tries left").innerHTML = "Chances left: " + chancesLeft;
  
  guessCounter = 0;

  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }

  //decrement cluePauseTime
  cluePauseTime = cluePauseTime - 8;
  clueHoldTime = clueHoldTime - 8;
  
  //for the timer; begin with 16 seconds again
  maxTime = 16;
  counterTimer = window.setInterval(function() {
    maxTime--; // decrement the timer with every second

    if (maxTime <= 0) { // timeout
      clearInterval(counterTimer);
      loseGame();
    }
    document.getElementById("timer").innerHTML = maxTime + " seconds left";
  }, 1000);
}

function guess(btn) {
  console.log("user guessed: " + btn);

  if (!gamePlaying) {
    return;
  }

  if (pattern[guessCounter] == btn) {
    //pattern at current guessCounter matches with the button pressed
    if (guessCounter == progress) {
      //turn is over
      if (pattern.length - 1 == guessCounter) {
        //last turn
        clearTimeout(counterTimer);
        winGame();
      } else {
        //pattern correct. add next segment
        progress++;
        clearInterval(counterTimer);
        playClueSequence();
      }
    } else {
      //turn not over
      guessCounter++;
    }
  } else {
    //user picked the wrong button, lose game
    if(chancesLeft == 0){
      document.getElementById("Tries left").innerHTML = "Chances left: 0"
      loseGame();
    } else {
      chancesLeft--;
      document.getElementById("Tries left").innerHTML = "Chances left: " + chancesLeft;
    }
  }
}

// Sound Synthesis Functions -------------------------------------------------------
//the higher the number, the higher the pitch of the button

const freqMap = {
  1: 271,
  2: 330,
  3: 395,
  4: 465,
  5: 270,
  6: 405,
  7: 490,
  8: 239
};

//takes a button number (1 to 4),, and length of time
//When call this function, plays a tone for the amount of time specified
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}

//tone continue playing until call stopTone. btn accepts a button number (1 to 8)
function startTone(btn) {
  if (!tonePlaying) {
    //for each button number, play a different audio sound
    switch (btn) {
      case 1:
        audio = new Audio(
          "https://cdn.glitch.com/9e6cc435-419b-4081-995c-fac026564b19%2Fbutton-1.mp3?v=1616300701183"
        );
        break;
      case 2:
        audio = new Audio(
          "https://cdn.glitch.com/9e6cc435-419b-4081-995c-fac026564b19%2Fbutton-2.mp3?v=1616300705399"
        );
        break;
      case 3:
        audio = new Audio(
          "https://cdn.glitch.com/9e6cc435-419b-4081-995c-fac026564b19%2Fbutton-3.mp3?v=1616300711341"
        );
        break;
      case 4:
        audio = new Audio(
          "https://cdn.glitch.com/9e6cc435-419b-4081-995c-fac026564b19%2Fbutton-4.mp3?v=1616300715238"
        );
        break;
      case 5:
        audio = new Audio(
          "https://cdn.glitch.com/9e6cc435-419b-4081-995c-fac026564b19%2Fbutton-5.mp3?v=1616300718669"
        );
        break;
      case 6:
        audio = new Audio(
          "https://cdn.glitch.com/9e6cc435-419b-4081-995c-fac026564b19%2Fzapsplat_multimedia_button_click_002_53863.mp3?v=1616300722717"
        );
        break;
      case 7:
        audio = new Audio(
          "https://cdn.glitch.com/9e6cc435-419b-4081-995c-fac026564b19%2Fzapsplat_multimedia_button_click_003_53864.mp3?v=1616300725988"
        );
        break;
      case 8:
        audio = new Audio(
          "https://cdn.glitch.com/9e6cc435-419b-4081-995c-fac026564b19%2Fzapsplat_multimedia_button_click_007_53868.mp3?v=1616300729432"
        );
    }

    audio.play();
    //o.frequency.value = freqMap[btn];
    //g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
