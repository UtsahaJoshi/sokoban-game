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
  // draw player on screen
  drawPlayer= (canvasCtx) => {
    this.keepMoving();
    this.getPlayerImage();
    canvasCtx.drawImage(this.player, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }

  // get animation image per frame
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
      case RIGHT:
        this.player = document.getElementById("player-right-" + CYCLE_LOOP[this.currentLoopIndex]);
        break;
      case LEFT:
        this.player = document.getElementById("player-left-" + CYCLE_LOOP[this.currentLoopIndex]);
        break;
      case DOWN:
        this.player = document.getElementById("player-down-" + CYCLE_LOOP[this.currentLoopIndex]);
        break;
      case UP:
        this.player = document.getElementById("player-up-"  + CYCLE_LOOP[this.currentLoopIndex]);
        break;
    }
  }
  // keep moving the player if conditions met
  keepMoving = () => {
    const SPEED = 5;
    var isRight = this.positionX < this.newPosition.x;
    var isLeft = this.positionX > this.newPosition.x;
    var isDown = this.positionY < this.newPosition.y;
    var isUp = this.positionY > this.newPosition.y;
    var isNotEqualToX = this.newPosition.x !== this.positionX;
    var isNotEqualToY = this.newPosition.y !== this.positionY;

    if (isNotEqualToX ||  isNotEqualToY){
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
    if(isRight) {
      this.positionX += SPEED;
    }
    if(isLeft) {
      this.positionX -= SPEED;
    }
    if(isDown) {
      this.positionY += SPEED;
    }
    if(isUp) {
      this.positionY -= SPEED;
    }
  }

  // move player on key down
  movePlayer = (move) => {
    if (!move) {
      return;
    }
    const TYPE = "movePlayer"
    this.keepPlayerInGrid(move);
    var positionDiffX = Math.abs(this.positionX - this.newPosition.x);
    var positionDiffY = Math.abs(this.positionY - this.newPosition.y);
    if (positionDiffX < this.sizeX && positionDiffY < this.sizeY){
      this.direction = move;
      this.directionCaseWisePositionComputation(this.direction, TYPE);
      this.canMovePlayer(this.direction);
    }
  }

  // if player direction change and player is moving, adjust the player according to the grid
  keepPlayerInGrid = (move) =>{
    if (this.direction !== move){
      if (this.direction === RIGHT) {
        this.newPosition. x = Math.ceil(this.positionX/40) * 40
      }
      if (this.direction === LEFT) {
        this.newPosition. x = Math.floor(this.positionX/40) * 40
      }
      if (this.direction === DOWN) {
        this.newPosition.y = Math.ceil(this.positionY/40) * 40
      }
      if (this.direction === UP) {
        this.newPosition.y = Math.floor(this.positionY/40) * 40
      }
    }
  }

  // correct position on collision
  collisionCorrection = (direction) => {
    const TYPE = "collisionCorrection";
    this.directionCaseWisePositionComputation(direction, TYPE);
  }
  // compute position of the player
  directionCaseWisePositionComputation = (switchVar, type) => {
    var incrementOrDecrement;
    var sizeX = 0;
    var sizeY = 0;
    switch (switchVar) {
      case RIGHT:
        sizeX = 40;
        incrementOrDecrement = 1;
        if (type === "collisionCorrection") {
          incrementOrDecrement = -1;
        }
        break;
      case LEFT:
        sizeX = 40;
        incrementOrDecrement = -1;
        if (type === "collisionCorrection") {
          incrementOrDecrement = 1;
        }
        break;
      case UP:
        sizeY = 40;
        incrementOrDecrement = -1;
        if (type === "collisionCorrection") {
          incrementOrDecrement = 1;
        }
        break;
      case DOWN:
        sizeY = 40;
        incrementOrDecrement = 1;
        if (type === "collisionCorrection") {
          incrementOrDecrement = -1;
        }
        break;
    }
    this.newPosition = {
      x: this.newPosition.x + (incrementOrDecrement * sizeX),
      y: this.newPosition.y + (incrementOrDecrement * sizeY)
    }
  }
  
  // check if player can move
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
        if ((this.newPosition.x > tree.positionX ) && (this.newPosition.x < tree.positionX + 2 * tree.sizeX) && (this.newPosition.y > tree.positionY + tree.sizeY) && (this.newPosition.y < tree.positionY + 3 * tree.sizeY) ){
          this.collisionCorrection(direction);
        }
      })
      level.humans.forEach((human) => {
        if ((this.newPosition.x === human.positionX) && (this.newPosition.y === human.positionY)){
          this.collisionCorrection(direction);
        }
      })
    } else {
      // box slam
      level.boxes.forEach((firstBox) => {
        if (firstBox.positionX === this.newPosition.x && firstBox.positionY === this.newPosition.y){
          firstBox.isPush = direction;
          firstBox.moveBox(direction)
        }
      })
    }
    // wall slam
    level.walls.forEach((wall) => {
      if (wall.positionX === this.newPosition.x && wall.positionY === this.newPosition.y){
        this.collisionCorrection(direction);
      }
    })
  }
}
