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


   
    hasPiece(){
        if (this.currentPiece = null){
            return false
        }else{
            return true
        }
    }

    get getCurrentPiece(){
        return this.currentPiece
    }
    
    //returns 
    checkForClick(clickX, clickY, selectedPiece){
        let left = this.xPos - this.width/2
        let right = this.xPos + this.width/2
        let top = this.yPos - this.height/2
        let bot = this.yPos + this.height/2

        //if mouse is NOT clicked on this space
        if (clickX > right || clickX < left || clickY < top || clickY > bot){
            return null
        }
        //else if mouse is clicked on this space
        else {
            console.log(left/this.width+" "+top/this.height)
            console.log("currentPiece " + this.currentPiece)
            console.log("selected Piece "+ selectedPiece)
            //if a piece is currently selected and no piece on this space. take piece
            if (selectedPiece != null && this.currentPiece == null){
                console.log("take piece")
                selectedPiece.xOrigin = this.xPos
                selectedPiece.yOrigin = this.yPos
                this.setCurrentPiece(selectedPiece)
                selectedPiece.isClicked = true
            }
            //if no selected piece, but piece in this space, give piece
            else if(selectedPiece == null && this.currentPiece != null){
                console.log("give piece")
                selectedPiece = this.currentPiece
                selectedPiece.isClicked = true
                this.currentPiece = null
            }
            return true
        }
    }

    

    setCurrentPiece(piece){
        this.currentPiece = piece

    }
}