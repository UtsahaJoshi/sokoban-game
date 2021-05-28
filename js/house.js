class House {
  constructor(id, type, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.houseRed = document.getElementById("house-red");
    this.houseBlue = document.getElementById("house-blue");
    this.houseGreen = document.getElementById("house-green");
  }
  drawHouse = (canvasCtx) => {
    var houseImage = {
      "red": this.houseRed,
      "blue": this.houseBlue,
      "green": this.houseGreen
    };
    canvasCtx.drawImage(houseImage[this.type], this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}