function renderCams(cams){
    level.objects.forEach(function(object) {
        game.add.image(object.x, object.y, object.type, 0, cams);
    });

    level.tiles.forEach(function(object) {
        if (object.type === "street") {
            if (   object.x === 0 || object.x*128 === this.world.width
                || object.y === 0 || object.y*128 === this.world.height) {
                game.add.image(object.x*128, object.y*128, "goal", 0, cams);
            }
        }
    });
}