import { Scene } from "phaser";

export class IntroSequence extends Scene{
    constructor (){
        super("IntroSequence");
    }

    preload() {
        // Load the font using WebFontLoader
        this.load.script('webfont', 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js');

        
    }
 
    create(){

        
        
        this.add
        .image(this.scale.width / 2, this.scale.height / 2, "background")
        .setDisplaySize(this.scale.width, this.scale.height);


        this.load.script('webfont', 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js');

        WebFont.load({
            google: {
                families: ['Space Grotesk', 'Space Mono'] // Add font families here
            },
            active: () => {

                this.add
                .text(512, 100, "Junk Joyride", {
                fontFamily: "Space Grotesk",
                fontSize: 50,
                color: "#ffffff",
                align: "center",
                }).setOrigin(0.5);

                const paragraphText = "You oversee all space expedition on earth, your goal is to send 100 spaceships to the moon. Money is not an issue, time is not an issue, your issue is the excessive amount of space trash accumulated since we started to explore space. Navigate this issue and find a new beginning for humanity.";
                
                this.add        
                .text(512, 350, paragraphText, {
                fontFamily: "Space Grotesk",
                fontSize: 30,
                wordWrap: { width: 800 },
                color: "#FFAC0C",
                align: "center",
                }).setOrigin(0.5);

                
                const button = this.add.rectangle(512, 600, 350, 50, 0x20547C).setInteractive();
                this.add
                .text(512, 600, "BEGIN YOUR MISSION",
                {
                    fontFamily: "Space Grotesk",
                    fontSize: 30,
                    color: "#ffffff", 
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                }).setOrigin(0.5);

                button.on("pointerdown", ()=> {
                    this.scene.start("Game");
                });
            }
        });

        
        

        
    }
}