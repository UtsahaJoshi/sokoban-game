class noCollisionStuffs{
  constructor(id, type, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
  drawStuff = (canvasCtx) => {
    var stuff;
    var stuffSizeX = this.sizeX;
    var stuffSizeY = this.sizeY;
    var tile = document.getElementById("grass");
    if (this.type === "berries"){
      stuff = document.getElementById("berries");
    } else if (this.type === "mushroom") {
      stuff = document.getElementById("mushroom");
      stuffSizeX = 30;
      stuffSizeY = 20;
    } else if (this.type === "flowers"){
      stuff = document.getElementById("flowers");
      stuffSizeX = 40;
      stuffSizeY = 20;
    } else {
      stuff = document.getElementById("path");
    }
    canvasCtx.drawImage(tile, this.positionX, this.positionY, this.sizeX, this.sizeY);
    canvasCtx.drawImage(stuff, this.positionX, this.positionY, stuffSizeX, stuffSizeY);
  }
}