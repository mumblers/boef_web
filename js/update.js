TOTAL_DETECTION_TIME = 240;

function update() {
    this.time++;

    if (this.detected) {
        this.detectRender--;
        if (this.detectRender <= 0) {
            this.detected = false;
            this.detectedText.visible = false;
        }
    }

    game.physics.arcade.collide(this.player, this.houses);
    game.physics.arcade.collide(this.player, this.goals, finishGame, null, this);

    let seen = false;
    this.cams.forEach(function(cam) {
        var ray = new Phaser.Line(cam.x + (cam.width / 2), cam.y + (cam.height / 2), this.player.x, this.player.y);

        // Test if any walls intersect the ray
        var intersect = getWallIntersection(this, ray);

        if (intersect || ray.length > 500) {
            cam.tint = 0xffffff;
            if (cam.spotting > 0) {
                cam.spotting--;
            } else {
                cam.hintCircle.visible = false;
            }
        } else {
            cam.tint = 0xffaaaa;
            cam.spotting = 20;
            cam.hintCircle.visible = true;

            if (!seen) {
                if (this.detectedTime++ > TOTAL_DETECTION_TIME) {
                    failGame(this);
                }
                this.detected = true;
                this.detectRender = 20;
                this.detectedText.visible = true;
                seen = true;
            }
        }
    }, this);

    this.cams.forEach(function (camera) {

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

function calcScore(state) {
    // console.log(state.time);
    // console.log(state.detectedTime);
    // console.log((10000 - state.time) * 2 - (state.detectedTime * 50));
    return Math.max(0, (10000 - state.time) * 2 - (state.detectedTime * 50));
}

function finishGame() {
    if (this.done) {
        return;
    }
    let calcScore1 = calcScore(this);
    console.log(calcScore1);
    window.location.href = "result-ok.html?score=" + calcScore1;
    this.done = true;
}

function failGame(state) {
    if (state.done) {
        return;
    }
    window.location.href = "result-jammer.html";
    this.done = true;
}