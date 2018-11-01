
var config = {

    type: Phaser.AUTO,

    width: 1280,

    height: 720,

    physics: {

        default: 'matter',

        matter: {

            debug: true,

            gravity: {

                y: 0

            },

            debugBodyColor: 0xffffff

        }

    },

    scene: [Main],

};

var Main = {

    preload() {

        this.load.image('box', 'assets/box.png');
        this.load.image('background', 'assets/background.png');

    },

    create() {

        this.matter.world.setBounds(0, 0, 1920, 1920) // 월드 끝 충돌시 튕김

        this.box = this.matter.add.image(200, 200,'box').setScale(0.1)

        this.box.setFrictionAir(0.1)

        this.box.setFixedRotation();

        this.cameras.main.startFollow(this.box)

        this.matter.add.mouseSpring(); // 마우스로 당기면 움직임

        


        this.cursors = this.input.keyboard.createCursorKeys();

    },

    update() {

        if (this.cursors.up.isDown) {

            this.box.thrust(0.01);

        }

        else if (this.cursors.down.isDown) {

            this.box.thrustBack(0.01);

        }



        if (this.cursors.left.isDown) {

            this.box.setAngularVelocity(-0.1)

        }

        else if (this.cursors.right.isDown) {

            this.box.setAngularVelocity(0.1);

        }

        

    }

}



let game = new Phaser.Game(config);