function create () {

    this.world.setBounds(0, 0, 2000, 2000);

    //part 1 dragging logo
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'road_crossing');
    logo.anchor.setTo(0.5, 0.5);

    logo.inputEnabled = true;
    logo.input.enableDrag();

    //part 2 add raycast

    // Set stage background color
    this.game.stage.backgroundColor = 0x4488cc;

    // Create a bitmap texture for drawing lines
    this.bitmap = this.game.add.bitmapData(this.world.width, this.world.height);
    renderBackground(this.bitmap);
    this.game.add.image(0, 0, this.bitmap);

    // Build some walls. These will block line of sight.
    var NUMBER_OF_WALLS = 0;
    this.walls = this.game.add.group();
    var i, x, y;
    for(i = 0; i < NUMBER_OF_WALLS; i++) {
        x = i * this.game.width/NUMBER_OF_WALLS + 50;
        y = this.game.rnd.integerInRange(50, this.game.height - 200);
        this.game.add.image(x, y, 'block', 0, this.walls).scale.setTo(3, 3);
    }

    // Place some people in random locations
    var NUMBER_OF_PEOPLE = 6;
    this.people = this.game.add.group();
    for(i = 0; i < NUMBER_OF_PEOPLE; i++) {
        // Choose a random location on the screen
        x = this.game.rnd.integerInRange(32, this.game.width - 32);
        y = this.game.rnd.integerInRange(32, this.game.height - 32);

        // Create a person
        var person = this.game.add.sprite(x, y, 'boef');

        // Set the pivot point of the person to the center of the texture
        person.anchor.setTo(0.5, 0.5);

        // Add the person to the people group
        this.people.add(person);
    }

    // Add the ball
    this.player = this.game.add.sprite(this.game.width/2, this.game.height/2, 'politie');

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