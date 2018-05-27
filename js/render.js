function render() {
    //used for showing the fps on the top left
    game.debug.text(('FPS: ' + game.time.fps) || '--', 2, 14, "#00ff00");
    game.debug.text(('X/Y: ' + playerX(this.player) + ';' + playerY(this.player)) || '--', 2, 28, "#00ff00");
    if (this.detected) {
        this.detectRender--;
        if (this.detectRender <= 0) {
            this.detected = false;
        }
        game.debug.text(('DETECTED' + this.detectedTime), 2, 42, "#00ff00");
    }
}
function playerX(player) {
    return Math.floor((player.x || 0)/ level.scale)
}
function playerY(player) {
    return Math.floor((player.y || 0)/ level.scale)
}