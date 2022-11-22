//Nathan Allen
//Game Engine


//global variables
//sprite array

//array to track keypresses

scene = new Scene(500,700,30)

ship = new Sprite(50, 50, "Spaceship.png", scene)
ship.setPos({x:100, y:100})
ship.setSpeed(6)
ship.setBoundAction(STOP)
ship.imageAngle = Math.PI * .5

sprites.push(ship)

scene.start()
