var randomSecond = null; // Declare the randomSecond variable outside the function
var chosenSong = null;
var timeout = 4000;
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

function howToPlay() {
  return ` Click in the "Play ⏵" button to hear a sample from a random Ednaldo Pereira song. Insert your guess and submit. You have 3 chances to guess the correct song. For each wrong guess, you can listen to one additional second. 
  ` 
}

function getChances() {
  var storedChances = sessionStorage.getItem('chances');
  return storedChances ? parseInt(storedChances, 10) : 0;
}

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
    }, timeout);
};

function chooseSong() {
    var audio = document.getElementById('player');

    var randomIndex = Math.floor(Math.random() * songs.length);
    var randomSong = songs[randomIndex];
    sessionStorage.setItem('chosenSong', randomSong);
    console.log(sessionStorage['chosenSong']);
    audio.src =  `./static/assets/${randomSong}.webm`;
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

function checkGuess(userGuess) {
  const correctSong = getChosenSong();
  const d = levenshteinDistance(correctSong, userGuess)
  return (d <= 3) ? true : false;
}

function validateGuess(userGuess) {
  return songs.includes(userGuess);
}

function processGuess() {
  inputField = document.getElementById('guess');
  userGuess = inputField.value.trim();
  if (userGuess === '') {return;}
  if (!songs.includes(userGuess)) {
    var warnMessage = "Input a valid song."
    return;
  }
  result = checkGuess(userGuess);
  var redirectURL = "./result.html";
  var score = getScore();
  if (result) {
    score++;
    inputField.style.background = '#00FF0080';
    sessionStorage.setItem('score', score);
    var msg = `You got it! The song was ${getChosenSong()}`;
    window.location.href = redirectURL;
  } else {
      inputField = document.getElementById('guess');
      inputField.style.background = '#FF000080';
      timeout += 1000;
      chances = chances - 1;
      sessionStorage.setItem('chances', chances);
      chancesMessage.textContent = `You have ${chances} chances`;
      if (chances === 0) {
        score = 0;
        sessionStorage.setItem('score', score);
        var msg = `You lose :( The song was ${getChosenSong()}`;
        window.location.href = redirectURL;
      }
  }
  sessionStorage.setItem('resultMessage', msg);
  userGuess.value = '';
}

document.addEventListener('DOMContentLoaded', function() {
  var infoButton = document.getElementById('infoButton');
  var overlay = document.getElementById('overlay');
  var closeButton = document.getElementById('closeButton');
  var chancesMessage = document.getElementById('chancesMessage');
  var input = document.getElementById('guess');
  var datalist = document.getElementById('suggestions');
  tutorial = document.getElementById('howToPlay');
  tutorial.value = howToPlay();
  sessionStorage.setItem('chances', 3);
  chances = getChances();
  chancesMessage.textContent = `You have ${chances} chances`;
  
  input.addEventListener('input', function() {
    fieldValue = input.value.trim();
    if (fieldValue !== '') {
      datalist.innerHTML = '';
      songs.forEach(function(song) {
        if (song.slice(0, fieldValue.length) == fieldValue) {
          var option = document.createElement('option');
          option.value = song;
          datalist.appendChild(option);
        }
      });
    } else {
      datalist.innerHTML = '';
    }
  });

  chooseSong();

  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      processGuess();
    }
  });

  infoButton.addEventListener('click', function() {
    overlay.style.display = 'flex';
  });

  closeButton.addEventListener('click', function() {
    overlay.style.display = 'none';
  });

});