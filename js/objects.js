function renderCams(poles, cams){

    level.objects.forEach(function(object) {
        if (object.type === "camera_pole") {
            game.add.image(object.x, object.y, object.type, 0, poles);
        } else {
            game.add.image(object.x, object.y, object.type, 0, cams);
        }
    });
}

function renderGoals(goals){
    //alle plekken aan de zijkand van het scherm een goal toevoegen op wegen.
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