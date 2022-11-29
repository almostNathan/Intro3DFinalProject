class Space{

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
    constructor(width, height, x, y, color, scene){
        this.width = width
        this.height = height
        this.xPos = x
        this.yPos = y
        this.center = {x: this.xPos+width/2, y: this.yPos+height/2}
        this.color = color
        this.scene = scene
        this.context = scene.context
        this.currentPicece = null
    }


    draw(counter){
        this.context.save()
        this.context.translate(this.xPos, this.yPos)

        this.context.fillStyle = this.color
        this.context.fillRect(0,0, this.width, this.height)

        this.context.restore()
    }

}