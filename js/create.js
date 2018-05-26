function create () {

    this.world.setBounds(0, 0, 2000, 2000);

    // Set stage background color
    this.game.stage.backgroundColor = 0x4488cc;

    // Create a bitmap texture for drawing lines
    this.bitmap = this.game.add.bitmapData(this.world.width, this.world.height);
    renderBackground(this.bitmap, this);
    this.game.add.image(0, 0, this.bitmap);

    this.cams = this.game.add.group();
    this.poles = this.game.add.group();
    this.goals = this.game.add.group();
    renderCams(this.poles, this.cams, this.goals);

    // Build some walls. These will block line of sight.

    // Place some people in random locations
    // Add the ball
    this.player = this.game.add.sprite(this.game.width/2, this.game.height/2, 'boef');

    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;

    // Define movement constants
    this.MAX_SPEED = 500; // pixels/second

    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);

    this.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    // this.camera.deadzone = new Phaser.Rectangle(50, 50, 50, 50);
    this.camera.focusOnXY(0, 0);

    game.input.addPointer();

    game.MOUSE_MOVE_SPEED = 250;

    //used to not have to deal with multi touch and just use the last one
    game.input.MAX_POINTERS = 1;

    game.time.advancedTiming = true;
}