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

  drawBox = () => {
    var box = document.getElementById("box");
    if (player.direction !== this.isPush) {
      this.isPush = null;
    } else {
      this.canMoveBox(this.direction);
    }
    this.keepPushing();

    this.checkForSolvedBox();
    if (this.solved){
      var box = document.getElementById("box-solved");
    }
    levelCanvasCtx.drawImage(box, this.positionX, this.positionY, this.sizeX, this.sizeY);
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
            console.log("move from", this.newPosition)
            this.newPosition = {
              x: this.newPosition.x,
              y: this.newPosition.y - this.sizeY
            }
            console.log("move to", this.newPosition)
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

  canMoveBox = (direction) => {
    if (this.isPush == "right"){
      this.newPosition.x = player.newPosition.x + 80
      this.newPosition.y = player.newPosition.y
    }
    if (this.isPush == "left"){
      this.newPosition.x = player.newPosition.x - 80
      this.newPosition.y = player.newPosition.y
    }
    if (this.isPush == "up"){
      this.newPosition.x = player.newPosition.x
      this.newPosition.y = player.newPosition.y - 80
    }
    if (this.isPush == "down"){
      this.newPosition.x = player.newPosition.x
      this.newPosition.y = player.newPosition.y + 80
    }
    boxes.forEach((secondBox) => {
      if (secondBox.positionX === this.newPosition.x && secondBox.positionY === this.newPosition.y && secondBox.id !== this.id){
        if (direction === "right"){
          this.newPosition = {
            x: this.newPosition.x - this.sizeX,
            y: this.newPosition.y
          }
          player.newPosition = {
            x: player.newPosition.x - player.sizeX,
            y: player.newPosition.y
          }
        }
        if (direction === "left"){
          this.newPosition = {
            x: this.newPosition.x + this.sizeX,
            y: this.newPosition.y
          }
          player.newPosition = {
            x: player.newPosition.x + player.sizeX,
            y: player.newPosition.y
          }
        }
        if (direction === "up"){
          console.log("cant move to", this.newPosition)
          this.newPosition = {
            x: this.newPosition.x,
            y: this.newPosition.y + this.sizeY
          }
          console.log("remain at", this.newPosition)
          player.newPosition = {
            x: player.newPosition.x,
            y: player.newPosition.y + player.sizeY
          }
        }
        if (direction === "down"){
          this.newPosition = {
            x: this.newPosition.x,
            y: this.newPosition.y - this.sizeY
          }
          player.newPosition = {
            x: player.newPosition.x,
            y: player.newPosition.y - player.sizeY
          }
        }
      }
    })

    walls.forEach((wall) => {
      if (wall.positionX === this.newPosition.x && wall.positionY === this.newPosition.y){
        if (direction === "right"){
          this.newPosition = {
            x: this.newPosition.x - this.sizeX,
            y: this.newPosition.y
          }
          player.newPosition = {
            x: player.newPosition.x - player.sizeX,
            y: player.newPosition.y
          }
        }
        if (direction === "left"){
          this.newPosition = {
            x: this.newPosition.x + this.sizeX,
            y: this.newPosition.y
          }
          player.newPosition = {
            x: player.newPosition.x + player.sizeX,
            y: player.newPosition.y
          }
        }
        if (direction === "up"){
          this.newPosition = {
            x: this.newPosition.x,
            y: this.newPosition.y + this.sizeY
          }
          player.newPosition = {
            x: player.newPosition.x,
            y: player.newPosition.y + player.sizeY
          }
        }
        if (direction === "down"){
          this.newPosition = {
            x: this.newPosition.x,
            y: this.newPosition.y - this.sizeY
          }
          player.newPosition = {
            x: player.newPosition.x,
            y: player.newPosition.y - player.sizeY
          }
        }
      }
    })
  }

  checkForSolvedBox = () => {
    this.solved = false;
    crosses.forEach((cross)=>{
      if (this.positionX === cross.positionX && this.positionY === cross.positionY){
        this.solved = true;
      }
    })
  }

}