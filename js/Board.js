class Board extends Scene{
    //parameters
    //width, height = size of board(canvas) in pixels
    //fr            = framerate
    //cells         = {cols:numCols , rows:numRows}
    constructor(width, height, fr, cells){
        super(width, height, fr)
        this.boardWidth = this.width*.75
        this.boardHeight = this.height
        this.cells = cells
        this.cols = cells.cols
        this.rows = cells.rows
        this.cellHeight = this.boardHeight/ cells.rows
        this.cellWidth = this.boardWidth / cells.cols
        this.pieces = []
    }

    //draw squares on board on left side of screen, leaving room for pieces interface
    drawBoard(){
        //for each cell in a row
        for (let i=0; i<this.rows; i++){
            //for each cell in a column
            for (let j=0; j<this.cols; j++){
                if ((i+j)%2 == 1){
                    this.drawSpace(i*this.cellWidth,j*this.cellHeight,"white")
                }else{
                    this.drawSpace(i*this.cellWidth,j*this.cellHeight,"black")
                }
            }
        }
    }


    drawInterface(){
        var gradient = this.context.createLinearGradient(0,0,0,this.height)
        gradient.addColorStop(1,"lightblue")
        gradient.addColorStop(0,"grey")
        this.context.fillStyle = gradient
        this.context.rect(this.boardWidth, 0, this.width-this.boardWidth, this.height)
        this.context.fill()
    }

    drawSpace(x,y, fillColor){
        this.context.fillStyle = fillColor
        this.context.fillRect(x , y, this.cellWidth, this.cellHeight)
    }

    
}