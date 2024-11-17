import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload(){
    this.load.image("spaceShip", "assets/spaceShip.png");
  }
  create() {

    this.physics.world.gravity.y = 0;

    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setDisplaySize(this.scale.width, this.scale.height);

    this.add.image(500, 100, "satellite").setScale(2);

    this.add.image(512, this.scale.height, "earth").setOrigin(0.5, 1);
    this.add.image(750, 200, "moon").setScale(0.2);
    
    const player = this.add.image(375, 550, "spaceShip").setScale(0.03).setInteractive();

    
    this.physics.world.enable(player);
    
   
    
    
    player.body.setCollideWorldBounds(true);

    
  
    
  }

  isMoving(){
    if (dragging == true){

    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
    height: 600,
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },  // Gravity applied in the Y direction
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

