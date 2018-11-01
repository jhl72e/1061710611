class Main extends Phaser.Scene{
    constructor() {
        super({ key: "Main" })
    }
    preload() {
        this.load.image('bg', 'assets/background.png');
        this.load.image('start', 'assets/startButton.png');
    }
    create() {
        var bg = this.add.sprite(400, 300, 'bg');
        const startButton = this.add.image(400, 300, 'start', { fill: '#0f0' });
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
        this.load.image('bg2', 'assets/background.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('platform', 'assets/platform.png');
    }
create() {
        this.matter.world.setBounds() // 월드 끝 충돌시 튕김
        var bg1 = this.add.sprite(400, 300, 'bg');
        var bg2 = this.add.sprite(400,-300,'bg2');
        this.platform = this.matter.add.image(300,650,'platform').setScale(0.2);
        this.platform.setFixedRotation();
       // this.cameras.main.startFollow(this.platform);
        var player = this.matter.add.image(200, 200,'player').setScale(0.1);
        // var text = this.add.text(100, 0, 'Phaser 3', { font: '32px Arial', fill: '#00ff00' });
        // var text = this.matter.add.gameObject(text, { shape: { type: 'polygon', sides: 8, radius: 64 } }).setFrictionAir(0.01);

        // for (var i = 0; i < 5; i++) {
        //     var group = this.matter.world.nextGroup(true); // 그룹
        //     var ring = this.matter.add.stack(10, 200, 10, 1, 0, 0, function (x, y) { // 시작지점좌표xy,개수,몰라,마진xy
        //         return Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 40, 40, { // 좌표xy,크기
        //             //collisionFilter: { group: group }, // 충돌 무시 여부
        //             chamfer: 5, // border radius
        //             density: 0.005, // 밀도
        //             frictionAir: 0.05, // 공기저항
        //         });
        //     });
        //     this.matter.add.chain(ring, 0.5, 0, -0.5, 0, { //체인생성 xy xy
        //         stiffness: 1, // 날카로움?
        //         length: 0, // 길이?
        //         render: { // 나도몰라
        //             visible: false
        //         }
        //     });
        // }
        this.matter.add.mouseSpring(); // 마우스로 당기면 움직임
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
            debug: true,
            gravity: {
                y: 1
            },
        }
    },
    scene: [Main,Game],
    backgroundColor: '#124184'
};


let game = new Phaser.Game(config);