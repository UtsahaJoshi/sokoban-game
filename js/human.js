class Human {
  constructor(id, type, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.nickName = null;
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.humanMD = document.getElementById("human1");
    this.humanMP = document.getElementById("human2");
    this.humanFD = document.getElementById("human6");
    this.humanFP = document.getElementById("human7");
    this.humanK1 = document.getElementById("human3");
    this.humanK2 = document.getElementById("human4");
    this.humanK3 = document.getElementById("human5");
    this.humanS = document.getElementById("human8");
    var question = question = document.getElementById("question");
  }
  drawHuman = (canvasCtx) => {
    var human;
    if (this.type === "male-dark"){
      human = this.humanMD;
      this.nickName = "Kumar";
    } else if (this.type === "male-pale") {
      human = this.humanMP;
      this.nickName = "Dave";
    } else if (this.type === "female-dark") {
      human = this.humanFD;
      this.nickName = "Kamala";
    } else if (this.type === "female-pale") {
      human = this.humanFP;
      this.nickName = "Eva";
    } else if (this.type === "kid1") {
      human = this.humanK1;
      this.nickName = "Jake";
    } else if (this.type === "kid2") {
      human = this.humanK2;
      this.nickName = "Samantha";
    } else if (this.type === "kid3") {
      human = this.humanK3;
      this.nickName = "Bob";
    } else if (this.type === "soldier") {
      human = this.humanS;
      this.nickName = "Kamara";
    }
    canvasCtx.drawImage(question, this.positionX, this.positionY - 40, this.sizeX, this.sizeY);
    canvasCtx.drawImage(human, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}