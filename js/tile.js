class Tile {
  constructor(id, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
  drawTile= (levelCanvasCtx) => {
    var tile = document.getElementById("grass");
    levelCanvasCtx.drawImage(tile, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}