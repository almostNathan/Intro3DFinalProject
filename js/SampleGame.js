//Nathan Allen
//Game Engine


//global variables
currentKey = null
//sprite array
sprites = []
//constants for bound actions
DELETE=0;WRAP=1;BOUNCE=2;STOP=3;KEEP=4;
//array to track keypresses
keysDown = []

//keyboard constants (I just copied and pasted, I hope thats fine)
K_A = 65; K_B = 66; K_C = 67; K_D = 68; K_E = 69; K_F = 70; K_G = 71;
K_H = 72; K_I = 73; K_J = 74; K_K = 75; K_L = 76; K_M = 77; K_N = 78;
K_O = 79; K_P = 80; K_Q = 81; K_R = 82; K_S = 83; K_T = 84; K_U = 85;
K_V = 86; K_W = 87; K_X = 88; K_Y = 89; K_Z = 90;
K_LEFT = 37; K_RIGHT = 39; K_UP = 38;K_DOWN = 40; K_SPACE = 32;
K_ESC = 27; K_PGUP = 33; K_PGDOWN = 34; K_HOME = 36; K_END = 35;
K_0 = 48; K_1 = 49; K_2 = 50; K_3 = 51; K_4 = 52; K_5 = 53;
K_6 = 54; K_7 = 55; K_8 = 56; K_9 = 57; 


function Sprite(height, width, image, scene){
        
        this.height = height
        this.width = width
        this.xPos = 0
        this.yPos = 0
        this.speed = 0
        this.compSpeed = {dx:0,dy:0}
        this.acceleration = 0
        this.compAccel = {ddx:0, ddy:0}
        this.moveAngle = 0
        this.image = new Image()
        this.image.src = image
        this.imageAngle = 0
        this.scene = scene
        this.boundAction = DELETE
        this.visible = true
        this.delete = false

    //function to draw sprite if visible
    this.draw = function(){
        if (this.visible == true){
            let context = this.scene.context 
            context.save()
            context.translate(this.xPos, this.yPos)
            context.rotate(this.imageAngle)
            context.drawImage(this.image,0-this.width/2,0-this.height/2,this.width, this.height)
            context.restore()
            this.checkBounds()
        }//end if

    }//end draw

    //update position of sprite
    this.update = function(){
        //increase speed by acceleration
        this.compSpeed.dx += this.compAccel.ddx
        this.compSpeed.dy += this.compAccel.ddy
        //move based on speed
        this.xPos += this.compSpeed.dx
        this.yPos -= this.compSpeed.dy


    }//end update

    //get compoent dx/dy from speed/angle
    //return object {dx:#, dy:#}
    this.vectProject = function(speed, angle){
        returnValue = {dx:0, dy:0}
        returnValue.dx = speed * Math.cos(angle)
        returnValue.dy = speed * Math.sin(angle)
        return returnValue
    }//end vectProject

    //parameters - speed and angle of force to current
    this.addForce = function(addSpeed, addAngle){
        //get the vector projection for the speed/angle of force
        newForce = this.vectProject(addSpeed, addAngle)
        //add these new forces
        this.compSpeed.dx += newForce.dx
        this.compSpeed.dy += newForce.dy
    }//end addForce

    //idea - change how player/enemy bullets work
    this.setBoundAction = function(action){
        this.boundAction = action
    }//end setBoundAction

    //check if parameter sprite is colliding with this sprite
    this.collidesWith = function(otherObject){
        collision = true
        //get the borders of the objects
        thisLeft = this.xPos - this.width/2
        thisRight = this.xPos + this.width/2
        thisTop = this.yPos - this.width/2
        thisBottom = this.yPos + this.width/2

        otherLeft = this.xPos - this.width/2
        thisRight = this.xPos + this.width/2
        thisTop = this.yPos - this.width/2
        thisBottom = this.yPos + this.width/2

        //if ANY of the borders are outside the other objects opposite border, the two CANNOT be colliding
        if (thisLeft>otherRight || thisRight<otherLeft || thisTop<otherBottom || thisBottom>otherTop){
            collision = false
        }

        return collision
    }//end collidesWith


    //function for checking bounds and handling accordingly
    this.checkBounds = function(){
        //if delete, flag for deletion
        if (this.boundAction == DELETE){
            if(this.xPos > this.scene.width || this.xPos < 0 || this.yPos > this.scene.height || this.yPos < 0){
                this.delete = true
            }
        }//end DELETE
        //if BOUNCE, change speed to opposite direction
        else if(this.boundAction == BOUNCE){
            //goes off left/right
            if(this.xPos > this.scene.width || this.xPos < 0){
                this.compSpeed.dx *= -1
            }
            //goes off top/bottom
            if (this.yPos > this.scene.height || this.yPos < 0){
                this.compSpeed.dy *= -1
            }
        }//end BOUNCE

        //if STOP, keep sprite in the canvas
        else if (this.boundAction == STOP){
            //Right
            if(this.xPos+this.widht/2 > this.scene.width){
                this.xPos = this.scene.width - this.width/2 
            }
            //left
            if(this.xPos-this.width/2 < 0){
                this.xPos = this.width/2 
            }
            //bottom
            if (this.yPos+this.height/2 > this.scene.height){
                this.yPos = this.scene.height - this.height/2
            }
            //top
            if(this.yPos-this.height/2 < 0){
                this.yPos = this.height/2
            }
        }//end STOP
    }//end checkBounds

    //measure and return the distance between two sprites
    this.distanceTo = function(otherSprite){
        xDif = this.xPos - otherSprite.xPos
        yDif = this.yPos - otherSprite.yPos
        distance = Math.sqrt(Math.pow(xDif, 2) + Math.pow(yDif, 2))
        return distance
    }

    //find the angle between two sprites
    this.angleTo = function(otherSprite){
        xDif = this.xPos - otherSprite.xPos
        yDif = this.yPos - otherSprite.yPos
        angle = Math.atan2(yDif, xDif)
        return angle

    }

    this.hide = function(){
        this.visible = false
    }
    this.show = function(){
        this.visible = true
    }

    //delete status get
    this.getDeleteStatus = function(){
        return this.delete
    }

    //POSITION set/get
    this.setXPos = function(x){
        this.xPos = x
    }
    this.setYPos = function(y){
        this.yPos = y
    }
    this.setPos = function(position){
        this.xPos = position.x
        this.yPos = position.y
    }
    this.getXPos = function(){
        return this.xPos
    }
    this.getYPos = function(){
        return this.yPos
    }
    
    //SPEED set/get
    this.setSpeed = function(newSpeed){
        this.speed = newSpeed
    }
    this.setXSpeed = function(newXSpeed){
        this.compSpeed.dx = newXSpeed
    }
    this.setYSpeed = function(newYSpeed){
        this.compSpeed.dy = newYSpeed
    }
    this.getSpeed = function(){
        return this.speed
    }
    this.getXSpeed = function(){
        return this.compSpeed.dx
    }
    this.getYSpeed = function(){
        return this.compSpeed.dy
    }




}//endSprite

