'use strict'

const GHOST = '&#9781'


var gGhosts = []
var gIntervalGhosts

function createGhost(board) {
    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD || POWER_FOOD ,
        color: getRandomColor(),
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    for(var i = 0; i < 3; i++){
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts,1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    
    // if (gPacman.isSuper) {
    //     if (nextCell === PACMAN) {
    //       removeGhost(ghost)
    //     }  
    //}     
    if (nextCell === WALL) return
    if (nextCell === GHOST ) return
    if (nextCell === PACMAN && (!gPacman.isSuper)) {
        gameOver()
        return
    }
    if(nextCell === PACMAN && (gPacman.isSuper)){
        removeGhost(ghost)
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function removeGhost(ghost){
    gGhosts.splice(gGhosts.indexOf(ghost), 1)
        renderCell(ghost.location, PACMAN)
        renderCell(gPacman.location, EMPTY)

}

function getGhostHTML(ghost) {
    //return `<span>${GHOST}</span>`
    var ghostColor = gPacman.isSuper ? 'blue' : ghost.color

    return `<span style="color:${ghostColor}">${GHOST}</span>`

    
}

function getGhostByLocation(location) {
    for (var i = 0; i < gGhosts.length; i++) {
      if ( gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j)
        return gGhosts[i]
    }
  }