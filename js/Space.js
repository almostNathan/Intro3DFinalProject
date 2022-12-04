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


    //draw(){
        //this.context.save()
        //this.context.translate(this.xPos, this.yPos)

        //this.context.fillStyle = this.color
        //this.context.fillRect(0,0, this.width, this.height)

        //this.context.restore()
    //}

    //distanceTo(x, y){
        //let xDiff = this.center.x - x
        //let yDiff = this.center.y - y

        //let distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff)

        //return distance
    //}

    hasPiece(){
        if (this.currentPiece = null){
            return false
        }else{
            return true
        }
    }

    getCurrentPiece(){
        return this.currentPiece
    }

}