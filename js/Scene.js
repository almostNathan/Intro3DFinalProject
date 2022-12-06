//Nathan Allen
//AUTOCHESS
//Final Project CSCI 43700-25633
class Scene{

    constructor(width, height){
        this.height = height
        this.width = width
        this.position = null
        this.currentKey = null
        this.mouseButton = null
        this.context = null
        this.sprites = []
    }


    start(){
        this.canvas = document.createElement("canvas")
        this.canvas.style.backgroundColor = "grey"
        document.body.appendChild(this.canvas)
        this.context = this.canvas.getContext("2d")
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.initKeys()

        //set framerate
        this.interval = setInterval(localUpdate, 50)
        //Set up key press function
        document.onkeydown = this.updateKeys
        //Set up key release function
        document.onkeyup = this.clearKeys
        //initialize keysDown Array

        //Set up mouse movement function
        document.onmousemove = function(e){
            this.mouseX = e.pageX
            this.mouseY = e.pageY
        }
        //set up mouse clicking functions
        document.mouseClicked = false
        document.onmousedown = function(){
            this.mouseDown = true
            this.mouseClicked = true
        }
        document.onmouseup = function(){
            this.mouseDown = false
            this.mouseClicked = false
        }



    }
    //stop updating 
    stop(){
        clearInterval(this.interval)
    }//end stop
    
    //clear the screen
    clear(){
        this.context.clearRect(0,0,this.width, this.height)
    }//end clear
    
    //cursor interaction 
    hideCursor(){
        this.canvas.style.cursor = "none"
    }
    showCursor(){
        this.canvas.style.cursor = "default"
    }//end cursor

    //sets all key values to false
    initKeys(){
        this.currentKey = null
        for (let i=0; i<256; i++){
            keysDown[i] = false
        }
    }//end initKeys

    //on keypsress, update current key tracking array and currently pressed key
    updateKeys(e){

        //set current key
        this.currentKey = e.keyCode
        //update keysDown Array adding current key
        keysDown[e.keyCode] = true
    }//end updateKeys

    //reset the keys array
    clearKeys(e){
        keysDown[e.keyCode] = false
    }//end clearKeys


    addSprite(sprite){
        this.sprites.push(sprite)
    }//end addSprite

    getSprites(){
        return this.sprites
    }



}
 //function needs to be defined by user
function localUpdate(){
        updateScene()
    }

let keysDown = []