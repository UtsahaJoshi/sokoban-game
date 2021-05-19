class Cross {
  constructor(id, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
  drawCross = (levelCanvasCtx) => {
    var cross = document.getElementById("cross");
    if (this.positionX === level.player.positionX && this.positionY === level.player.positionY){
      cross = document.getElementById("cross-stepped");
    }
    levelCanvasCtx.drawImage(cross, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}