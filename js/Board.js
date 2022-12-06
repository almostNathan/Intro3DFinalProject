//Nathan Allen
//AUTOCHESS
//Final Project CSCI 43700-25633
//-------
//BOARD class
//this will be the main controller of what is displayed in the game. it holds all the sprites and controls them.


class Board extends Scene{
    //parameters
    //width, height = size of board(canvas) in pixels (interface will take up 1/4 of the screen horizontally)
    //cols, rows = number of columns/rows on the chess board (will scale to the size of the board)
    constructor(width, height, cols, rows){
        super(width, height)
        this.boardWidth = this.width*.75
        this.boardHeight = this.height
        this.numSpaces = cols*rows
        this.cols = cols
        this.rows = rows
        this.spaceWidth = this.boardWidth / cols
        this.spaceHeight = this.boardHeight/ rows
        this.spaces = [[]]
        this.shopPieces = []
        this.playerMoney = 10
        this.prices = [10,15,20,20,30]
        this.priceLabels = []
        this.playerIncome = 10

    }




    //draw squares on board on left side of screen, leaving room for pieces interface
    drawBoard(){
        this.playerInterface.draw()
        this.nextRoundButton.draw()

        this.drawScoreboard(this.scoreboard)

        
        for (let listOfSpaces of this.spaces){
            for(let space of listOfSpaces){
                space.draw()
            }
        }
        for (let label of this.priceLabels){
            label.draw()
        }
        for (let shopPiece of this.shopPieces){
            shopPiece.update()
            shopPiece.draw()
        }


    }

    //builds the player interface on the right side of the screen
    //builds the "bed" for the shop
    //builds shop
    //builds the next round button
    makeInterface(background, nextRound){
        //interface is 1/4 the scree so center of interface is 
        //x = 7/8 the way across the screen
        //y = middle of screen
        this.playerInterface = new Sprite(this.width*.25, this.height, background, this)
        this.playerInterface.setPos({x:this.width*.875, y:this.height/2})

        this.scoreboard = new Sprite(this.width*.25, this.height*.1, "assets/greySpace.png", this)
        this.scoreboard.setPos({x:this.playerInterface.xPos, y:this.height/20})

        this.makeShop()

        //button is 1/10 the height of the interface so center of button is 
        //x = same as the interfaces
        //y = 19/20 across the screen
        this.nextRoundButton = new Sprite(this.playerInterface.width, this.playerInterface.height/10, nextRound, this)
        this.nextRoundButton.setPos({x:this.playerInterface.xPos, y:this.height*19/20})

    }

    //builds the shop where the player can select pieces
    makeShop(){
        this.shopPieces[0] = new Piece(this.boardWidth/10,this.boardHeight/10, "assets/blackPawn.png", this)
        this.shopPieces[1] = new Piece(this.boardWidth/10,this.boardHeight/10, "assets/blackKnight.png", this)
        this.shopPieces[2] = new Piece(this.boardWidth/10,this.boardHeight/10, "assets/blackBishop.png", this)
        this.shopPieces[3] = new Piece(this.boardWidth/10,this.boardHeight/10, "assets/blackRook.png", this)
        this.shopPieces[4] = new Piece(this.boardWidth/10,this.boardHeight/10, "assets/blackQueen.png", this)


        let i = 1
        for (let piece of this.shopPieces){
            piece.setPos({x:this.playerInterface.xPos, y:this.height*i/7 })
            piece.setOrigin({x:this.playerInterface.xPos, y:this.height*i/7 })
            //set price of the each piece
            piece.price = this.prices[i-1]
            console.log(this.prices[i])
            let newLabel = new Sprite(20,20,"assets/"+this.prices[i-1]+".png",this)
            newLabel.setPos({x:piece.xPos ,y:piece.yPos+piece.height/1.5})
            this.priceLabels.push(newLabel)

            i++
        }
    
    }


    movePieces(){
        //shift pieces up

        for (let row of this.spaces){
            for (let space of row){
                space.yPos -= this.spaceHeight
                if (space.yPos < 0){
                    space.yPos += this.height
                }
            }
        }
    }


    //initializes all the spaces on the board 
    //
    makeSpaces(){
        let spacesArray = []

        //for each cell in a column
        for (let i=0; i<this.cols; i++){
            let thisRow = []
            //for each cell in a row
            for (let j=0; j<this.rows; j++){
                if ((i+j)%2 == 1){
                    let newSpace = new Space(this.spaceWidth, this.spaceHeight, "assets/whiteSpace.png", this)
                    newSpace.setPos({x:j*this.spaceWidth+this.spaceWidth/2, y:i*this.spaceHeight+this.spaceHeight/2})
                    thisRow.push(newSpace)
                }else{
                    let newSpace = new Space(this.spaceWidth, this.spaceHeight, "assets/greySpace.png", this)
                    newSpace.setPos({x:j*this.spaceWidth+this.spaceWidth/2, y:i*this.spaceHeight+this.spaceHeight/2})
                    thisRow.push(newSpace)
                }
            }
            spacesArray.push(thisRow)
        }

        this.spaces = spacesArray

    }

    //returns the thing clicked, piece or button that was clicked on, if any
    getClicked(click){
        for (let piece of this.shopPieces){
            if (piece.isClicked({x: click.x, y:click.y})){
                return piece
            }
        }

    }

    drawScoreboard(scoreboard){
        this.context.fillStyle = "black"
        this.context.font = "30px Arial"
        this.context.textAlign = "center"
        this.textBaselin = "middle"
        this.context.fillText("$"+this.playerMoney, scoreboard.xPos, scoreboard.yPos)
    }

    getBottomRow(){
        return this.spaces[7]
    }

    getPieces(){
        return this.pieces
    }

    drawInterface(){
       
    }

    drawSpace(x,y, fillColor){
        this.context.fillStyle = fillColor
        this.context.fillRect(x , y, this.cellWidth, this.cellHeight)
    }

    

    addPiece(piece){
        this.pieces.push(piece)
    }


    //getters/setters
    getPieces(){
        return this.pieces
    }

    getSpaces(){
        return this.spaces
    }
}