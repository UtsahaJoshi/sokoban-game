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
    this.box = document.getElementById("box");
    this.solvedBox = document.getElementById("box-solved");
  }

  drawBox = (canvasCtx) => { 
    var crate = this.box;
    if (level.player && level.player.direction !== this.isPush) {
      this.isPush = null;
    } else if (level.player){
      this.canMoveBox(this.direction);
    }
    this.keepPushing();
    this.checkForSolvedBox();
    if (this.solved){
      crate = this.solvedBox;
    }
    canvasCtx.drawImage(crate, this.positionX, this.positionY, this.sizeX, this.sizeY);
  }

  keepPushing = () =>{
    var isRight = this.positionX < this.newPosition.x;
    var isLeft = this.positionX > this.newPosition.x;
    var isDown = this.positionY < this.newPosition.y;
    var isUp = this.positionY > this.newPosition.y;
    const SPEED = 5;
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

  moveBox = (move) => {
    this.direction = move;
    const TYPE = "moveBox";
    this.directionCaseWisePositionComputation(this.direction, false, TYPE);
    this.canMoveBox(this.direction);
  }

  collisionCorrection = (direction) => {
    const TYPE = "collisionCorrection";
    this.directionCaseWisePositionComputation(direction, true, TYPE);
  }

  canMoveBox = (direction) => {
    const TYPE = "canMove";
    this.directionCaseWisePositionComputation(this.isPush, false, TYPE);

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

  directionCaseWisePositionComputation = (switchVar, shouldChangePlayerPos, type) => {
    var incrementOrDecrement;
    var sizeX = 0;
    var sizeY = 0;
    switch (switchVar) {
      case "right":
        sizeX = 40;
        incrementOrDecrement = 1;
        if (type === "collisionCorrection") {
          incrementOrDecrement = -1;
        }
        break;
      case "left":
        sizeX = 40;
        incrementOrDecrement = -1;
        if (type === "collisionCorrection") {
          incrementOrDecrement = 1;
        }
        break;
      case "up":
        sizeY = 40;
        incrementOrDecrement = -1;
        if (type === "collisionCorrection") {
          incrementOrDecrement = 1;
        }
        break;
      case "down":
        sizeY = 40;
        incrementOrDecrement = 1;
        if (type === "collisionCorrection") {
          incrementOrDecrement = -1;
        }
        break;
    }
    if (type !== "canMove") {
      this.newPosition = {
        x: this.newPosition.x + (incrementOrDecrement * sizeX),
        y: this.newPosition.y + (incrementOrDecrement * sizeY)
      }
    } else {
      this.newPosition = {
        x: level.player.newPosition.x + (incrementOrDecrement * sizeX),
        y: level.player.newPosition.y + (incrementOrDecrement * sizeY)
      }
    }
    if (shouldChangePlayerPos) {
      level.player.newPosition = {
        x: level.player.newPosition.x + (incrementOrDecrement * sizeX),
        y: level.player.newPosition.y + (incrementOrDecrement * sizeY),
      }
    }
  }
}