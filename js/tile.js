class Tile {
  constructor(id, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    console.log('created tile');
  }
  drawTile= () => {
    var tile = document.getElementById("tile");
    levelCanvasCtx.drawImage(tile, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}