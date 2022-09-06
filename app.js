document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(grid.querySelectorAll('div'));
    let gridNumbers = [];
    const numberOfBombs = 30;
    const width = 15;
    let bombSquares = [];
    let checkThese = [];
    let beenChecked = [];
    let leftEdge;
    let rightEdge;
    let topEdge;
    let bottomEdge;
    let noNeedToCheck;
    let temp = width * width + 1;
    let score = 0;
    let squaresOpened = 0;

    squares.forEach(clickFunction);

    //add event listener, what to do on click
    function clickFunction(item, index) {
        squares[index].addEventListener('click', () => {
            if (squares[index].classList.contains('bomb-here')) {
                // if blow up, populate bomb images and numbers
                for (i = 0; i < width * width; i++)
                    if (squares[i].classList.contains('bomb-here')) {
                        squares[i].style.backgroundImage = "url('bomb.png')";
                    } else {
                        if (gridNumbers[i] !== 0) { squares[i].innerHTML = gridNumbers[i] };
                        squares[i].style.background = 'lightblue';
                        squaresOpened = +1;
                    }
                squares[index].style.backgroundImage = "url('explodedbomb.png')";
                document.getElementById('result').innerHTML = '  You Lose!';

            } else {
                score += 1;
                document.getElementById('score').innerHTML = score;
                // open up clicked box, then continue to check if surrounding boxes should be revealed
                revealSquares(index);
                while (checkThese.length !== 0) {
                    temp = checkThese.shift();
                    revealSquares(temp);
                }
            }
        })
    }

    //populate bombs
    function populateBombs() {
        let randomNumber = 0;
        for (let i = 0; i < numberOfBombs; i++) {
            randomNumber = Math.floor(Math.random() * squares.length);
            bombSquares.push(randomNumber);
            squares[randomNumber].classList.add('bomb-here');
        }
    }

    // add number of bombs surrounding a square to gridNumbers array
    function populateNumbers() {
        for (i = 0; i < width * width; i++) {
            if (!squares[i].classList.contains('bomb-here')) {
                let index = i;
                let totalBombs = 0;
                checkEdge(index);
                if (!rightEdge && squares[index + 1].classList.contains('bomb-here')) { totalBombs++ };
                if (!leftEdge && squares[index - 1].classList.contains('bomb-here')) { totalBombs++ };
                if (!topEdge && squares[index - width].classList.contains('bomb-here')) { totalBombs++ };
                if (!bottomEdge && squares[index + width].classList.contains('bomb-here')) { totalBombs++ };
                if (!rightEdge && !topEdge && squares[index - width + 1].classList.contains('bomb-here')) { totalBombs++ };
                if (!rightEdge && !bottomEdge && squares[index + width + 1].classList.contains('bomb-here')) { totalBombs++ };
                if (!leftEdge && !topEdge && squares[index - width - 1].classList.contains('bomb-here')) { totalBombs++ };
                if (!leftEdge && !bottomEdge && squares[index + width - 1].classList.contains('bomb-here')) { totalBombs++ };
                gridNumbers[index] = totalBombs;

            }
        }
    }

    // on the edge of the grid? 
    function checkEdge(index) {
        leftEdge = (index % width === 0);
        rightEdge = (index % width === width - 1);
        topEdge = (index < width);
        bottomEdge = (index >= (width * (width - 1)));
    }

    //reveal appropriate surrounding squares of that clicked on
    function revealSquares(id) {
        let openThese = [];
        let tempId = width * width + 2;
        openThese.push(id);
        beenChecked.push(id);
        checkEdge(id);
        // if no bombs surround this square, 
        if (gridNumbers[id] === 0) {
            if (!rightEdge) {
                openThese.push(id + 1);
            };
            if (!leftEdge) {
                openThese.push(id - 1);
            };
            if (!bottomEdge) {
                openThese.push(id + width);
            };
            if (!topEdge) {
                openThese.push(id - width);
            };
            if (!rightEdge && !topEdge) {
                openThese.push(id - width + 1);
            };
            if (!rightEdge && !bottomEdge) {
                openThese.push(id + width + 1);
            };
            if (!leftEdge && !topEdge) {
                openThese.push(id - width - 1);
            };
            if (!leftEdge && !bottomEdge) {
                openThese.push(id + width - 1);
            };
        }
        for (i = 0; i < openThese.length; i++) { //first element already checked above
            if (gridNumbers[openThese[i]] !== 0) { squares[openThese[i]].innerHTML = gridNumbers[openThese[i]] };
            squares[openThese[i]].style.background = 'lightblue';
            if (gridNumbers[openThese[i]] === 0) {
                //is an opening number 0?
                noNeedToCheck = false;
                for (j = 0; j < beenChecked.length; j++) {
                    if (openThese[i] === beenChecked[j]) { noNeedToCheck = true; } //is the opening number already in checklist
                }
                if (!noNeedToCheck) {
                    tempId = openThese[i];
                    checkThese.push(tempId);
                }
            }
        }
    }

    populateBombs();
    populateNumbers();

})