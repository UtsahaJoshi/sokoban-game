class Box {
  constructor(id, positionX, positionY, sizeX, sizeY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.direction = null;
    this.newPosition = {
      x: this.positionX,
      y: this.positionY
    };
    this.solved = false;
    this.isPush = null;
  }

  drawBox = (canvasCtx) => {
    var box = document.getElementById("box");
    if (level.player.direction !== this.isPush) {
      this.isPush = null;
    } else {
      this.canMoveBox(this.direction);
    }
    this.keepPushing();

    this.checkForSolvedBox();
    if (this.solved){
      var box = document.getElementById("box-solved");
    }
    canvasCtx.drawImage(box, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }

  keepPushing = () =>{
    if(this.positionX < this.newPosition.x) {
      this.positionX += 10.0;
    }
    if(this.positionX > this.newPosition.x) {
      this.positionX -= 10.0;
    }
    if(this.positionY < this.newPosition.y) {
      this.positionY += 10.0;
    }
    if(this.positionY > this.newPosition.y) {
      this.positionY -= 10.0;
    }
  }

  moveBox = (move) => {
    this.direction = move;
      switch (move) {
        case "right":
          this.newPosition = {
            x: this.newPosition.x + this.sizeX,
            y: this.newPosition.y
          }
          break;
          case "left":
            this.newPosition = {
              x: this.newPosition.x - this.sizeX,
              y: this.newPosition.y
            }
            break;
          case "up":
            this.newPosition = {
              x: this.newPosition.x,
              y: this.newPosition.y - this.sizeY
            }
            break;
          case "down":
            this.newPosition = {
              x: this.newPosition.x,
              y: this.newPosition.y + this.sizeY
            }
            break;
      }
      this.canMoveBox(this.direction);
  }

  collisionCorrection = (direction) => {
    if (direction === "right"){
      this.newPosition = {
        x: this.newPosition.x - this.sizeX,
        y: this.newPosition.y
      }
      level.player.newPosition = {
        x: level.player.newPosition.x - level.player.sizeX,
        y: level.player.newPosition.y
      }
    }
    if (direction === "left"){
      this.newPosition = {
        x: this.newPosition.x + this.sizeX,
        y: this.newPosition.y
      }
      level.player.newPosition = {
        x: level.player.newPosition.x + level.player.sizeX,
        y: level.player.newPosition.y
      }
    }
    if (direction === "up"){
      this.newPosition = {
        x: this.newPosition.x,
        y: this.newPosition.y + this.sizeY
      }
      level.player.newPosition = {
        x: level.player.newPosition.x,
        y: level.player.newPosition.y + level.player.sizeY
      }
    }
    if (direction === "down"){
      this.newPosition = {
        x: this.newPosition.x,
        y: this.newPosition.y - this.sizeY
      }
      level.player.newPosition = {
        x: level.player.newPosition.x,
        y: level.player.newPosition.y - level.player.sizeY
      }
    }
  }
  canMoveBox = (direction) => {
    if (this.isPush == "right"){
      this.newPosition.x = level.player.newPosition.x + 80
      this.newPosition.y = level.player.newPosition.y
    }
    if (this.isPush == "left"){
      this.newPosition.x = level.player.newPosition.x - 80
      this.newPosition.y = level.player.newPosition.y
    }
    if (this.isPush == "up"){
      this.newPosition.x = level.player.newPosition.x
      this.newPosition.y = level.player.newPosition.y - 80
    }
    if (this.isPush == "down"){
      this.newPosition.x = level.player.newPosition.x
      this.newPosition.y = level.player.newPosition.y + 80
    }
    level.boxes.forEach((secondBox) => {
      if (secondBox.positionX === this.newPosition.x && secondBox.positionY === this.newPosition.y && secondBox.id !== this.id){
        this.collisionCorrection(direction);
      }
    })

    level.walls.forEach((wall) => {
      if (wall.positionX === this.newPosition.x && wall.positionY === this.newPosition.y){
        this.collisionCorrection(direction);
      }
    })
  }

  checkForSolvedBox = () => {
    this.solved = false;
    level.crosses.forEach((cross)=>{
      if (this.positionX === cross.positionX && this.positionY === cross.positionY){
        this.solved = true;
      }
    })
  }

}