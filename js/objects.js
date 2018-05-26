function renderCams(cams){
    level.objects.forEach(function(object) {
        game.add.image(object.x, object.y, object.type, 0, cams);
    });

}