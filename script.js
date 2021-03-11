//Global constants
const clueHoldTime = 400; //how long to hold each clue's light/sound
const cluePauseTime = 233; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [2, 2, 4, 3, 2, 1, 2, 4]; //secret pattern of button presses
var progress = 0; //represents how far along the player is in guessing the pattern. By starting at 0, we can use progress as an index into the pattern array.
var gamePlaying = false; //assigned a Boolean value that will keep track of whether the game is currently active. It will be true once the user presses Start, and remain true until they win or lose, or press Stop.
var guessCounter = 0;

var tonePlaying = false;
var volume = 0.5; //between 0.0 and 1.0

//function to call when the user wants to start the game
function startGame() {
  //initialize gam variables
  progress = 0;
  gamePlaying = true;

  //hide start button
  document.getElementById("startBtn").classList.add("hidden");
  //un-hide stop button
  document.getElementById("stopBtn").classList.remove("hidden");
  
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;

  //show start button
  document.getElementById("startBtn").classList.remove("hidden");
  //hide stop button
  document.getElementById("stopBtn").classList.add("hidden");
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game Over. You won!");
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}

function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

//function for playing a single clue
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0; i <= progress; i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  if(pattern[guessCounter] == btn){
    //pattern at current guessCounter matches with the button pressed
    if(guessCounter == progress){
      //turn is over
      if((pattern.length - 1) == guessCounter){
        //last turn
        winGame();
      } else {
        //pattern correct. add next segment
        progress++;
        playClueSequence();
      }
    } 
    else {
      //turn not over
      guessCounter++;
    }
    
  } else {
    //user picked the wrong button, lose game
    loseGame();
  }
}


// Sound Synthesis Functions 
//the higher the number, the higher the pitch of the button
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
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

//tone continue playing until call stopTone
//btn accepts a button number (1 to 4)
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
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

