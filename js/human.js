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
    var human = {
      "male-dark": [this.humanMD, "Kumar"],
      "male-pale": [this.humanMP, "Dave"],
      "female-dark": [this.humanFD, "Kamala"],
      "female-pale": [this.humanFP, "Eva"],
      "kid1": [this.humanK1, "Jake"],
      "kid2": [this.humanK2, "Samantha"],
      "kid3": [this.humanK3, "Bob"],
      "soldier": [this.humanS, "Kamara"]
    };
    this.nickName = human[this.type][1];
    canvasCtx.drawImage(question, this.positionX, this.positionY - this.sizeY, this.sizeX, this.sizeY);
    canvasCtx.drawImage(human[this.type][0], this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}