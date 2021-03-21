# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **Catherine Kuntoro**

Time spent: **5** hours spent in total

Link to project (Code): https://glitch.com/edit/#!/memory-game-catherine-k
Link to project (Game): https://memory-game-catherine-k.glitch.me

## Required Functionality

The following **required** functionality is complete:

- [V] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [V] "Start" button toggles between "Start" and "Stop" when clicked.
- [V] Game buttons each light up and play a sound when clicked.
- [V] Computer plays back sequence of clues including sound and visual cue for each button
- [V] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [V] User wins the game after guessing a complete pattern
- [V] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [V] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [V] Buttons use a pitch (frequency) other than the ones in the tutorial
- [V] More than 4 functional game buttons
- [V] Playback speeds up on each turn
- [V] Computer picks a different pattern each time the game is played
- [V] Player only loses after 3 mistakes (instead of on the first mistake)
- [V] Game button appearance change goes beyond color (e.g. add an image)
- [V] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [V] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- Added "@media only screen and (max-width: 600px)" so that users with a screen width of less than 600 will see a smaller button size
- Lets the user know how many sequences of clues they guessed correctly until they lost in the alert box

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![In asset](https://cdn.glitch.com/9e6cc435-419b-4081-995c-fac026564b19%2FCatherine%20Kuntoro%20-%20SITE%20Internship%20Prework.gif?v=1616312598350)
- In imgur: https://imgur.com/a/e0q9jwK

Note: In the video walkthrough, I modified the code so that there is only 5 sequence for the purposes of making it a quicker walkthrough. 
The actual game has 9 sequences. 

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.

- https://stackoverflow.com/questions/38870641/how-to-insert-image-on-button-click
- https://stackoverflow.com/questions/1472705/resetting-a-settimeout
- https://www.w3schools.com/howto/howto_js_countdown.asp
- https://www.w3schools.com/jsref/met_win_setinterval.asp
- https://www.w3schools.com/cssref/pr_background-image.asp
- https://stackoverflow.com/questions/9419263/how-to-play-audio
- https://www.w3schools.com/css/css3_gradients.asp
- https://www.w3schools.com/cssref/css_colors.asp
- https://www.w3schools.com/cssref/css3_pr_mediaquery.asp
- https://www.w3schools.com/howto/howto_css_full_page.asp

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)
   
   The main challenge I had was implementing the timer. The tutorial gave some hints on what javascript classes might help with this, but I had to
   research on how to implement them by looking at the class' information page, and just by using my prior coding knowledge. To start, I knew that I
   needed a variable that will hold the amount of seconds for the timer (maxTime in my code). Then, I need to somehow decrement maxTime for every
   second that has passed, and also display the decreasing seconds in the website so the player could see how much time they had left.
   To find the method that could decrement the time, I searched for javascript classes that could do just that and also for example code that deals with
   decrementing time, for example a countdown timer. From my research, I found some methods, including setInterval() and setTimeout() in the Window class. By testing the two methods,
   I discovered that there is a key distinction between setTimeout() and setInterval(): setTimeout() executes the given function once after waiting for some time,
   but setInterval() repeats the execution of the function continuously. By testing out various methods before deciding on one, I was confident that setInterval() is the appropriate method to use that bests delivers my expected functionality of a timer.
   Therefore, the function that I passed into the parameter of setInterval() will decrement maxTime by one and update the timer text to reflect the decrementing time. I also performed checks,
   for example if maxTime reaches 0, I would use clearInterval() to stop the time and declare game over. Afterwards, I tested the timer
   to ensure that the time decrements properly, and if it reaches 0, it will automatically be a game over. In the end, I was able to create the timer from thorough research, trial-and-error with
   different methods, and testing.

   Another challenge I had was making sure that most people are able to complete the game. When I asked my friends to play the game for me, I discovered that finetuning the game is
   quite difficult because not everyone (including me) are good with memory games like this, therefore I had to find a sweet spot where the game is not too hard, but not too boring either.
   Originally, I had alloted 20 seconds for the timer, but discovered that most of my friends are able to finish under that time, so to make it more challenging I only allocated 15 seconds.
   Then, originally I had about 14 patterns prepared, but after listening to my friends suggestions that it got very tedious and difficult, I reduced the pattern amount to nine. 
   In the end, I believe that I managed to make a game that is fun yet still challenging!

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
   
   A specific question I had during this question is if there is any way I could force a function to execute only after a certain function precedes it? My timer starts concurrently as the playback sequence, eventhough
   I placed the code after the for loop for playing back the sequence of clues. 
   
   A broader question about web development I have is if there is any way to ensure that the a website will work on every platform; for example, my friends could play the game on their laptop or phone, but for some reason,
   the game doesn't work on my phone. It will be very helpful if there is a way to ensure if the website works everywhere. I'm also interested in learning how to request for user input, for example letting the users upload
   pictures to use for the buttons to customize the game to their style. This is something that I see often in many apps, so it will be very exciting to learn how to request and handle user requests such as that. 

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
   
   If I had more time, I would customize the layout even more, for example changing the style of the buttons. I also wanted to find a way to force the timer to count down only after the playback sequence of the clues are
   executed. I would also like to find a way to make sure that the size of the background gradient reaches to the very end. I tried with "height: 100%" at the .css file, but that does not seem to be sufficient. I would also 
   like to add difficulty levels. For example, in the easy difficulty level, the playback sequence of clues will not speed up and the player is given more time and chances to pick the correct buttons. Then on the hardest difficulty,
   the game would not allow any second chances, for example. I imagine that it would require me to create some sort of navigation to lead the player to the appropriate page for the difficulty they chose, or making some boolean values for
   each functionality like the timer and chances left counter that can enable and disable select features, depending on the difficulty that the user chose. Additionally, sometimes when I clicked the button too fast, the image does not pop up.
   I was unable to find a fix at the moment, but if I had more time I would like to fix this problem as well.
   
   

## License

    Copyright Catherine Kuntoro

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
