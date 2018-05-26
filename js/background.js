function renderBackground(bitmap, state){
    var w = level.width / SCALE;
    var h = level.height / SCALE;

    level.tileset = level.tileset.map(function(tile) {
        tile.gridX = tile.x / SCALE;
        tile.gridY = tile.y / SCALE;
        return tile;
    });

    var roads = new Array(w);
    for(var x = 0; x < w; x++){
        roads[x] = [];
        for(var y = 0; y < h; y++){
            roads[x][y] = null;
        }
    }

    state.houses = game.add.group();
    var houses = state.houses;

    level.tileset.forEach(function(tile){
        if(tile.type === "street"){
            roads[tile.gridX][tile.gridY] = tile;
        }

        if (tile.type === "house") {
            this.sprite = game.add.sprite(tile.x, tile.y, null, null, houses);
            game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.sprite.body.setSize(SCALE, SCALE);
            this.sprite.body.immovable = true;
        }
    });

    level.tileset.forEach(function(tile){
        if(tile.type === "house"){
            bitmap.copy("house_red", 0, 0, null, null, tile.x, tile.y, null, null, Math.radians(tile.rotation))
        }else if(tile.type === "street"){
            var ding = getParts(roads, tile);
            bitmap.copy(ding.typ, 0, 0, SCALE, SCALE, tile.x+SCALE/2, tile.y+SCALE/2, SCALE, SCALE, Math.radians(ding.ori), 0.5, 0.5)
        }
    });
    console.log(level);
}

function getParts(roads, tile){
    console.log(roads);
    var l = roads[Math.max(0, tile.gridX-1)][tile.gridY];
    var r = roads[Math.min(level.width/SCALE-1, tile.gridX+1)][tile.gridY];
    var t = roads[tile.gridX][Math.max(0, tile.gridY-1)];
    var b = roads[tile.gridX][Math.min(level.width/SCALE-1, tile.gridY+1)];

    var i = 0;
    if(l != null) i++;
    if(r != null) i++;
    if(t != null) i++;
    if(b != null) i++;

    if(i === 0 || i ===4)
        return {typ: "road_crossing", ori: 0};
    if(i === 3){
        if(t !== null)
            return {typ: "road_crossing_t", ori: 180};
        if(r !== null)
            return {typ: "road_crossing_t", ori: 90};
        if(b !== null)
            return {typ: "road_crossing_t", ori: 0};
        if(l !== null)
            return {typ: "road_crossing_t", ori: 270};
    }
    if(i === 1){
        if(l !== null || r !== null)
            return {typ: "road_horizontal", ori: 0};
        if(t !== null || b !== null)
            return {typ: "road_horizontal", ori: 90};
    }
    if(i === 2){
        if(t !== null && r !== null)
            return {typ: "road_turn", ori: 180};
        if(l !== null && b !== null)
            return {typ: "road_turn", ori: 0};
        if(t !== null && l !== null)
            return {typ: "road_turn", ori: 90};
        if(r !== null && b !== null)
            return {typ: "road_turn", ori: 270};

        if(l !== null && r !== null)
            return {typ: "road_horizontal", ori: 0};
        if(b !== null && t !== null)
            return {typ: "road_horizontal", ori: 90};
    }

}