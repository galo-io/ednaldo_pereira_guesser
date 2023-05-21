var score = 0;
var randomSecond = null; // Declare the randomSecond variable outside the function
var chosenSong = null;
var songs = [
    'static/assets/chance.webm',
    'static/assets/cidade capital.webm',
    'static/assets/homens que entraram no vagão.webm'
  ];

// On loaded window:
document.addEventListener('DOMContentLoaded', function() {
    var scoreElement = document.getElementById('scoreMessage');
    var form = document.getElementById('form');
    var audio = document.getElementById('player');
    audio.src = chosenSong;
    audio.type = 'audio/webm';


    scoreElement.textContent = `Your score: ${score}`;
    
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
      
      // Perform any necessary form validation or processing here
      
      // Redirect the user to /result
      window.location.href = '/result';
    });
  });