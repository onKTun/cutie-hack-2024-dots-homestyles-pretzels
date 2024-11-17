import { Scene } from "phaser";

export class UI extends Scene {
  constructor() {
    super("UI");
  }

  create() {
    let year = 2100;
    let money = 0;
    let score = 0;

    let junkCount = 0;

    // Header
    let rect1 = this.add.rectangle(
      this.scale.width / 2,
      80,
      this.scale.width,
      200,
      "0x0B1A33",
      1
    );

    //sub menu
    let rect2 = this.add.rectangle(
      this.scale.width / 2,
      250,
      this.scale.width,
      140,
      "0x3C4D6A",
      1
    );

    this.scene.launch("Game");

    // Dropdown Menu Open Button
    const buttonDown = this.add.graphics();
    buttonDown.fillStyle(0x0b1a33, 1);
    buttonDown.fillRect(this.scale.width / 2 - 158 / 2, 180, 158, 57);
    buttonDown.lineStyle(2, 0xffffff, 1);
    buttonDown.strokeRect(this.scale.width / 2 - 158 / 2, 180, 158, 57);
    let dropdownArrow = this.add.image(
      this.scale.width / 2,
      205,
      "dropdownIcon"
    );
    dropdownArrow.setScale(0.3);
    const buttonContainer = this.add.container(this.scale.width / 2, 205);
    buttonContainer.setSize(158, 57);
    buttonContainer.setInteractive({ useHandCursor: true });

    // Dropdown Menu Close Button
    const buttonClose = this.add.graphics();
    buttonClose.fillStyle(0x0b1a33, 1);
    buttonClose.fillRect(this.scale.width / 2 - 158 / 2, 349 - 57 / 2, 158, 57);
    buttonClose.lineStyle(2, 0xffffff, 1);
    buttonClose.strokeRect(
      this.scale.width / 2 - 158 / 2,
      349 - 57 / 2,
      158,
      57
    );
    let closeArrow = this.add.image(this.scale.width / 2, 349, "closeArrow");
    closeArrow.setScale(0.3);
    const buttonContainerTwo = this.add.container(this.scale.width / 2, 350);
    buttonContainerTwo.setSize(158, 57);
    buttonContainerTwo.setInteractive({ useHandCursor: true });

    buttonContainer.on("pointerdown", () => {
      console.log("Button clicked!");
      buttonDown.visible = false;
      dropdownArrow.visible = false;
      buttonClose.visible = true;
      closeArrow.visible = true;

      buttonClose.visible = true;
      closeArrow.visible = true;
      spacecraftText.visible = true;
      spaceshipButton.visible = true;
      spaceshipText.visible = true;
      satelliteButton.visible = false;
      satelliteText.visible = false;
      junkRemovalText.visible = true;
      netButton.visible = true;
      netText.visible = true;
      magnetButton.visible = true;
      magnetText.visible = true;
      emText.visible = true;
      emButton.visible = true;
      rect2.visible = true;
    });

    buttonContainerTwo.on("pointerdown", () => {
      console.log("Button clicked!");
      buttonDown.visible = true;
      dropdownArrow.visible = true;
      buttonClose.visible = false;
      closeArrow.visible = false;

      buttonClose.visible = false;
      closeArrow.visible = false;
      spacecraftText.visible = false;
      spaceshipButton.visible = false;
      spaceshipText.visible = false;
      satelliteButton.visible = false;
      satelliteText.visible = false;
      junkRemovalText.visible = false;
      netButton.visible = false;
      netText.visible = false;
      magnetButton.visible = false;
      magnetText.visible = false;
      emText.visible = false;
      emButton.visible = false;
      rect2.visible = false;
    });

    //sub-menu
    let spacecraftText = this.add
      .text(this.scale.width / 5, 215, "Spacecraft", { fontSize: 20 })
      .setOrigin(0.5, 0.5);
    let junkRemovalText = this.add
      .text(this.scale.width / 1.32, 215, "Junk Removal", { fontSize: 20 })
      .setOrigin(0.5, 0.5);

    //spacecraft buttons
    const spaceshipButton = this.add.graphics();
    spaceshipButton.fillStyle(0x0b1a33, 1);
    spaceshipButton.fillRect(50, 270 - 37 / 2, 120, 50);
    const spaceshipContainer = this.add.container(110, 275);
    spaceshipContainer.setSize(120, 50);
    spaceshipContainer.setInteractive({ useHandCursor: true });
    let spaceshipText = this.add
      .text(110, 275, "Spaceship", { fontSize: 16 })
      .setOrigin(0.5, 0.5);
    spaceshipContainer.on("pointerdown", () => {
      this.events.emit("launch");
    });

    const satelliteButton = this.add.graphics();
    satelliteButton.fillStyle(0x0b1a33, 1);
    satelliteButton.fillRect(240, 270 - 37 / 2, 120, 50);
    const satelliteContainer = this.add.container(300, 275);
    satelliteContainer.setSize(120, 50);
    satelliteContainer.setInteractive({ useHandCursor: true });
    let satelliteText = this.add
      .text(300, 275, "Satellite", { fontSize: 16 })
      .setOrigin(0.5, 0.5);

    //Junk Removal Buttons
    const netButton = this.add.graphics();
    netButton.fillStyle(0x0b1a33, 1);
    netButton.fillRect(560, 270 - 37 / 2, 120, 50);
    const netContainer = this.add.container(660, 275);
    netContainer.setSize(120, 50);
    netContainer.setInteractive({ useHandCursor: true });
    let netText = this.add
      .text(620, 275, "Net", { fontSize: 16 })
      .setOrigin(0.5, 0.5);

    netContainer.on("pointerdown", () => {
      this.events.emit("10");
    });

    const magnetButton = this.add.graphics();
    magnetButton.fillStyle(0x0b1a33, 1);
    magnetButton.fillRect(720, 270 - 37 / 2, 120, 50);
    const magnetContainer = this.add.container(780, 275);
    magnetContainer.setSize(120, 50);
    magnetContainer.setInteractive({ useHandCursor: true });
    let magnetText = this.add
      .text(780, 275, "Magnet", { fontSize: 16 })
      .setOrigin(0.5, 0.5);

    magnetContainer.on("pointerdown", () => {
      this.events.emit("20");
    });

    const emButton = this.add.graphics();
    emButton.fillStyle(0x0b1a33, 1);
    emButton.fillRect(880, 270 - 37 / 2, 120, 50);
    const emContainer = this.add.container(940, 275);
    emContainer.setSize(120, 50);
    emContainer.setInteractive({ useHandCursor: true });
    let emText = this.add
      .text(940, 275, "E.M.", { fontSize: 16 })
      .setOrigin(0.5, 0.5);

    emContainer.on("pointerdown", () => {
      this.events.emit("30");
    });

    // Title
    let year1 = this.add
      .text(this.scale.width / 2, 75, year, { fontSize: 64 })
      .setOrigin(0.5, 0.5);
    let money1 = this.add
      .text(this.scale.width / 2, 125, "$" + money, { fontSize: 36 })
      .setOrigin(0.5, 0.5);

    // Goal Progress
    let spaceProgress = this.add
      .text(this.scale.width / 1.25, 75, "Spaceships landed: ", {
        fontSize: 24,
      })
      .setOrigin(0.5, 0.5);
    let spaceProgressNumber = this.add
      .text(this.scale.width / 1.25, 110, score + "/1", { fontSize: 24 })
      .setOrigin(0.5, 0.5);

    // Space Junk numbers
    let spaceJunkImg = this.add.image(60, 90, "spaceJunkIcon");
    spaceJunkImg.setScale(0.2);
    let spaceJunk1 = this.add
      .text(this.scale.width / 4.1, 90, "\nSpace Junk: " + junkCount, {
        fontSize: 20,
      })
      .setOrigin(0.5, 0.5);

    buttonClose.visible = false;
    closeArrow.visible = false;
    spacecraftText.visible = false;
    spaceshipButton.visible = false;
    spaceshipText.visible = false;
    satelliteButton.visible = false;
    satelliteText.visible = false;
    junkRemovalText.visible = false;
    netButton.visible = false;
    netText.visible = false;
    magnetButton.visible = false;
    magnetText.visible = false;
    emText.visible = false;
    emButton.visible = false;
    rect2.visible = false;

    //events
    const game = this.scene.get("Game");
    game.events.on(
      "removeDebris",
      function () {
        junkCount--;

        spaceJunk1.setText("\nSpace Junk: " + junkCount);
      },
      this
    );

    game.events.on(
      "cleanupCost",
      function () {
        console.log("money");
        money += 6000;
        money1.setText("$" + money);
      },
      this
    );

    game.events.on(
      "more",
      function () {
        junkCount = junkCount + 1;

        spaceJunk1.setText("\nSpace Junk: " + junkCount);
      },
      this
    );

    // function spaceshipAdd(score)
    // {
    //   info.setText(`Score: ${this.score}`);
    //     }

    // function lvlOneRmv(junkLvl1)
    // {
    //   spaceJunk1 = this.add.text(this.scale.width/4.75, 90, "Space Junk Lvl 1: " + junkLvl1 + "\nSpace Junk Lvl 2: " + junkLvl2, {fontSize: 24}).setOrigin(0.5, 0.5);
    // }
    // function lvlTwoRmv(junkLvl2){
    //   spaceJunk1 = this.add.text(this.scale.width/4.75, 90, "Space Junk Lvl 1: " + junkLvl1 + "\nSpace Junk Lvl 2: " + junkLvl2, {fontSize: 24}).setOrigin(0.5, 0.5);
    // }
  }
}
