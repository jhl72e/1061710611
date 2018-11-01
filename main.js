

class Main extends Phaser.Scene {
    constructor() {
        super({ key: "Main" })
    }
    preload() {
        this.load.image('bg', 'assets/background.png');
        this.load.image('start', 'assets/startButton.png');
        this.load.image('title', 'assets/title.png');
    }
    create() {
        var bg = this.add.sprite(400, 300, 'bg');
        const startButton = this.add.sprite(400, 400, 'start', { fill: '#0f0' });
        var title = this.add.sprite(400, 100, 'title');
        startButton.setInteractive();
        startButton.on('pointerdown', () => this.scene.start('Game'));

    }
    update() {

    }
}

var score = 0;
var scoreText;

class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" })
    }
    preload() {

        this.load.image('box', 'assets/box.png');
        this.load.image('bg', 'assets/background.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('platform', 'assets/platform.png');
    }
    create() {
        this.matter.world.setBounds(0, 0, 800, 10000) // 월드 끝 충돌시 튕김
        this.cameras.main.setBounds(0, 0, 800, 10000);
        var bg1 = this.add.sprite(400, 4950, 'bg');
        var canDrag = this.matter.world.nextGroup();
        this.platform = this.matter.add.image(300, 9900, 'platform').setScale(0.2).setBounce(3).setCollisionGroup(canDrag).setMass(10);
        this.platform.setFixedRotation();
        this.platform.setIgnoreGravity(true)


        var player = this.matter.add.image(200, 9000, 'player').setScale(0.1).setMass(0.5);
        player.setBody({
            type: 'circle',
            radius: 24
        }).setBounce(2);
        this.player = player
        this.cameras.main.startFollow(player);
        //player.setIgnoreGravity(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.i = 0;
    }
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-10);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(10);
        }
        else {
            this.player.setVelocityX(0);
        }

        // if (this.cursors.up.isDown) {
        //     this.player.setVelocityY(-10);
        // }
        // else if (this.cursors.down.isDown) {
        //     this.player.setVelocityY(10);
        // }
        this.platform.setVelocity(((this.cameras.main.midPoint.x)+Math.sin(this.i/20)*300)-this.platform.x,((this.cameras.main.midPoint.y + 200) - this.platform.y))
        this.i++

        // if(this.player.y<=0)
        // {
        //     this.scene.start('Ending');
        // }
        // else if(this.player.x<=0)
        // {
        //     this.scene.start('Ending');
        // }
        // else if(this.player.x>=800)
        // {
        //     this.scene.start('Ending');
        // }
        var sc = this
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if(bodyA.id == 6)
            {
                sc.scene.start('Ending')
            }
        });
    }
}

class Ending extends Phaser.Scene {
    constructor() {
        super({ key: "Ending" })
    }
    preload() {
        this.load.image('bg', 'assets/background.png');
        this.load.image('restart', 'assets/restart.png');
        this.load.image('title', 'assets/title.png');
    }
    create() {
        var bg = this.add.sprite(400, 200, 'bg');
        const startButton = this.add.sprite(400, 400, 'restart', { fill: '#0f0' });
        var title = this.add.sprite(400, 100, 'title'); 
        startButton.setInteractive();
        startButton.on('pointerdown', () => this.scene.start('Main'));
    }
    update() {
    }
}


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: {
                y: 1
            },
        }
    },
    scene: [Main, Game,Ending],
    backgroundColor: '#124184'
};



let game = new Phaser.Game(config);