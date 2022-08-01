'use strict'

const WALL = '#'
const FOOD = '.'
const POWER_FOOD = '🍕'
const EMPTY = ' '
const CHERRY = '🍒'

var gIntervalCherry;
var gCounter = 0



var gGame = {
    score: 0,
    isOn: false
}
var gBoard

function init() {
    gCounter = 0
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    updateScore(gGame.score)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    
    gIntervalCherry = setInterval(addCherry, 15000);
}

function playAgain(){
    var elBoard = document.querySelector('.board-container')
    elBoard.style.display = 'block'
    var elGameOver = document.querySelector('.gameover')
    elGameOver.style.display = 'none'
    var elWinner = document.querySelector('.winner')
    elWinner.style.display = 'none'
    gGame.score = 0
    init()
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            gCounter++
            if ( (i === 1 && j === 1) ||
                 (i === 1 && j === SIZE-2) ||
                 (i === SIZE - 2 && j === 1)|| 
                 (i === SIZE - 2 && j === SIZE-2) ) {
                    board[i][j] = POWER_FOOD
                    gCounter--
                 }

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gCounter--
            }
        }
    }
    gCounter--
    console.log('gCounter' , gCounter);
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    if(isAteThemAll(gGame.score)){
        gameOver()
    }
}

function addCherry() {
    var emptyCells = getEmptyCells(gBoard);
    var cell = drawNum(emptyCells);
    gCounter += 10
    gBoard[cell.i][cell.j] = CHERRY;
    renderCell(cell, CHERRY);
}

function gameOver() {
    var elBoard = document.querySelector('.board-container')
    elBoard.style.display = 'none'
    
    if(isAteThemAll(gGame.score)){
        console.log('You Won!!!')
        var elWinner = document.querySelector('.winner')
        elWinner.style.display = 'block' 
    }else{
        console.log('Game Over')
        var elGameOver = document.querySelector('.gameover')
        elGameOver.style.display = 'block'
    }
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
}

function isAteThemAll(score){
    return (gCounter-score===0)
}

