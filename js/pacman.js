'use strict'

const PACMAN = '😜';
var gPacman;
var gSuper = false

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gCounter--
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === POWER_FOOD) {
        gPacman.isSuper = true
        console.log('is power on');
        setTimeout(function () { 
            freePacmenFromPower()
        }, 5000)
    }
    if(nextCell === CHERRY) updateScore(10)
    if (nextCell === GHOST && gPacman.isSuper) {
        updateScore(1)
        var ghost = getGhostByLocation(nextLocation)
        removeGhost(ghost)
    }
    
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function freePacmenFromPower() {
    gPacman.isSuper = false
    console.log('is off power');
}