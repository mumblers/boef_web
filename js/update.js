function update() {

    game.physics.arcade.collide(this.player, this.houses);
    game.physics.arcade.collide(this.player, this.goals, finishGame);

    // this.bitmap.clear();
    var play = this.player;
    this.cams.forEach(function(cam) {
        var ray = new Phaser.Line(cam.x + (cam.width / 2), cam.y + (cam.height / 2), play.x, play.y);

        // Test if any walls intersect the ray
        var intersect = getWallIntersection(this, ray);

        if (intersect || ray.length > 500) {
            // A wall is blocking this persons vision so change them back to their default color
            cam.tint = 0xffffff;
        } else {
            // This person can see the ball so change their color
            cam.tint = 0xffaaaa;

        }
    }, this);


    var moveX = false;
    var moveY = false;

    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.player.body.velocity.x = -this.MAX_SPEED;
        moveX = true;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.player.body.velocity.x = this.MAX_SPEED;
        moveX = true;
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.player.body.velocity.y = -this.MAX_SPEED;
        moveY = true;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.player.body.velocity.y = this.MAX_SPEED;
        moveY = true;
    }

    if (moveToPoint(game.input.activePointer, this.player)) {
        moveX = true;
        moveY = true;
    }

    if (!moveX) {
        this.player.body.velocity.x = 0;
    }

    if (!moveY) {
        this.player.body.velocity.y = 0;
    }
}


function moveToPoint(pointer, player) {
    if (pointer.isDown && game.math.distance(player.x, player.y, pointer.worldX, pointer.worldY) > 20) {
        //  400 is the speed it will move towards the mouse
        game.physics.arcade.moveToPointer(player, game.MOUSE_MOVE_SPEED, pointer);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(player.body, pointer.x, pointer.y)) {
            player.body.velocity.setTo(0, 0);
        }
        return true;
    }
    return false;
}

function getWallIntersection(gameState, ray) {
    var distanceToWall = Number.POSITIVE_INFINITY;
    var closestIntersection = null;

    // For each of the walls...
    gameState.houses.forEach(function(h) {
        var house = h.body;
        // Create an array of lines that represent the four edges of each wall
        var lines = [
            new Phaser.Line(house.x, house.y, house.x + house.width, house.y),
            new Phaser.Line(house.x, house.y, house.x, house.y + house.height),
            new Phaser.Line(house.x + house.width, house.y,
                house.x + house.width, house.y + house.height),
            new Phaser.Line(house.x, house.y + house.height,
                house.x + house.width, house.y + house.height)
        ];

        // Test each of the edges in this wall against the ray.
        // If the ray intersects any of the edges then the wall must be in the way.
        for(var i = 0; i < lines.length; i++) {
            var intersect = Phaser.Line.intersects(ray, lines[i]);
            if (intersect) {
                // Find the closest intersection
                distance =
                    game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                if (distance < distanceToWall) {
                    distanceToWall = distance;
                    closestIntersection = intersect;
                }
            }
        }
    }, gameState);

    return closestIntersection;
}

function finishGame(){
    window.location.href = "result-ok.html"
}