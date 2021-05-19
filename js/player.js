class Player {
  constructor(positionX, positionY, sizeX, sizeY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.newPosition = {
      x: this.positionX,
      y: this.positionY
    };
    this.lastPositionX;
    this.direction = null;
    this.player = document.getElementById("player-down-1");
    this.isMoving = false;
    this.frameCount = 0;
    this.currentLoopIndex = 0;
  }
  drawPlayer= (levelCanvasCtx) => {
    this.keepMoving();
    this.getPlayerImage();
    levelCanvasCtx.drawImage(this.player, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
  getPlayerImage(){
    const FRAME_LIMIT = 10;
    const CYCLE_LOOP = [1, 2, 1, 3];
    if (this.isMoving) {
      this.frameCount++;
      if (this.frameCount >= FRAME_LIMIT) {
        this.frameCount = 0;
        this.currentLoopIndex++;
        if (this.currentLoopIndex >= CYCLE_LOOP.length) {
          this.currentLoopIndex = 0;
        }
      }
    } else {
      this.currentLoopIndex = 0
    }
    switch (this.direction) {
      case "right":
        this.player = document.getElementById("player-right-" + CYCLE_LOOP[this.currentLoopIndex]);
        break;
      case "left":
        this.player = document.getElementById("player-left-" + CYCLE_LOOP[this.currentLoopIndex]);
        break;
      case "down":
        this.player = document.getElementById("player-down-" + CYCLE_LOOP[this.currentLoopIndex]);
        break;
      case "up":
        this.player = document.getElementById("player-up-"  + CYCLE_LOOP[this.currentLoopIndex]);
        break;
    }
  }
  keepMoving = () => {
    if (this.newPosition.x !== this.positionX ||  this.newPosition.y !== this.positionY){
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
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
  movePlayer = (move, walls, boxes) => {
    this.direction = move;
    if (Math.abs(this.newPosition.x - this.positionX) < this.sizeX && Math.abs(this.newPosition.y - this.positionY) < this.sizeY) {
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
      this.canMovePlayer(this.direction, walls, boxes);
    }
  }

  canMovePlayer = (direction, walls, boxes) => {

    // wall slam
    walls.forEach((wall) => {
      if (wall.positionX === this.newPosition.x && wall.positionY === this.newPosition.y){
        if (direction === "right"){
          this.newPosition = {
            x: this.newPosition.x - this.sizeX,
            y: this.newPosition.y
          }
        }
        if (direction === "left"){
          this.newPosition = {
            x: this.newPosition.x + this.sizeX,
            y: this.newPosition.y
          }
        }
        if (direction === "up"){
          this.newPosition = {
            x: this.newPosition.x,
            y: this.newPosition.y + this.sizeY
          }
        }
        if (direction === "down"){
          this.newPosition = {
            x: this.newPosition.x,
            y: this.newPosition.y - this.sizeY
          }
        }
      }
    })

    // box slam
    boxes.forEach((firstBox) => {
      if (firstBox.positionX === this.newPosition.x && firstBox.positionY === this.newPosition.y){
        firstBox.isPush = direction;
        firstBox.moveBox(direction)
      }
    })
  }
}