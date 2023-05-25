var randomSecond = null; // Declare the randomSecond variable outside the function
var chosenSong = null;
var songs = [
    'banido desbanido',
    'chance',
    'cidade capital',
    'god is good',
    'homens que entraram no vagão',
    'invenção',
    'mesclado',
    'mulher contrariada',
    'vale nada vale tudo',
    'what is the brother'
];

function getScore() {
    var storedScore = sessionStorage.getItem('score');
    return storedScore ? parseInt(storedScore, 10) : 0;
}

function getChosenSong() {
    var storedSong = sessionStorage.getItem('chosenSong');
    return storedSong ? storedSong : 0;
}


function playRandomSecond() {
    var messageElement = document.getElementById("scoreMessage");
    var audio = document.getElementById("player");

    if (randomSecond === null) { // Check if randomSecond is null (first click)
        var duration = audio.duration; // Get the total duration of the audio in seconds
        randomSecond = Math.floor(Math.random() * duration); // Generate a random second within the duration
    }

    audio.currentTime = randomSecond; // Set the current time to the random second
    audio.play(); // Play the audio
    setTimeout(function() {
        audio.pause(); // Pause the audio after one second
        audio.currentTime = 0; // Reset the current time to the beginning
    }, 1000);
};

function chooseSong() {
    var audio = document.getElementById('player');

    var randomIndex = Math.floor(Math.random() * songs.length);
    var randomSong = songs[randomIndex];
    sessionStorage.setItem('chosenSong', randomSong);
    console.log(sessionStorage['chosenSong']);
    audio.src = `./static/assets/${randomSong}.webm`;
    audio.type = 'audio/webm';
}


document.addEventListener('DOMContentLoaded', function() {
    var score = getScore();
    var scoreMessage = document.getElementById('scoreMessage');
    var audioPlayer = document.getElementById('player');
    var guessForm = document.getElementById('form');
    var songGuessInput = document.getElementById('guess');
    var msg;
    
    scoreMessage.textContent = `Your score: ${score}`;

    if (window.location.pathname == "/ednaldo_pereira_guesser/" || window.location.pathname == "/") {
        chooseSong();
        guessForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            var userGuess = songGuessInput.value.trim();
            var correctSong = getChosenSong();
            var redirectURL = guessForm.action;
            window.location.href = redirectURL;
            if (userGuess == correctSong) {
                score++;
                sessionStorage.setItem('score', score);
                msg = `You got it! The song was ${correctSong}`;
                sessionStorage.setItem('resultMessage', msg);
            } else {
                score = 0;
                sessionStorage.setItem('score', score);
                msg = `The song was ${correctSong}`;
                sessionStorage.setItem('resultMessage', msg);
            }
            songGuessInput.value = '';
        });
    } else {
        chosenSong = getChosenSong();
        console.log(chosenSong);
        audioPlayer.src = `static/assets/${chosenSong}.webm`;
        audioPlayer.type = 'audio/webm';
        console.log(msg);
        var resultMessage = document.getElementById('resultMessage');
        resultMessage.textContent = sessionStorage['resultMessage'];
    }
    
  });
// On loaded window:
/* document.addEventListener('DOMContentLoaded', function() {
    var scoreElement = document.getElementById('scoreMessage');
    var form = document.getElementById('form');
    var audio = document.getElementById('player');
    if (window.location.pathname == '/') {
        chooseSong();
    } else {
        //audio.src = chosenSong;
        audio.type = 'audio/webm';
    }


    scoreElement.textContent = `Your score: ${score}`;
    
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
      
      // Perform any necessary form validation or processing here
      
      // Redirect the user to /result
      window.location.href = '/result';
    });
  }); */