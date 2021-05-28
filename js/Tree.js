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
    var size = 40;
    var tree = {
      "single" : [
        this.singleTree,
        size * 3, size * 3
      ],
      "group" : [
        this.groupedTree,
        size * 7, size * 4
      ]
    };
    canvasCtx.drawImage(tree[this.type][0], this.positionX, this.positionY, tree[this.type][1], three[this.type][2]);
  }
}