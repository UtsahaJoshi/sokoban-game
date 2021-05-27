class NoneColliders{
  constructor(id, type, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.tile = document.getElementById("grass");
    this.berries = document.getElementById("berries");
    this.mushroom = document.getElementById("mushroom");
    this.flowers = document.getElementById("flowers");
    this.path = document.getElementById("path");
  }
  drawStuff = (canvasCtx) => {
    var stuff;
    if (this.type === "berries"){
      stuff = this.berries;
    } else if (this.type === "mushroom") {
      stuff = this.mushroom;
    } else if (this.type === "flowers"){
      stuff = this.flowers;
    } else {
      stuff = this.path;
    }
    canvasCtx.drawImage(stuff, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}