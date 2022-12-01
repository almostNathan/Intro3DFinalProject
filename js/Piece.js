class Piece extends Sprite{

    constructor(width, height, image, scene){
        super(width, height, image, scene)
        this.cost = 0
        this.value = 0
        this.isClicked = false
    }

    update(){
        if (this.isClicked){
            this.x = this.scene.mouseX
            this.y = this.scene.mouseY
        }
    }

    checkForClick(clickX, clickY){
        let left = this.xPos - this.width/2
        let right = this.xPos + this.width/2
        let top = this.yPos - this.height/2
        let bot = this.yPos + this.height/2

        if (clickX > right || 
            clickX < left ||
            clickY < top ||
            clickY > bot)
            {
                this.isClicked = false
                return false
            }else{
                return true
            }
    }




}