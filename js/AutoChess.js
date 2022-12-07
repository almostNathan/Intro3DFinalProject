//Nathan Allen
//AUTOCHESS
//Final Project CSCI 43700-25633


let canvasWidth = 800
let canvasHeight = canvasWidth *.75
let rows = 8
let cols = 8
let pieceWidth = 60
let pieceHeight = 60
let board = new Board(canvasWidth,canvasHeight, cols, rows)
let backgroundImage = "assets/background.png"
let nextRoundButtonImage = "assets/nextRound.png"

let selectedPiece = null

board.start()
board.makeInterface(backgroundImage, nextRoundButtonImage)//can maybe pass in skins later on.
board.initOpponent()


//TEST AREA*******************
//blackRook = new Piece(pieceWidth,pieceHeight,"assets/blackRook.png", board)
//blackQueen = new Piece(pieceWidth,pieceHeight,"assets/blackQueen.png", board)
//blackKnight = new Piece(pieceWidth,pieceHeight,"assets/blackKnight.png", board)

//blackRook.setPos(board.spaces[14].center)
//board.spaces[14].setCurrentPiece(blackRook)
//board.addPiece(blackRook)

//blackQueen.setPos(board.spaces[25].center)
//board.spaces[25].setCurrentPiece(blackQueen)
//board.addPiece(blackQueen)

//blackKnight.setPos(board.spaces[40].center)
//board.spaces[40].setCurrentPiece(blackKnight)
//board.addPiece(blackKnight)
//******************* */

//create listeners to detect clicking pieces

board.canvas.addEventListener("mousedown", function(e){
    selectedPiece = board.getClicked(board.mousePos)

    if (selectedPiece!=null){
        selectedPiece.isSelected = true

    }
})

board.canvas.addEventListener("mouseup", function(e){

    //if there is a piece selected
    if (selectedPiece!=null){
        //check the bottom row if released 
        for (let space of board.getBottomRow()){
            if (space.isClicked(board.mousePos)){
                //if no piece currently in the space and player has enough money
                if (!space.hasPiece() && board.playerMoney >= selectedPiece.price){
                    board.playerMoney -=selectedPiece.price
                    space.addPiece(selectedPiece.makeCopy())
            }
            }
        }

        selectedPiece.setPos({x: selectedPiece.xOrigin, y:selectedPiece.yOrigin})
        selectedPiece.isSelected = false
    }
        selectedPiece = null
})

board.canvas.addEventListener("click", function(e){
    if (board.nextRoundButton.isClicked(board.mousePos)){
        board.playerMoney += board.playerIncome

        //MULTIPLAYER


        
        board.movePieces(board.spaces)
    }
    if (board.incomeButton.isClicked(board.mousePos)){
        if(board.playerMoney >= 10){
            board.playerMoney -= 10
            board.playerIncome += 2
        }
    }
})
    
board.canvas.addEventListener("mousemove", function(e){
    board.mouseX = e.offsetX
    board.mouseY = e.offsetY
    board.mousePos = {x:e.offsetX, y:e.offsetY}
})



//board: 2d array of spaces
function flipSpaces(spacesArray){
    let flippedSpaces = [[]]
    for (let i = 0; i<spacesArray.length; i++){
        for (let j = 0; j<spacesArray[i].length; j++){
            flippedSpaces[i][j] = spacesArray[(spacesrray.length-1)-i][(spacesArray[i]-1)-j]
        }
    }
}

function updateScene(){
    board.drawBoard()
    
}