function Scene(height, width, fr){

        this.height = height
        this.width = width
        this.position = null
        this.framerate = fr
        this.currentKey = null
        this.mouseButton = null


    this.start = function(){

        this.canvas = document.createElement("canvas")
        this.canvas.style.backgroundColor = "grey"
        document.body.appendChild(this.canvas)
        this.context = this.canvas.getContext("2d")
        this.canvas.width = this.width
        this.canvas.height = this.height

        //set framerate
        this.interval = setInterval(updateScene, 50)
        //Set up key press function
        document.onkeydown = this.updateKeys
        //Set up key release function
        document.onkeyup = this.clearKeys
        //initialize keysDown Array
        this.initKeys()

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
    this.stop = function(){
        clearInterval(this.interval)
    }//end stop
    
    //clear the screen
    this.clear = function(){
        this.context.clearRect(0,0,this.width, this.height)
    }//end clear
    
    //cursor interaction 
    this.hideCursor = function(){
        this.canvas.style.cursor = "none"
    }
    this.showCursor = function(){
        this.canvas.style.cursor = "default"
    }//end cursor

    //on keypsress, update current key tracking array and currently pressed key
    this.updateKeys = function(e){
        //set current key
        this.currentKey = e.keyCode
        //update keysDown Array adding current key
        keysDown[e.keyCode] = true
    }//end updateKeys

    //reset the keys array
    this.clearKeys = function(e){
        keysDown[e.keyCode] = false
    }//end clearKeys

    //sets all key values to false
    this.initKeys = function(){
        this.currentKey = null
        for (let i=0; i<256; i++){
            keysDown[i] = false
        }
    }//end initKeys

    this.addSprite = function(sprite){
        sprites.push(sprite)
    }//end addSprite




//update function for scene user input goes here
function updateScene(){
    scene.clear()

    //define keys
    if (keysDown[K_UP]){
        ship.setYPos(ship.getYPos() - ship.getSpeed())
    }
    if (keysDown[K_DOWN]){
        ship.setYPos(ship.getYPos() + ship.getSpeed())
    }
    if (keysDown[K_LEFT]){
        ship.setXPos(ship.getXPos() - ship.getSpeed())
    }
    if (keysDown[K_RIGHT]){
        ship.setXPos(ship.getXPos() + ship.getSpeed())
    }

    //TODO add some sort of cooldown for rate of fire
    //spacebar fires bullets
    if (keysDown[K_SPACE]){
        bullet = new Sprite(10,10, "Missile.png", scene)
        bullet.xPos = ship.xPos
        bullet.yPos = ship.yPos
        bullet.compSpeed.dx = 10
        //rotate the image (base image is on a 45)
        bullet.imageAngle = Math.PI *.25
        sprites.push(bullet)
    }

    if (sprites.length > 0){
        for (let i = sprites.length-1; i>=0; i--){
            sprites[i].draw()
            sprites[i].update()
            if (sprites[i].getDeleteStatus() == true){
                sprites.splice(i,1)
            }
        }
    }
}


}//end scene


scene = new Scene(500,700,30)

ship = new Sprite(50, 50, "Spaceship.png", scene)
ship.setPos({x:100, y:100})
ship.setSpeed(6)
ship.setBoundAction(STOP)
ship.imageAngle = Math.PI * .5

sprites.push(ship)

scene.start()
