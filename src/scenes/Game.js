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
  collisionCount;
  canOverlap;

  constructor() {
    super("Game");
    this.collisionCount = 0;
    this.canOverlap = true;
  }

  preload() {
    this.load.image("spaceShip", "assets/spaceShip.png");
  }
  create() {
    this.debris = this.physics.add.group();
    this.sound.play("music", {
      loop: true, // Set whether the sound should loop
    });
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setDisplaySize(this.scale.width, this.scale.height);
    this.add.image(512, this.scale.height, "earth").setOrigin(0.5, 1);

    instantiatePlayer(this);
    initDebris(100, this);

    const ourGame = this.scene.get("UI");
    //  Listen for events from it
    ourGame.events.on(
      "10",
      function () {
        cleanUpTrash(10, this);
      },
      this
    );
    ourGame.events.on(
      "20",
      function () {
        cleanUpTrash(20, this);
      },
      this
    );
    ourGame.events.on(
      "30",
      function () {
        cleanUpTrash(30, this);
      },
      this
    );

    const topCollider = this.physics.add
      .staticImage(0, 100, null)
      .setDisplaySize(this.scale.width, 10);
    topCollider.body.setSize(this.scale.width, 10);

    this.physics.add.overlap(this.player, topCollider, () => {
      console.log("Player collided with top collider");
      this.scene.start("GameOver");
      // Add any additional logic for when the player collides with the top collider
    });
  }

  update() {
    this.debris.children.iterate((member) => {
      this.physics.velocityFromAngle(member.angle, 250, member.body.velocity);
      member.setAngularVelocity(40);
    });
    if (this.debris.getChildren().length > 200) {
      this.scene.start("GameOver");
    }
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
  const game = context.scene.get("UI");
  game.events.on(
    "launch",
    function () {
      context.player.body.setVelocity(10, -100);
    },
    this
  );

  context.physics.world.enable(context.player);
  context.player.body.setCircle(500, 250, 500);
  context.player.body.setCollideWorldBounds(true);
}

function initDebris(count, context) {
  for (let index = 0; index < count; index++) {
    const angle = Phaser.Math.FloatBetween(0, 2 * Math.PI);
    const magnitude = Phaser.Math.Between(300, 400);
    const randX = magnitude * Math.cos(angle);
    const randY = magnitude * Math.sin(angle);
    //console.log(`randX: ${randX}, randY: ${randY}`);
    context.events.emit("more");
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
  if (this.canOverlap) {
    this.canOverlap = false; // Prevent further overlap triggers

    console.log("collided");
    resetPlayer(this);
    this.collisionCount++;
    this.sound.play("boom");

    initDebris(10, this);
    // Reset the flag after a delay (e.g., 1 second)
    this.time.delayedCall(1000, () => {
      this.canOverlap = true; // Allow overlap again after the delay
    });
  }
}

function resetPlayer(context) {
  context.player.setPosition(375, 550);
  context.player.body.setVelocity(0, 0);
}
function cleanUpTrash(count, context) {
  let removedCount = 0;
  context.debris.children.iterate((member) => {
    if (removedCount < count) {
      member.destroy();
      context.events.emit("removeDebris");
      context.events.emit("cleanupCost");

      removedCount++;
    }
  });
}
