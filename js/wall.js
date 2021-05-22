class Wall {
  constructor(id, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.wall = document.getElementById("pillar-wall");
    this.normalWall = document.getElementById("normal-wall");
  }
  drawWall = (levelCanvasCtx) => {
    level.walls.forEach((value)=>{
      if (value.positionX === this.positionX && value.positionY === this.positionY + this.sizeY){
        this.wall = this.normalWall;
      }
    })
    levelCanvasCtx.drawImage(this.wall, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
}
