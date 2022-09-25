var buttonColors = ['red', 'blue', 'green', 'yellow'];

//ARRAY TO STORE RANDOM COLORS IN SEQUENCE FUNCTION
var gamePattern = [];

//ARRAY TO STORE BUTTONS CLICKED BY THE USER
var userClickedPattern = [];

var isStarted = false; //FALSE BECAUSE THE GAME HAS NOT STARTED
var level = 0;

//7
$(document).keydown(function () {

    if (!isStarted) {
        nextSequence();
        isStarted = true;
        $('#level-title').text(`Level ${level}`)
    }
});


// 4- jQuery METHOD: RESPONDING TO CLICKS BY THE USER
$('.btn').click(function () {
    var userChosenColor = $(this).attr('id');

    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);

    // var audio = new Audio(`sounds/${userChosenColor}.mp3`);
    // audio.play();

    playSound(userChosenColor); //ADDING SOUND TO CLICKED BUTTONS BY USER

    animatePress(userChosenColor);  //ADDIND ANIMATION TO CLICKED BUTTON

    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));   //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    //OR
    // checkAnswer(userClickedPattern.length-1);


});




//FUNCTION TO GIVE THE GAME PATTERN/SEQUENCE
function nextSequence() {
    //8
    userClickedPattern = [];

    //7- Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //7- Inside nextSequence(), update the h1 with this change in the value of level.
    $('#level-title').text(`Level ${level}`);

    //2
    const randomNumber = Math.floor(Math.random() * 4);

    //3
    var randomChosenColor = buttonColors[randomNumber]; ////4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.

    // console.log(`here ${randomChosenColor}`);

    gamePattern.push(randomChosenColor);    //STORING RANDOM COLORS TO ARRAY gamePattern

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);   //ADDING FLASH TO THE BUTTON

    // var audio = new Audio(`sounds/${randomChosenColor}.mp3`);
    // audio.play();

    playSound(randomChosenColor);   //ADDING SOUND TO THE RANDOM BUTTON

    //ANSWER!!!!!!!!!!!!!!!!!!!!!   
    // console.log(gamePattern);


}


//8- TO CHECK ANSWER
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        // console.log(`${userClickedPattern} and ${gamePattern}`);

        if (userClickedPattern.length === gamePattern.length) {
            //FUNCTION ADDING DELAY TO SEQUENCE FUNCTION
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    }
    else {
        console.log('wrong');
        // console.log(`${userClickedPattern} and ${gamePattern}`);

        //8- PLAYS THIS SOUND WHEN THE ANSWER IS WRONG 
        playSound('wrong');

        //8- FUNCTION TO DISPLAY GAME OVER BACKGROUND COLOR FROM CSS
        $('body').addClass('game-over');

        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);

        //8-FUNCTION TO CHANGE TEXT TO GAME OVER 
        $('#level-title').text('Game Over, Press Any Key to Restart');

        startOver();
    }
}


//FUNCTION TO RESTART GAME
function startOver() {
    level = 0;
    gamePattern = [];
    isStarted = false;
}



//5- FUNCTION TO PLAY SOUND
function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}


//6- FUNCTION TO ADD ANIMATION
function animatePress(currentColour) {
    var activeButton = $(`.${currentColour}`)
    activeButton.addClass('pressed');

    setTimeout(function () {
        activeButton.removeClass('pressed');
    }, 100);
}



// NOTES-
// for (var i = 0; i < document.querySelectorAll('.btn').length; i++) {
//     document.querySelectorAll('.btn')[i].addEventListener('click', function () {
//         var userChosenColor = this.getAttribute('id');
//         // console.log(userChosenColor);

//         userClickedPattern.push(userChosenColor);
//         console.log(userClickedPattern);
//     });
// }
