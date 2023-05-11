import random
from pathlib import Path

songs = [file.stem for file in Path("./static/assets").iterdir()]
chosen_song = random.choice(songs)
print(chosen_song)