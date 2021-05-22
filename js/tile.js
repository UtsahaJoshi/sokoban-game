class Tile {
  constructor(id, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.tile = document.getElementById("tile");
    this.grass = document.getElementById("grass");
  }
  drawTile= (levelCanvasCtx) => {
    var tile = this.title;
    if (level.levelCount === 13) {
      tile = this.grass;
    }
    levelCanvasCtx.drawImage(tile, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}