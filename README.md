# minesweeper
A traditional Minesweeper gridbased game. Bombs are randomly hidden behind tiles. Clicking a tile reveals the number of bombs that touch that tile.![Game Over](gameOver.PNG)

## Why I built the project this way:
* Built this grid based game after watching a YouTube video and building 9 other grid based games by coding along with the instructor.
* As the first game I made myself, it was gratifying to figure out the logic (my favorite part of programming) alone.

## Some interesting code:
* The logic is in app.js [app.js](app.js)
* With random bomb placement, the most interesting part of the coding was determining whether or not to open a neighboring tile, then its neighboring tile, and so forth. Adjoining tiles continue to be opened as long as they do not contain a bomb. Here is a snippet from app.js.!
[code snippet](minesweeperSnippet.PNG)

## If I had more time I would:
* Work on styling the tiles and layout more.
* Add an additional array to keep track of whether a player wins by opening all of the squares which have no bomb and then notify them.

## One way to run this:
* Open the folder in VSCode.
* Open the index.html
* Right click and choose Open with Live Server