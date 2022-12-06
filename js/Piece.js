//Nathan Allen
//AUTOCHESS
//Final Project CSCI 43700-25633
class Piece extends Sprite{

    constructor(width, height, image, scene){
        super(width, height, image, scene)
        this.cost = 0
        this.value = 0
        this.inSpace = false
        this.isSelected = false
        this.isClickable = true
        this.xOrigin = 20
        this.yOrigin = 20
    }

    update(){
        //while the piece is selected, move to location of mouse
        if (this.isSelected){
            this.xPos = this.scene.mouseX
            this.yPos = this.scene.mouseY
        }
    }


    setOrigin(newOrigin){
        this.xOrigin = newOrigin.x
        this.yOrigin = newOrigin.y
    }

    returnToStart(){
        this.xPos = this.xOrigin
        this.yPos = this.yOrigin
    }

    makeCopy(){
        return new Piece(this.width, this.height, this.image.src, this.scene)
        
    }



}