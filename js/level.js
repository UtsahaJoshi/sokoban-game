class Level{
  constructor(levelCount, levelData){
    this.levelCanvas = document.createElement("canvas");
    this.levelCanvas.width = 2000;
    this.levelCanvas.height = 2000;
    this.levelCanvasCtx = this.levelCanvas.getContext("2d");
    if (levelCount) {
      this.levelCount = levelCount;
      this.level = allLevels[this.levelCount];
    } else {
      this.level = levelData;
    }

    this.levelComplete = false;

    this.walls = [];
    this.tiles = [];
    this.boxes = [];
    this.crosses = [];
    this.player;

    getAndMakePlayer(this);

    this.gameObjects = {walls: this.walls, tiles: this.tiles, boxes: this.boxes, crosses: this.crosses, player: this.player};
    createLevelObjects(this, this.level, this.gameObjects);
    this.camera = new Camera(this);
    this.exit = false; // for quitting
    this.paused = false;
    this.pauseHovered = false;
    this.menuSelection = [[0, 0, 0, 0],[0,0,0]]
  }

  drawLevel = () => {
    var pause = document.getElementById("pause");
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(this.levelCanvas, this.camera.camPosX, this.camera.camPosY, width, height, 0, 0, width, height);
    if (!this.paused){
      if (!this.levelComplete){
        this.camera.getCamPos();
        this.drawLevelObjects();
        if (this.camera.isSnapping || this.camera.changeScene) this.camera.snapCameraBackInPosition();

        if (this.pauseHovered){
          canvas.style.cursor = "pointer";
          pause = document.getElementById("pause-hover");
        }
        ctx.drawImage(pause, width - 120, 10, 100 , 100 );
        this.checkForLevelComplete();
      } else {
        menuContent();
      }
    } else {
      menuContent();
    }
  }

  checkForLevelComplete = () => {
    var totalSolved = 0;
    this.boxes.forEach((value)=>{
      if (value.solved) totalSolved += 1;
      });
      this.levelComplete = (totalSolved === this.boxes.length) ? true : false;
      if (this.levelComplete) {
        if (!story && !levelEditor){
          saveData("soko-level-complete", this.levelCount)
          if (mainMenu.levelInStorage < this.levelCount) {
            mainMenu.levelInStorage = Number(getSavedData("soko-level-complete"));
          }
        }
      }
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
}
