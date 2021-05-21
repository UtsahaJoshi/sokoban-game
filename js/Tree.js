class Tree {
  constructor(id, type, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
  drawTree = (canvasCtx) => {
    var tree;
    var stuffSizeX = this.sizeX*3;
    var stuffSizeY = this.sizeY*3;
    if (this.type === "single"){
      tree = document.getElementById("tree");
      this.sizeX = 120;
      this.sizeY = 120;
    } else {
      tree = document.getElementById("trees");
      this.sizeX = 280;
      this.sizeY = 160;
    }
    canvasCtx.drawImage(tree, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}