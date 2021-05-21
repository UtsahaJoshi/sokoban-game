class Pond {
  constructor(id, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
  drawPond= (canvasCtx) => {
    var pond = document.getElementById("pond");
    canvasCtx.drawImage(pond, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}