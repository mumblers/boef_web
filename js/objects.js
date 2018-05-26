function renderCams(cams){
    level.objects.forEach(function(object) {
        game.add.image(object.x, object.y, object.type, 0, cams);
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