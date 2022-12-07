//Nathan Allen
//AUTOCHESS
//Final Project CSCI 43700-25633
class Space extends Sprite{

    /*******
     * Space object will manage each square on the chess board, Spaces will handle "engagements" and manage the Piece that is on it.
     * 
     * width : width of space
     * height : height of space
     * xPos : top left corner x Position 
     * yPos : top left corner y Position
     * center : {x: x Position of center, y: y Position of center}
     * color : fill color 
     * scene : scene it is a part of (board)
     * context : drawing context of the scene
     * currentPiece : the piece that is currently on this space
     */
    constructor(width, height, image, scene){
        super(height, width, image, scene)
        this.scene = scene
        this.context = scene.context
        this.currentPiece = null
    }

    draw(){
        super.draw()
        if (this.currentPiece!= null){
            this.currentPiece.setPos({x:this.xPos, y:this.yPos})
            this.currentPiece.draw()
        }
    }

    drawPiece(){
        this.currentPiece.draw()
    }

    addPiece(piece){
        piece.setPos({x:this.xPos,y:this.yPos})
        this.currentPiece = piece
    }

    removePiece(){
        let tempPiece = this.currentPiece
        this.currentPiece = null
        return tempPiece
    }
   
    hasPiece(){
        if (this.currentPiece!= null){
            return true
        }
        else{
            return false
        }
    }
}
