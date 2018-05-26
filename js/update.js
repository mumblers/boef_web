function update() {

    game.physics.arcade.collide(this.player, this.houses);

    // Move the ball to the pointer/touch location
    // part 3 ignore this

    // Clear the bitmap where we are drawing our lines
    // this.bitmap.context.clearRect(0, 0, this.world.width, this.world.height);

    // Ray casting!
    // Test if each person can see the ball by casting a ray (a line) towards the ball.
    // If the ray intersects any walls before it intersects the ball then the wall
    // is in the way.

    var play = this.player;
    this.people.forEach(function(person) {
        // Define a line that connects the person to the ball
        // This isn't drawn on screen. This is just mathematical representation
        // of a line to make our calculations easier. Unless you want to do a lot
        // of math, make sure you choose an engine that has things like line intersection
        // tests built in, like Phaser does.
        var ray = new Phaser.Line(person.x, person.y, play.x, play.y);

        // Test if any walls intersect the ray
        var intersect = getWallIntersection(this, ray);

        if (intersect) {
            // A wall is blocking this persons vision so change them back to their default color
            person.tint = 0xffffff;
        } else {
            // This person can see the ball so change their color
            person.tint = 0xffaaaa;
        }
    }, this);


    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.player.body.velocity.x = -this.MAX_SPEED;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.player.body.velocity.x = this.MAX_SPEED;
    } else {
        this.player.body.velocity.x = 0;
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.player.body.velocity.y = -this.MAX_SPEED;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.player.body.velocity.y = this.MAX_SPEED;
    } else {
        this.player.body.velocity.y = 0;
    }

    if (!moveToPoint(game.input.activePointer, this.player)) {
        this.player.body.velocity.setTo(0, 0);
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
    gameState.walls.forEach(function(wall) {
        // Create an array of lines that represent the four edges of each wall
        var lines = [
            new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
            new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
            new Phaser.Line(wall.x + wall.width, wall.y,
                wall.x + wall.width, wall.y + wall.height),
            new Phaser.Line(wall.x, wall.y + wall.height,
                wall.x + wall.width, wall.y + wall.height)
        ];

        // Test each of the edges in this wall against the ray.
        // If the ray intersects any of the edges then the wall must be in the way.
        for(var i = 0; i < lines.length; i++) {
            var intersect = Phaser.Line.intersects(ray, lines[i]);
            if (intersect) {
                // Find the closest intersection
                distance =
                    gameState.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                if (distance < distanceToWall) {
                    distanceToWall = distance;
                    closestIntersection = intersect;
                }
            }
        }
    }, gameState);

    return closestIntersection;
}