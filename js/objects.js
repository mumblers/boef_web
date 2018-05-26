function renderCams(poles, cams, goals){

    level.objects.forEach(function(object) {
        if (object.type === "camera_pole") {
            game.add.image(object.x, object.y, object.type, 0, poles);
        } else if (object.type === "goal" ) {
            var sp = game.add.sprite(object.x, object.y, 'goal', null, goals);
            game.physics.enable(sp, Phaser.Physics.ARCADE);
            // sp.body.setSize(object.width, object.height);
            sp.body.immovable = true;
        } else {
            game.add.image(object.x, object.y, object.type, 0, cams);
        }
    });

    console.log(level);

    //alle plekken aan de zijkand van het scherm een goal toevoegen op wegen.
    level.tileset.forEach(function(object) {
        if (object.type === "street") {
            if (   object.x === 0 || object.x === level.width
                || object.y === 0 || object.y === level.height) {
                game.add.image(object.x*128, object.y*128, "goal", 0, cams);
            }
        }
    });
}