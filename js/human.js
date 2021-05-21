class Human {
  constructor(id, type, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
  drawHuman = (canvasCtx) => {
    var human;
    if (this.type === "male-dark"){
      human = document.getElementById("human1");
    } else if (this.type === "male-pale") {
      human = document.getElementById("human2");
    } else if (this.type === "female-dark") {
      human = document.getElementById("human6");
    } else if (this.type === "female-pale") {
      human = document.getElementById("human7");
    } else if (this.type === "kid1") {
      human = document.getElementById("human3");
    } else if (this.type === "kid2") {
      human = document.getElementById("human4");
    } else if (this.type === "kid3") {
      human = document.getElementById("human5");
    } else if (this.type === "soldier") {
      human = document.getElementById("human8");
    }
    var question = document.getElementById("question");
    canvasCtx.drawImage(question, this.positionX, this.positionY - 80, this.sizeX, this.sizeY);
    canvasCtx.drawImage(human, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}