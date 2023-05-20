import random
from pathlib import Path
from flask import Flask, render_template, url_for, request, redirect, session

songs = [file.stem for file in Path("./static/assets").iterdir()]
app = Flask(__name__)
app.secret_key = 'thisIsSecret'

@app.route("/", methods=["GET"])
def index():
    # if request.method == "GET":
    session['chosen_song'] = random.choice(songs)
    song_url = url_for("static",filename=f"assets/{session['chosen_song']}.webm")
    return render_template("index.html", song_url=song_url)
    
@app.route("/result/", methods=["POST"])
def result():
    guess = request.form["guess"]
    chosen_song = session["chosen_song"]
    if guess == chosen_song:
        result_message = "You got it!"
    else:
        result_message = f"No luck :( The song was {chosen_song}"
    song_url = url_for("static",filename=f"assets/{chosen_song}.webm")
    return render_template("result.html", song_url=song_url, result_message=result_message)