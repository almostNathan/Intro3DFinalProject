class Board extends Scene{
    //parameters
    //width, height = size of board(canvas) in pixels
    //fr            = framerate
    //cells         = {cols:numCols , rows:numRows}
    constructor(width, height, cols, rows, fr){
        super(width, height, fr)
        this.boardWidth = this.width*.75
        this.boardHeight = this.height
        this.numSpaces = cols*rows
        this.cols = cols
        this.rows = rows
        this.spaceWidth = this.boardWidth / cols
        this.spaceHeight = this.boardHeight/ rows
        this.pieces = []
        this.spaces = []
    }



    //draw squares on board on left side of screen, leaving room for pieces interface
    drawBoard(){

        let counter = 0
        //for (let i = 0; i<this.spaces.length; i++){
        for (let space of this.spaces){
            space.draw(counter)
            counter++
        }


    }

    makeSpaces(){
        let spacesArray = []
        //for each cell in a column
        for (let i=0; i<this.cols; i++){
            //for each cell in a row
            for (let j=0; j<this.rows; j++){
                if ((i+j)%2 == 1){
                    spacesArray.push(new Space(this.spaceWidth, this.spaceHeight,i*this.spaceWidth,j*this.spaceHeight,"white", this))
                }else{
                    spacesArray.push(new Space(this.spaceWidth, this.spaceHeight,i*this.spaceWidth,j*this.spaceHeight,"gray", this))
                }
            }
        }

        this.spaces = spacesArray

    }


    drawInterface(){
        var gradient = this.context.createLinearGradient(0,0,0,this.height)
        gradient.addColorStop(1,"white")
        gradient.addColorStop(0,"grey")
        this.context.fillStyle = gradient
        this.context.fillRect(this.boardWidth, 0, this.width-this.boardWidth, this.height)
        
        this.nextRoundButton = this.makeNextRoundButton()
    }

    drawSpace(x,y, fillColor){
        this.context.fillStyle = fillColor
        this.context.fillRect(x , y, this.cellWidth, this.cellHeight)
    }

    makeNextRoundButton(){
        let nextRoundButton = {
            x: this.boardWidth, 
            y: this.boardHeight*.9, 
            width: this.width-this.boardWidth, 
            height: this.boardHeight*.1,
        }

        nextRoundButton.xCenter = nextRoundButton.x+nextRoundButton.width/2
        nextRoundButton.yCenter = nextRoundButton.y+nextRoundButton.height/2
        this.context.fillStyle = "lightGreen"
        this.context.fillRect(nextRoundButton.x ,nextRoundButton.y ,nextRoundButton.width ,nextRoundButton.height)

        this.context.fillStyle = "black"
        this.context.font = "30px Arial"
        this.context.textAlign = "center" //center horizontally
        this.context.textBaseline = "middle" //center vertically
        this.context.fillText("Next Round",nextRoundButton.xCenter,nextRoundButton.yCenter)
        return nextRoundButton
    }

    addPiece(piece){
        this.pieces.push(piece)
    }
    
}