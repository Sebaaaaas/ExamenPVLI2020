import Rectangle from './rectangle.js';
import Link from './link.js';
import Enemy from './enemy.js';

export default class Game extends Phaser.Scene {
    constructor(   
      ) {
      super({ key: 'Game' } );
    }
    
    preload ()
        {
            this.load.image('link', "images/Guerrero1.png");
            this.load.image('rectangle', "images/platform.png");
            this.load.image('link', "images/Gladiador1.png");
        }
    
    create ()
        {           
            //link
            this.link = new Link(this, 300, 300, "link");

            //rectangulos
            this.rectangleBot = new Rectangle(this, 375, 475, "rectangle");
            this.rectangleTop = new Rectangle(this, 375, 125, "rectangle");
            this.rectangleLeft = new Rectangle(this, 200, 300, "rectangle");
            this.rectangleRight = new Rectangle(this, 550, 300, "rectangle");

            //cambiamos escala de los de izquierda y derecha para crear un espacio cerrado
            this.rectangleLeft.setScale(0.12, 5);
            this.rectangleRight.setScale(0.12, 5);
            
            //texto
            this.mytext = this.add.text(100, 50, 'Quedan - colisiones y - segundos');

            this.mytext.setFontSize(20);


            //input
            this.up = this.input.keyboard.addKey('UP');
            this.down = this.input.keyboard.addKey('DOWN');
            this.right = this.input.keyboard.addKey('RIGHT');
            this.left = this.input.keyboard.addKey('LEFT');
            this.space = this.input.keyboard.addKey('SPACE');
            //si fuera solo una pulsacion
            /*this.up.on('down', event => this.MovePlayer("up"));
            this.down.on('down', event => this.MovePlayer("down"));
            this.left.on('down', event => this.MovePlayer("left"));
            this.right.on('down', event => this.MovePlayer("right"));*/

            
            //colisiones
            this.physics.add.collider(this.rectangleBot, this.circle, this.CollidedTB);
            this.physics.add.collider(this.rectangleTop, this.circle, this.CollidedTB);
            this.physics.add.collider(this.rectangleLeft, this.circle, this.CollidedLR);
            this.physics.add.collider(this.rectangleRight, this.circle, this.CollidedLR);       
            this.physics.add.collider(this.circle, this.cross, this.Divide);
            
        }

    
    update(time, delta){
          
        if(textType == "lose"){
            tiempoRestante = 10000;
            textType = "timer";
        }
        
        tiempoRestante -= delta;
        this.ChangeText(textType);    

        if(tiempoRestante <= 0){
            textType = "lose";
            this.ChangeText(textType);
            this.scene.start('Pause');
            this.scene.pause();
        }

        

        //cambiamos pos circulo
        this.circle.x += velocidadX;
        this.circle.y += velocidadY;

        //input
        /*this.up.on('down', event => this.MovePlayer("up"));
        this.down.on('down', event => this.MovePlayer("down"));
        this.left.on('down', event => this.MovePlayer("left"));
        this.right.on('down', event => this.MovePlayer("right"));*/

        if(this.up.isDown){
            this.MovePlayer("up");
        }
        else if(this.down.isDown){
            this.MovePlayer("down");
        }
        else if(this.left.isDown){
            this.MovePlayer("left");
        }
        else if(this.right.isDown){
            this.MovePlayer("right");
        }
    }

    MovePlayer(dir){

        if(dir == "up"){
            this.cross.y -= velocidadJY;
        }
        else if(dir == "down"){
            this.cross.y += velocidadJY;
        }
        else if(dir == "left"){
            this.cross.x -= velocidadJX;
        }
        else if(dir == "right"){
            this.cross.x += velocidadJX;
        }
    }

}