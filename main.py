import random
from pathlib import Path
from flask import Flask, render_template, url_for, request, redirect

songs = [file.stem for file in Path("./static/assets").iterdir()]
app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    chosen_song = random.choice(songs)
    if request.method == "POST":
        guess = request.form["guess"]
        return redirect(url_for("result", guess=guess, chosen_song=chosen_song))
    else:
        song_url = url_for("static",filename=f"assets/{chosen_song}.webm")
        return render_template("index.html", song_url=song_url)

@app.route("/result/<chosen_song>/<guess>")
def result(guess, chosen_song):
    if guess == chosen_song:
        result_message = "You got it!"
    else:
        result_message = f"No luck :( The song was {chosen_song}"
    song_url = url_for("static",filename=f"assets/{chosen_song}.webm")
    return render_template("result.html", song_url=song_url, result_message=result_message)