class Cross {
  constructor(id, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
  drawCross = () => {
    var cross = document.getElementById("cross");
    if (this.positionX === player.positionX && this.positionY === player.positionY){
      cross = document.getElementById("cross-stepped");
      console.log("hello")
    }
    levelCanvasCtx.drawImage(cross, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}