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

function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    
    // Create a 2D array to store the distances
    const dp = [];
    for (let i = 0; i <= m; i++) {
      dp[i] = new Array(n + 1).fill(0);
    }
    
    // Initialize the first row and column of the matrix
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }
    
    // Fill in the rest of the matrix
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(
            dp[i - 1][j - 1], // substitution
            dp[i][j - 1],     // insertion
            dp[i - 1][j]      // deletion
          );
        }
      }
    }
    
    // The Levenshtein distance is the value in the bottom right cell of the matrix
    return dp[m][n];
  }


document.addEventListener('DOMContentLoaded', function() {
    var score = getScore();
    var scoreMessage = document.getElementById('scoreMessage');
    var audioPlayer = document.getElementById('player');
    var guessForm = document.getElementById('form');
    var songGuessInput = document.getElementById('guess');
    var msg;
    
    scoreMessage.textContent = `Your score: ${score}`;


    chooseSong();
    guessForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        var userGuess = songGuessInput.value.trim().toLowerCase();
        var correctSong = getChosenSong();
        var redirectURL = guessForm.action;
        window.location.href = redirectURL;
        var d = levenshteinDistance(userGuess, correctSong);
        if (d <= 3) {
            score++;
            sessionStorage.setItem('score', score);
            msg = `You got it! The song was ${correctSong}`;
        } else {
            score = 0;
            sessionStorage.setItem('score', score);
            msg = `You lose :( The song was ${correctSong}`;
        }
        sessionStorage.setItem('resultMessage', msg);
        songGuessInput.value = '';
    });
  });