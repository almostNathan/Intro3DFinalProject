//keyboard constants (I just copied and pasted, I hope thats fine)
K_A = 65; K_B = 66; K_C = 67; K_D = 68; K_E = 69; K_F = 70; K_G = 71;
K_H = 72; K_I = 73; K_J = 74; K_K = 75; K_L = 76; K_M = 77; K_N = 78;
K_O = 79; K_P = 80; K_Q = 81; K_R = 82; K_S = 83; K_T = 84; K_U = 85;
K_V = 86; K_W = 87; K_X = 88; K_Y = 89; K_Z = 90;
K_LEFT = 37; K_RIGHT = 39; K_UP = 38;K_DOWN = 40; K_SPACE = 32;
K_ESC = 27; K_PGUP = 33; K_PGDOWN = 34; K_HOME = 36; K_END = 35;
K_0 = 48; K_1 = 49; K_2 = 50; K_3 = 51; K_4 = 52; K_5 = 53;
K_6 = 54; K_7 = 55; K_8 = 56; K_9 = 57; 

keysDown = []

let canvasWidth = 800
let canvasHeight = canvasWidth *.75
let fr = 30
let rows = 8
let cols = 8
pieceWidth = 60
pieceHeight = 60
board = new Board(canvasWidth,canvasHeight, cols, rows, fr)

currentPiece = null

board.start()
board.makeSpaces()
board.drawBoard()
board.drawInterface()


//TEST AREA*******************
blackRook = new Piece(pieceWidth,pieceHeight,"assets/blackRook.png", board)
blackQueen = new Piece(pieceWidth,pieceHeight,"assets/blackQueen.png", board)
blackKnight = new Piece(pieceWidth,pieceHeight,"assets/blackKnight.png", board)
blackRook.setPos(board.spaces[14].center)
board.addPiece(blackRook)
blackQueen.setPos(board.spaces[25].center)
board.addPiece(blackQueen)
blackKnight.setPos(board.spaces[40].center)
board.addPiece(blackKnight)
//******************* */

//create listeners to detect clicking pieces
board.canvas.addEventListener("click", function (e){
    console.log("click")
    //for each piece on the board
    let closestSpaceDist = 100000
    let closestSpace = null
    //find the closest space to mouse to drop if currently holding piece
    //if there is a currently selecte piece
    if (board.pieceCurrentlySelected()){
        //variable for current piece
        let piece = board.pieceCurrentlySelected()
        console.log("in if piece currently clicked ")
        //for each space if it is closer, set as closest space 
        for(let space of board.spaces){
            if(space.distanceTo(piece) < closestSpaceDist){
                closestSpaceDist = space.distanceTo(piece)
                closestSpace = space
            }//end if (space closer than closeset)

        //TODO check if space is close enough to be dropped (not on interface)

        }//end for each space

        console.log(board.spaces.indexOf(closestSpace) +" "+closestSpace.xPos+ " " + closestSpace.yPos)
        //set current piece location to closest space
        piece.xPos = closestSpace.xPos
        piece.yPos = closestSpace.yPos


    }//end if (currently have piece)
    


    for (let i = 0; i < board.getPieces.length; i++){
        piece = board.getPieces[i]
        //if the mouse clicked the piece AND no piece is currently clicked.
        if (piece.checkForClick(e.offsetX, e.offsetY)){
            //console.log("clicked piece")
            currentPiece = piece
        }
    }
})


board.canvas.addEventListener("mousemove", function(e){
    board.mouseX = e.offsetX
    board.mouseY = e.offsetY
})

   
    


function updateScene(){
    board.drawBoard()
    board.drawInterface()
    for (let i = 0; i < board.getPieces.length; i++){
        piece = board.getPieces[i]
        piece.update()
        piece.draw()
    }
    
}