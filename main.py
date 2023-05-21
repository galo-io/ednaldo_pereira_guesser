import random
from pathlib import Path
from flask import Flask, render_template, url_for, request, session

app = Flask(__name__)
app.secret_key = 'thisIsSecret'

songs = [file.stem for file in Path("./static/assets").iterdir()]

@app.route("/", methods=["GET"])
def index():
    chosen_song = random.choice(songs)
    session['chosen_song'] = chosen_song
    if "score" not in session.keys():
        session["score"] = 0
    score_message = f"Your score: {session['score']}"
    song_url = url_for('static',filename=f'assets/{chosen_song}.webm')
    return render_template("index.html", song_url=song_url, score_message=score_message)
    
@app.route("/result/", methods=["POST"])
def result():
    guess = request.form["guess"]
    chosen_song = session["chosen_song"]
    if guess == chosen_song:
        result_message = "You got it!"
        session['score'] += 1
        score = session['score']
    else:
        result_message = f"You lose :( The song was {chosen_song}"
        score = session["score"]
        session['score'] = 0
    song_url = url_for("static",filename=f"assets/{chosen_song}.webm")
    score_message = f"Your score: {score}"
    return render_template("result.html", song_url=song_url, result_message=result_message, score_message=score_message, guess=guess)