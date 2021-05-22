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
  drawPlayer= (canvasCtx) => {
    this.keepMoving();
    this.getPlayerImage();
    canvasCtx.drawImage(this.player, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }
  getPlayerImage(){
    const FRAME_LIMIT = 10;
    const CYCLE_LOOP = [1, 2, 1, 3];
    if (this.isMoving) {
      this.frameCount = this.frameCount + 1;
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
      this.positionX += 5;
    }
    if(this.positionX > this.newPosition.x) {
      this.positionX -= 5;
    }
    if(this.positionY < this.newPosition.y) {
      this.positionY += 5;
    }
    if(this.positionY > this.newPosition.y) {
      this.positionY -= 5;
    }
  }
  movePlayer = (move) => {
    this.direction = move;
    var check1 = Math.abs(this.newPosition.x - this.positionX) < this.sizeX;
    var check2 = Math.abs(this.newPosition.y - this.positionY) < this.sizeY;
    if (check1 && check2) {
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
      this.canMovePlayer(this.direction);
    }
  }
  collisionCorrection = (direction) => {
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
  canMovePlayer = (direction) => {
    if (level.levelCount === 13){
      level.ponds.forEach((pond) => {
        if ((this.newPosition.x + this.sizeX > pond.positionX) && (this.newPosition.x < pond.positionX + pond.sizeX) && (this.newPosition.y + this.sizeY > pond.positionY) && (this.newPosition.y < pond.positionY + pond.sizeY) ){
          this.collisionCorrection(direction);
        }
      })
      level.houses.forEach((house) => {
        if ((this.newPosition.x + this.sizeX > house.positionX) && (this.newPosition.x < house.positionX + house.sizeX) && (this.newPosition.y + this.sizeY > house.positionY + house.sizeY/2) && (this.newPosition.y < house.positionY + house.sizeY) ){
          this.collisionCorrection(direction);
        }
      })
      level.trees.forEach((tree) => {
        if ((this.newPosition.x + this.sizeX > tree.positionX) && (this.newPosition.x < tree.positionX + tree.sizeX) && (this.newPosition.y > tree.positionY + tree.sizeY/2) && (this.newPosition.y < tree.positionY + tree.sizeY - this.sizeY/2) ){
          this.collisionCorrection(direction);
        }
      })
      level.humans.forEach((human) => {
        console.log(this.positionX, this.positionY, human.positionX, human.positionY)
        if ((this.newPosition.x === human.positionX) && (this.newPosition.y === human.positionY)){
          this.collisionCorrection(direction);
        }
      })
    }
    // wall slam
    level.walls.forEach((wall) => {
      if (wall.positionX === this.newPosition.x && wall.positionY === this.newPosition.y){
        this.collisionCorrection(direction);
      }
    })

    // box slam
    level.boxes.forEach((firstBox) => {
      if (firstBox.positionX === this.newPosition.x && firstBox.positionY === this.newPosition.y){
        firstBox.isPush = direction;
        firstBox.moveBox(direction)
      }
    })
  }
}