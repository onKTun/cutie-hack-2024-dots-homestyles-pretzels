import { Scene } from "phaser";
import {
  getCentripetalAccelerationComponents,
  getCentripetalAccelerationFromVelocity,
  getCircularVelocity,
  getThetaFromPosition,
  getVelocityComponents,
  getVelocityFromAngularVelocity,
} from "../utils/physics-utils";

export class Game extends Scene {
  debris;
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("spaceShip", "assets/spaceShip.png");
  }
  create() {
    this.physics.world.gravity.y = 0;

    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setDisplaySize(this.scale.width, this.scale.height);

    this.add.image(512, this.scale.height, "earth").setOrigin(0.5, 1);

    const player = this.add
      .image(375, 550, "spaceShip")
      .setScale(0.03)
      .setInteractive();

    this.physics.world.enable(player);

    //player.body.setVelocity(0,0);
    //player.body.setBounce(0.8);
    player.body.setCollideWorldBounds(true);

    let dragging = false;
    let initialPosition = this.player.getCenter();
    const releaseVelocity = new Phaser.Math.Vector2(0, 0);
  }

  isMoving() {
    if (dragging == true) {
    }
  }

  update() {
    this.debris.children.iterate((member) => {
      this.physics.velocityFromAngle(member.angle, 250, member.body.velocity);
      member.setAngularVelocity(40);
    });
  }
}

function initDebris(count, context) {
  context.debris = context.physics.add.group();
  for (let index = 0; index < count; index++) {
    const angle = Phaser.Math.FloatBetween(0, 2 * Math.PI);
    const magnitude = Phaser.Math.Between(300, 400);
    const randX = magnitude * Math.cos(angle);
    const randY = magnitude * Math.sin(angle);
    //console.log(`randX: ${randX}, randY: ${randY}`);

    context.debris
      .create(randX, randY, "satellite")
      .setScale(2)
      .refreshBody()
      .setRotation(angle - Math.PI * 1.5);
  }
  //angle + (Math.PI + Math.PI / 2)
  const container = context.add.container(
    context.scale.width / 2,
    context.scale.height
  );

  context.debris.children.iterate((member) => {
    container.add(member);
    context.physics.world.enable(member);
  });
}
