class Pond {
  constructor(id, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.pond = document.getElementById("pond");
  }
  drawPond= (canvasCtx) => {
    canvasCtx.drawImage(this.pond, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}