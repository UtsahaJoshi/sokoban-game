class LevelEditor{
  constructor(){
    this.levelCanvas = document.createElement("canvas");
    this.levelCanvas.width = 2000;
    this.levelCanvas.height = 2000;
    this.levelCanvasCtx = this.levelCanvas.getContext("2d");
    this.levelCanvasCtx.fillStyle = "#ebebeb";
    this.levelCanvasCtx.fillRect(0,0,this.levelCanvas.width, this.levelCanvas.height);
    this.walls = [];
    this.tiles = [];
    this.boxes = [];
    this.crosses = [];
    this.player = null;
    this.camera = new Camera(this);
    this.levelCount = 14;

    this.exit = false; // for quitting
    this.paused = false;
    this.pauseHovered = false;
    this.menuSelection = [[0, 0, 0, 0],[0,0,0]];
    this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]; 
    this.wallImg = document.getElementById("normal-wall");
    this.cameraImg = document.getElementById("camera");
    this.boxImg = document.getElementById("box");
    this.crossImg = document.getElementById("cross");
    this.playerImg = document.getElementById("player-down-1");
    this.playImg = document.getElementById("playbtn");
    this.exportImg = document.getElementById("import");
    this.importImg = document.getElementById("export");
    this.canMoveCamera = false;
    this.deleteObject = false;
    }

    drawLevel = () => {
      var pause = document.getElementById("pause");
      ctx.clearRect(0, 0, width, height);
      this.camera.getCamPos();
      this.drawLevelObjects();
      (this.camera.isSnapping) ? this.camera.snapCameraBackInPosition() : 0;
      ctx.drawImage(this.levelCanvas, this.camera.camPosX, this.camera.camPosY, width, height, 0, 0, width, height);
      this.drawEditorTools();
      if (!this.paused){
        if (this.pauseHovered){
          canvas.style.cursor = "pointer";
          pause = document.getElementById("pause-hover");
        }
        ctx.drawImage(pause, width - 120, 10, 100 , 100 );
      } else {
        var logo = document.getElementById("logo");
        var face = document.getElementById("face");
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(width/2-logo.width/4, 150,logo.width/2, 520);
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.font = "10px Soko";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Small Town", canvas.width/2-120, 190);
        ctx.drawImage(logo, width/2-logo.width/4, 150,logo.width/2, logo.height/2);
        ctx.drawImage(face, width/2-160, 165,face.width/2, face.height/2);
        ctx.font = "20px Soko";
        ctx.fillStyle = "	#FFD700";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.textAlign = "center";
        if (this.menuSelection[0][0] == 1){
          canvas.style.cursor = "pointer";
          ctx.fillText("RESUME", canvas.width/2, 320);
        }
        ctx.strokeText("RESUME", canvas.width/2, 320);
        if (this.menuSelection[0][1] == 1){
          canvas.style.cursor = "pointer";
          ctx.fillText("RESTART", canvas.width/2, 420);
        }
        ctx.strokeText("RESTART", canvas.width/2, 420);
        if (this.menuSelection[0][2] == 1){
          canvas.style.cursor = "pointer";
          ctx.fillText("AUDIO: ON", canvas.width/2, 520);
        }
        ctx.strokeText("AUDIO: ON", canvas.width/2, 520);
        if (this.menuSelection[0][3] == 1){
          canvas.style.cursor = "pointer";
          ctx.fillText("EXIT", canvas.width/2, 620);
        }
        ctx.strokeText("EXIT", canvas.width/2, 620);
      }
    }

    drawEditorTools = () => {
      this.canMoveCamera = false;
      if (this.editorSelection[4][1]) this.canMoveCamera = true;
      var tools = [this.wallImg, this.boxImg, this.crossImg, this.playerImg, this.cameraImg, this.playImg, this.exportImg, this.importImg];
      ctx.fillRect(0, 0, 150, height);
      var posX = 50;
      var posY;
      tools.forEach((value, index) =>{
          posY = index * 80;
          ctx.fillStyle = "	#FFD700";
          if (this.editorSelection[index][0] || this.editorSelection[index][1]){
            ctx.fillStyle = "	#FFFFFF";
          }
          ctx.fillRect(posX, posY + 20, 50, 50)
          ctx.drawImage(value, posX + 5, posY + 25, 40, 40);
      })
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
      if (this.player){
        this.player.drawPlayer(this.levelCanvasCtx);
      }
      this.walls.forEach((value)=>{
        value.drawWall(this.levelCanvasCtx);
      })
    }

    pauseClicked = (e) => {
      if (e.pageX > width - 120 && e.pageX < width - 20 && e.pageY > 10 && e.pageY < 110){
        this.paused = true;
      }
    }
    pauseHover = (e) => {
      this.pauseHovered = false;
      if (e.pageX > width - 120 && e.pageX < width - 20 && e.pageY > 10 && e.pageY < 110){
        this.pauseHovered = true;
      }
    }
    editorMenuSelection = (e) => {
      var mousePos = [e.pageX, e.pageY];
        // wall
        if (mousePos[0]>50 && mousePos[0] < 100 && mousePos[1] > 15 && mousePos[1] < 75 ){
          this.editorSelection[0][0] = 1;
          if (e.type == "mousedown"){
            this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]; 
            this.editorSelection[0][1] = 1;
          }
        } else {
          this.editorSelection[0][0] = 0;
        }
        // box
        if (mousePos[0]>20 && mousePos[0] < 100 && mousePos[1] > 95 && mousePos[1] < 155 ){
          this.editorSelection[1][0] = 1;
          if (e.type == "mousedown"){
            this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]; 
            this.editorSelection[1][1] = 1;
          }
        } else {
          this.editorSelection[1][0] = 0;
        }
        // cross
        if (mousePos[0]>20 && mousePos[0] < 100 && mousePos[1] > 175 && mousePos[1] < 235 ){
          this.editorSelection[2][0] = 1;
          if (e.type == "mousedown"){
            this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]; 
            this.editorSelection[2][1] = 1;
          }
        } else {
          this.editorSelection[2][0] = 0;
        }
        // player
        if (mousePos[0]>20 && mousePos[0] < 100 && mousePos[1] > 255 && mousePos[1] < 315 ){
          this.editorSelection[3][0] = 1;
          if (e.type == "mousedown"){
            this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]; 
            this.editorSelection[3][1] = 1;
          }
        } else {
          this.editorSelection[3][0] = 0;
        }
        // camera
        if (mousePos[0]>20 && mousePos[0] < 100 && mousePos[1] > 335 && mousePos[1] < 395 ){
          this.editorSelection[4][0] = 1;
          if (e.type == "mousedown"){
            this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]; 
            this.editorSelection[4][1] = 1;
          }
        } else {
          this.editorSelection[4][0] = 0;
        }
        // play
        if (mousePos[0]>20 && mousePos[0] < 100 && mousePos[1] > 415 && mousePos[1] < 475 ){
          this.editorSelection[5][0] = 1;
          if (e.type == "mousedown"){
            this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]; 
            this.editorSelection[5][1] = 1;
          }
        } else {
          this.editorSelection[5][0] = 0;
        }
        // import
        if (mousePos[0]>20 && mousePos[0] < 100 && mousePos[1] > 495 && mousePos[1] < 555 ){
          this.editorSelection[6][0] = 1;
          if (e.type == "mousedown"){
            this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]; 
            this.editorSelection[6][1] = 1;
          }
        } else {
          this.editorSelection[6][0] = 0;
        }
        // export
        if (mousePos[0]>20 && mousePos[0] < 100 && mousePos[1] > 575 && mousePos[1] < 635 ){
          this.editorSelection[7][0] = 1;
          if (e.type == "mousedown"){
            this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]; 
            this.editorSelection[7][1] = 1;
          }
        } else {
          this.editorSelection[7][0] = 0;
        }

    }
    placeObject = (e) => {
      var mousePos = [e.pageX, e.pageY];
      var posX =  Math.floor(-this.camera.xDrag/40  + mousePos[0]/40) * 40;
      var posY = Math.floor(-this.camera.yDrag/40 + mousePos[1]/40) * 40;
      var sizeX = 40;
      var sizeY = 40;
      //delete
      if (this.deleteObject) {
        this.walls.forEach((value, index) => {
          if (value.positionX === posX && value.positionY === posY) {
            this.walls.slice(index, 1);
            console.log("delete garey")
            this.deleteObject = false;
          }
        })
      } else if (this.editorSelection[0][1]){
        console.log("banaye")
        this.walls.push(new Wall(this.walls.length, posX, posY, sizeX, sizeY));
      }
    }
    pauseMenuSelection = (e) => {
      var mousePos = [e.pageX, e.pageY];
      if (this.paused){
        // Resume
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 290 && mousePos[1] < 330 ){
          this.menuSelection[0][0] = 1;
          if (e.type == "mousedown"){
            this.menuSelection[0][0] = 0;
            this.paused = false;
          }
        } else {
          this.menuSelection[0][0] = 0;
        }
        // Restart
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 390 && mousePos[1] < 430 ){
          this.menuSelection[0][1] = 1;
          if (e.type == "mousedown"){
            this.menuSelection[0][1] = 0;
            this.walls = [];
            this.tiles = [];
            this.boxes = [];
            this.crosses = [];
            this.player;
            this.paused = false;
          }
        } else {
          this.menuSelection[0][1] = 0;
        }
        // Audio
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 490 && mousePos[1] < 530 ){
          this.menuSelection[0][2] = 1;
          if (e.type == "mousedown"){
            this.menuSelection[0][2] = 0;
          }
        } else {
          this.menuSelection[0][2] = 0;
        }
        // Exit
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 590 && mousePos[1] < 630 ){
          this.menuSelection[0][3] = 1;
          if (e.type == "mousedown"){
            this.menuSelection[0][3] = 0;
            this.paused = false;
            level = null;
          }
        } else {
          this.menuSelection[0][3] = 0;
        }
      }
    }
  
    seeMap = (e) => {
      if (this.canMoveCamera && isDragging && !(e.pageX === startingPos[0] && e.pageY === startingPos[1])) {
        this.camera.xDrag = this.camera.xDrag + (e.pageX - startingPos[0])/25;
        this.camera.yDrag = this.camera.yDrag + (e.pageY - startingPos[1])/25;
      }
    }
}
