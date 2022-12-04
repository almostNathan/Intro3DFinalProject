class Piece extends Sprite{

    constructor(width, height, image, scene){
        super(width, height, image, scene)
        this.cost = 0
        this.value = 0
        this.inSpace = false
        this.isClicked = false
        this.xOrigin = 20
        this.yOrigin = 20
    }

    update(){
        //while the piece is selected, move to location of mouse
        if (this.isClicked){
            this.xPos = this.scene.mouseX
            this.yPos = this.scene.mouseY
        }
    }

    checkForClick(clickX, clickY){
        let left = this.xPos - this.width/2
        let right = this.xPos + this.width/2
        let top = this.yPos - this.height/2
        let bot = this.yPos + this.height/2

        //if mouse is NOT clicked on this piece
        if (clickX > right || clickX < left || clickY < top || clickY > bot){
            this.isClicked = false
            return false
        //else if 
        }else if (!this.isClicked){
            this.xOrigin = this.xPos
            this.yOrigin = this.yPos

            this.isClicked = true

        }else{
            this.isClicked = false
            this.returnToStart()
        }
    }


    returnToStart(){
        this.xPos = this.xOrigin
        this.yPos = this.yOrigin
    }





}