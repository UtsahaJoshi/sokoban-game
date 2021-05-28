class Cross {
  constructor(id, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.cross = document.getElementById("cross");
    this.crossStepped = document.getElementById("cross-stepped");
  }
  drawCross = (canvasCtx) => {
    var cross = this.cross;
    var playerIsSteppingOnCross = (this.positionX === level.player.positionX && this.positionY === level.player.positionY);
    
    if (level.player && playerIsSteppingOnCross){
      cross = this.crossStepped;
    }
    canvasCtx.drawImage(cross, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}