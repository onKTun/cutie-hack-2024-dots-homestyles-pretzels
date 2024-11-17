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
  player;
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("spaceShip", "assets/spaceShip.png");
  }
  create() {
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setDisplaySize(this.scale.width, this.scale.height);
    this.add.image(512, this.scale.height, "earth").setOrigin(0.5, 1);

    instantiatePlayer(this);
    initDebris(100, this);
  }

  update() {
    this.debris.children.iterate((member) => {
      this.physics.velocityFromAngle(member.angle, 250, member.body.velocity);
      member.setAngularVelocity(40);
    });
  }
}
function instantiatePlayer(context) {
  if (context.player) {
    context.player.destroy();
  }

  context.player = context.add
    .image(375, 550, "spaceShip")
    .setScale(0.03)
    .setInteractive({ draggable: true });

  context.player.on(
    "pointerdown",
    function (pointer, localX, localY, event) {
      context.player.body.setVelocity(10, -100);
    },
    this
  );

  context.physics.world.enable(context.player);
  context.player.body.setCircle(10, 0, 0);
  context.player.body.setCollideWorldBounds(true);
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
    member.body.setCircle(4, 0, 0);
    context.physics.add.overlap(
      context.player,
      context.debris,
      hitPlayer,
      null,
      context
    );
  });
}
function hitPlayer(player, debris) {
  console.log("collided");

  resetPlayer(this);
}

function resetPlayer(context) {
  context.player.setPosition(375, 550);
  context.player.body.setVelocity(0, 0);
}
function cleanUpTrash(count, context) {
  context.debris;
}
