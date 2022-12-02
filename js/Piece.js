class Piece extends Sprite{

    constructor(width, height, image, scene){
        super(width, height, image, scene)
        this.cost = 0
        this.value = 0
        this.inSpace = false
        this.isClicked = false
    }

    update(){
        if (this.isClicked){
            this.xPos = this.scene.mouseX
            this.yPos = this.scene.mouseY
        }
    }

    checkForClick(clickX, clickY, otherPieceClicked){
        console.log(otherPieceClicked)
        let left = this.xPos - this.width/2
        let right = this.xPos + this.width/2
        let top = this.yPos - this.height/2
        let bot = this.yPos + this.height/2

        //if mouse is NOT clicked on this piece
        if (clickX > right || clickX < left || clickY < top || clickY > bot){
            this.isClicked = false

            return false
        }else if (!otherPieceClicked && !this.isClicked){
            this.isClicked = true
        }else{
            this.isClicked = false
            this.returnToStart()
        }
    }


    returnToStart(){
        this.xPos = this.startX
        this.yPos = this.startY
    }

    setStartPos(startPos){
        this.xStart = startPos.x
        this.yStart = startPos.y
    }




}