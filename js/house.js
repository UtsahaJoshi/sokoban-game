class House {
  constructor(id, type, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
  drawHouse = (canvasCtx) => {
    var house;
    if (this.type === "red"){
      house = document.getElementById("house-red");
    } else if (this.type === "blue") {
      house = document.getElementById("house-blue");
    } else {
      house = document.getElementById("house-green");
    }
    canvasCtx.drawImage(house, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}