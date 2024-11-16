import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setDisplaySize(this.scale.width, this.scale.height);

    this.add.image(500, 100, "satellite").setScale(2);

    this.add.image(512, this.scale.height, "earth").setOrigin(0.5, 1);
  }
}
