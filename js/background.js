function renderBackground(bitmap){
    level.tileset.forEach(function(tile){
        if(tile.type === "house"){
            bitmap.draw("house_red", tile.x, tile.y, null, null, null, null, null, null, tile.rotation)
        }
    });
}