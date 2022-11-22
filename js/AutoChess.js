//keyboard constants (I just copied and pasted, I hope thats fine)
K_A = 65; K_B = 66; K_C = 67; K_D = 68; K_E = 69; K_F = 70; K_G = 71;
K_H = 72; K_I = 73; K_J = 74; K_K = 75; K_L = 76; K_M = 77; K_N = 78;
K_O = 79; K_P = 80; K_Q = 81; K_R = 82; K_S = 83; K_T = 84; K_U = 85;
K_V = 86; K_W = 87; K_X = 88; K_Y = 89; K_Z = 90;
K_LEFT = 37; K_RIGHT = 39; K_UP = 38;K_DOWN = 40; K_SPACE = 32;
K_ESC = 27; K_PGUP = 33; K_PGDOWN = 34; K_HOME = 36; K_END = 35;
K_0 = 48; K_1 = 49; K_2 = 50; K_3 = 51; K_4 = 52; K_5 = 53;
K_6 = 54; K_7 = 55; K_8 = 56; K_9 = 57; 

keysDown = []

let canvasWidth = 800
let canvasHeight = canvasWidth *.75
let fps = 30
let rows = 8
let cols = 8
board = new Board(canvasWidth,canvasHeight,fps,{cols:cols, rows:rows})

board.start()
board.drawBoard()
board.drawInterface()

whitePawn = new Piece(50,50,"images/whitePawn.png", board)
whitePawn.setPos({x:100, y:100})
board.addSprite(whitePawn)


function updateScene(){
    for (let i = 0; i<board.sprites.length; i++){
        board.sprites[i].update()
        board.sprites[i].draw()
    }
}