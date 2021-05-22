class Tree {
  constructor(id, type, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.singleTree = document.getElementById("tree");
    this.groupedTree = document.getElementById("trees");
  }
  drawTree = (canvasCtx) => {
    var tree;
    if (this.type === "single"){
      tree = this.singleTree;
      this.sizeX = 120;
      this.sizeY = 120;
    } else {
      tree = this.groupedTree;
      this.sizeX = 280;
      this.sizeY = 160;
    }
    canvasCtx.drawImage(tree, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}