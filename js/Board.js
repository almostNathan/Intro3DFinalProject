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
        this.spaces = this.makeSpaces() 
        this.shopPieces = []
        this.playerMoney = 10
        this.prices = [10,15,20,20,30]
        this.priceLabels = []
        this.playerIncome = 10
        this.playerHealth = 10

    }



    //enemySpaces = array of spaces for enemy board in player orientation
    //draw squares on board on left side of screen, leaving room for pieces interface
    drawBoard(){
        this.playerInterface.draw()
        this.incomeButton.draw()
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
        let shopItemWidth = this.boardWidth/10
        let shopItemHeight = this.boardHeight/10
        this.shopPieces[0] = new Piece(shopItemWidth,shopItemHeight, "assets/blackPawn.png", this)
        this.shopPieces[1] = new Piece(shopItemWidth,shopItemHeight, "assets/blackKnight.png", this)
        this.shopPieces[2] = new Piece(shopItemWidth,shopItemHeight, "assets/blackBishop.png", this)
        this.shopPieces[3] = new Piece(shopItemWidth,shopItemHeight, "assets/blackRook.png", this)
        this.shopPieces[4] = new Piece(shopItemWidth,shopItemHeight, "assets/blackQueen.png", this)


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

            this.incomeButton = new Sprite(shopItemWidth*2,shopItemHeight, "assets/greySpace.png", this)
            this.incomeButton.setPos({x:this.playerInterface.xPos, y: this.height*6/7})
    
    }


    movePieces(spaces){
        //shift pieces up
        //look thru the spaces 2d array for spaces that have pieces, remove those pieces and add them to the space north
        for (let i = 0; i <this.spaces.length; i++){
            for (let j = 0 ; j<this.spaces[i].length; j++){
                if (this.spaces[i][j].hasPiece()){
                        let currentSpace = this.spaces[i][j]

                    //if the piece made it to the last row
                    if (i <=0){
                        this.playerHealth += 1
                        currentSpace.removePiece()
                    }else{
                        let newSpace = this.spaces[i-1][j]
                        newSpace.addPiece(currentSpace.removePiece())

                    }

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


        return spacesArray

    }

    //returns the thing clicked, piece or button that was clicked on, if any
    getClicked(click){
        for (let piece of this.shopPieces){
            if (piece.isClicked({x: click.x, y:click.y})){
                return piece
            }
        }

    }

    //draw currentMoney and currentHealth
    drawScoreboard(scoreboard){
        this.context.fillStyle = "black"
        this.context.font = "30px Arial"
        this.context.textAlign = "center"
        this.textBaselin = "middle"
        this.context.fillText("HP: "+this.playerHealth + " - $"+this.playerMoney, scoreboard.xPos, scoreboard.yPos)

        this.context.fillText("Income", this.incomeButton.xPos, this.incomeButton.yPos)
    }


    initOpponent(){
        this.enemySpaces = this.makeSpaces()
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