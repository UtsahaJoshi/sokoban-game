class Level{
  constructor(level){
    this.levelCanvas = document.createElement("canvas");
    this.levelCanvas.width = 6000;
    this.levelCanvas.height = 6000;
    this.levelCanvasCtx = this.levelCanvas.getContext("2d");

    this.startingPos = [];
    this.isDragging = false;
    this.level = [
      "########",
      "###===##",
      "#*+==##",
      "###=+*###################################",
      "#*#+===========================@=========#",
      "#=#=*=###################################",
      "#+=&++*#",
      "#===*==#",
      "#======#",
      "#======#",
      "#======#",
      "#======#",
      "#======#",
      "#======#",
      "#======#",
      "#======#",
      "#======#",
      "#======#",
      "#======#",
      "#======#",
      "########"
    ]
    this.levelComplete = false;

    this.walls = [];
    this.tiles = [];
    this.boxes = [];
    this.crosses = [];
    this.player;

    for(var i = 0; i < this.level.length; i++){
      for(var j = 0; j < this.level[i].length; j++){
        var positionX = j * 80;
        var positionY =  i * 80;
        var sizeX = 80;
        var sizeY = 80;
        switch(this.level[i][j]){
          case "@":
            this.player = new Player(positionX, positionY, sizeX, sizeY);
            break;
        }
      }
    }
    this.createLevelObjects();
    this.camera = new Camera(this);
    }

    drawLevel = () => {
      this.camera.getCamPos();
      this.drawLevelObjects();
      (this.camera.isSnapping || this.camera.changeScene) ? this.camera.snapCameraBackInPosition() : 0;
      ctx.drawImage(this.levelCanvas, this.camera.camPosX, this.camera.camPosY, width, height, 0, 0, width, height);
      this.checkForLevelComplete();
    }

    checkForLevelComplete = () => {
      var totalSolved = 0;
      this.boxes.forEach((value)=>{
        (value.solved) ? totalSolved += 1 : 0;
       });
       (totalSolved === this.boxes.length) ? this.levelComplete = true : this.levelComplete = false;
    }

    drawLevelObjects = () => {
      this.tiles.forEach((value)=>{
        value.drawTile(this.levelCanvasCtx);
      })
      this.crosses.forEach((value)=>{
        value.drawCross(this.levelCanvasCtx);
      })
      this.boxes.forEach((value)=>{
       value.drawBox(this.levelCanvasCtx);
      })
      this.player.drawPlayer(this.levelCanvasCtx);
      this.walls.forEach((value)=>{
        value.drawWall(this.levelCanvasCtx);
      })
    }

    createLevelObjects = () => {
      for(var i = 0; i < this.level.length; i++){
        for(var j = 0; j < this.level[i].length; j++){
          var positionX = j * 80;
          var positionY =  i * 80;
          var sizeX = 80;
          var sizeY = 80;
          this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
          switch(this.level[i][j]){
            case "#":
              this.walls.push(new Wall(this.walls.length, positionX, positionY, sizeX, sizeY));
              break;
            case "+":
              this.boxes.push(new Box(this.boxes.length, positionX, positionY, sizeX, sizeY));
              break;
            case "@":
              this.player = new Player(positionX, positionY, sizeX, sizeY);
              break;

            case "*":
              this.crosses.push(new Cross(this.crosses.length, positionX, positionY, sizeX, sizeY));
              break;
            case "&":
              this.crosses.push(new Cross(this.crosses.length, positionX, positionY, sizeX, sizeY));
              this.boxes.push(new Box(this.boxes.length, positionX, positionY, sizeX, sizeY));
              break;
          }
        }
      }
    }

    playerControl = (event) => {
      if (this.camera.xDrag !== 0 || this.camera.yDrag !==0) this.camera.isSnapping = true;
      if (!this.camera.isSnapping) {
        var key = event.code;
        var direction;
        switch(key){
          case "ArrowRight":
            direction = "right";
            break;
          case "ArrowLeft":
            direction = "left";
            break;
          case "ArrowUp":
            direction = "up";
            break;
          case "ArrowDown":
            direction = "down";
            break;
          default:
            break;
        }
        console.log(this.walls)
        this.player.movePlayer(direction, this.walls, this.boxes);
      }
    }
    seeMap = (e) => {
      if (isDragging && !(e.pageX === this.startingPos[0] && e.pageY === this.startingPos[1])) {
        this.camera.xDrag = this.camera.xDrag + (e.pageX - startingPos[0])/25;
        this.camera.yDrag = this.camera.yDrag + (e.pageY - startingPos[1])/25;
      }
    }
}
