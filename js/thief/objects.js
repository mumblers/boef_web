function renderCams(poles, cams){

    level.objects.forEach(function(object) {
        if (object.type === "camera_pole") {
            game.add.image(object.x, object.y, object.type, 0, poles);
        } else if (object.type.startsWith("camera")) {
            var cam = game.add.image(object.x, object.y, object.type, 0, cams);
            var graphics = game.add.graphics(0, 0);
            graphics.lineStyle(3, 0xff0000, 1);
            graphics.drawCircle(cam.x + cam.width / 2, cam.y + cam.height / 2, 40);
            graphics.visible = false;
            cam.hintCircle = graphics;
        }
    });
}

function renderGoals(goals){
    //alle plekken aan de zijkant van het scherm een goal toevoegen op wegen.
    level.tileset.forEach(function(object) {
        if (object.type === "street") {
            if (   object.x === 0 || object.x === level.width-1
                || object.y === 0 || object.y === level.height-1) {
                var sp = game.add.sprite(object.x*level.scale, object.y*level.scale, 'goal', null, goals);
                game.physics.enable(sp, Phaser.Physics.ARCADE);
                sp.body.immovable = true;
            }
        }
    });
}