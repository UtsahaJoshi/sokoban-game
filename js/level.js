class Level{
  constructor(levelCount){
    this.levelCanvas = document.createElement("canvas");
    this.levelCanvas.width = 2000;
    this.levelCanvas.height = 2000;
    this.levelCanvasCtx = this.levelCanvas.getContext("2d");

    this.isDragging = false;
    this.levelCount = levelCount;
    this.level = allLevels[this.levelCount];

    this.levelComplete = false;

    this.walls = [];
    this.tiles = [];
    this.boxes = [];
    this.crosses = [];
    this.player;

    this.getAndMakePlayer();
    this.createLevelObjects();
    this.camera = new Camera(this);
    this.exit = false; // for quitting
    this.paused = false;
    this.pauseHovered = false;
    this.selection = [[0, 0, 0, 0],[0,0,0]]
    }
    
    getAndMakePlayer = () => {
      var levLength = this.level.length;
      for(var i = 0; i < levLength; i++){
        var levLineLength = this.level[i].length;
        for(var j = 0; j < levLineLength; j++){
          var positionX = j * 40;
          var positionY =  i * 40;
          var sizeX = 40;
          var sizeY = 40;
          switch(this.level[i][j]){
            case "@":
              this.player = new Player(positionX, positionY, sizeX, sizeY);
              break;
          }
        }
      }
    }

    drawLevel = () => {
      var pause = document.getElementById("pause");
      ctx.clearRect(0, 0, width, height);
      this.camera.getCamPos();
      this.drawLevelObjects();
      (this.camera.isSnapping || this.camera.changeScene) ? this.camera.snapCameraBackInPosition() : 0;
      ctx.drawImage(this.levelCanvas, this.camera.camPosX, this.camera.camPosY, width, height, 0, 0, width, height);
      if (!this.paused){
        if (!this.levelComplete){
          if (this.pauseHovered){
            canvas.style.cursor = "pointer";
            pause = document.getElementById("pause-hover");
          }
          ctx.drawImage(pause, width - 120, 10, 100 , 100 );
          this.checkForLevelComplete();
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
          ctx.fillText("BRAVO!", canvas.width/2, 320);
          ctx.strokeText("BRAVO!", canvas.width/2, 320);
          ctx.font = "15px Soko";
          var lvlCompleteTxt = "LEVEL " + this.levelCount + " COMPLETED!"
          if (this.levelCount === 2){
            lvlCompleteTxt = "ALL LEVELS COMPLETED!"
          }
          ctx.fillText(lvlCompleteTxt, canvas.width/2, 360);
          ctx.font = "20px Soko";
          if (this.selection[1][0] == 1){
            canvas.style.cursor = "pointer";
            ctx.fillText("PLAY AGAIN!", canvas.width/2, 420);
          }
          ctx.strokeText("PLAY AGAIN!", canvas.width/2, 420);
          var nxtLvlTxt = "NEXT LEVEL";
          if (this.levelCount === 2){
            nxtLvlTxt = "START OVER"
          }
          if (this.selection[1][1] == 1){
            canvas.style.cursor = "pointer";
            ctx.fillText(nxtLvlTxt, canvas.width/2, 520);
          }
          ctx.strokeText(nxtLvlTxt, canvas.width/2, 520);
          if (this.selection[1][2] == 1){
            canvas.style.cursor = "pointer";
            ctx.fillText("EXIT", canvas.width/2, 620);
          }
          ctx.strokeText("EXIT", canvas.width/2, 620);
        }
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
        if (this.selection[0][0] == 1){
          canvas.style.cursor = "pointer";
          ctx.fillText("RESUME", canvas.width/2, 320);
        }
        ctx.strokeText("RESUME", canvas.width/2, 320);
        if (this.selection[0][1] == 1){
          canvas.style.cursor = "pointer";
          ctx.fillText("RESTART", canvas.width/2, 420);
        }
        ctx.strokeText("RESTART", canvas.width/2, 420);
        if (this.selection[0][2] == 1){
          canvas.style.cursor = "pointer";
          ctx.fillText("AUDIO: ON", canvas.width/2, 520);
        }
        ctx.strokeText("AUDIO: ON", canvas.width/2, 520);
        if (this.selection[0][3] == 1){
          canvas.style.cursor = "pointer";
          ctx.fillText("EXIT", canvas.width/2, 620);
        }
        ctx.strokeText("EXIT", canvas.width/2, 620);
      }
    }

    checkForLevelComplete = () => {
      var totalSolved = 0;
      this.boxes.forEach((value)=>{
        (value.solved) ? totalSolved += 1 : 0;
       });
       (totalSolved === this.boxes.length) ? this.levelComplete = true : this.levelComplete = false;
       if (this.levelComplete) {
         localStorage.setItem("soko-level-complete", this.levelCount);
         console.log(this.levelCount, mainMenu.levelInStorage)
         if (mainMenu.levelInStorage < this.levelCount) {
          mainMenu.levelInStorage = Number(localStorage.getItem("soko-level-complete"));
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

    createLevelObjects = () => {
      for(var i = 0; i < this.level.length; i++){
        for(var j = 0; j < this.level[i].length; j++){
          var positionX = j * 40;
          var positionY =  i * 40;
          var sizeX = 40;
          var sizeY = 40;
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
        this.player.movePlayer(direction, this.walls, this.boxes);
      }
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
    pauseMenuSelection = (e) => {
      var mousePos = [e.pageX, e.pageY];
      if (this.paused){
        // Resume
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 290 && mousePos[1] < 330 ){
          this.selection[0][0] = 1;
          if (e.type == "mousedown"){
            this.selection[0][0] = 0;
            this.paused = false;
          }
        } else {
          this.selection[0][0] = 0;
        }
        // Restart
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 390 && mousePos[1] < 430 ){
          this.selection[0][1] = 1;
          if (e.type == "mousedown"){
            this.selection[0][1] = 0;
            this.walls = [];
            this.tiles = [];
            this.boxes = [];
            this.crosses = [];
            this.player;
            this.getAndMakePlayer();
            this.createLevelObjects();
            this.paused = false;
          }
        } else {
          this.selection[0][1] = 0;
        }
        // Audio
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 490 && mousePos[1] < 530 ){
          this.selection[0][2] = 1;
          if (e.type == "mousedown"){
            this.selection[0][2] = 0;
          }
        } else {
          this.selection[0][2] = 0;
        }
        // Exit
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 590 && mousePos[1] < 630 ){
          this.selection[0][3] = 1;
          if (e.type == "mousedown"){
            this.selection[0][3] = 0;
            this.paused = false;
            level = null;
          }
        } else {
          this.selection[0][3] = 0;
        }
      }
      if (this.levelComplete){
        // Play Again
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 390 && mousePos[1] < 430 ){
          this.selection[1][0] = 1;
          if (e.type == "mousedown"){
            this.selection[1][0] = 0;
            this.walls = [];
            this.tiles = [];
            this.boxes = [];
            this.crosses = [];
            this.player;
            this.getAndMakePlayer();
            this.createLevelObjects();
            this.levelComplete = false;
          }
        } else {
          this.selection[1][0] = 0;
        }
        // Next Level
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 490 && mousePos[1] < 530 ){
          this.selection[1][1] = 1;
          if (e.type == "mousedown"){
            this.selection[1][1] = 0;
            if (this.levelCount < 12) {
              level = new Level(this.levelCount + 1)
            } else {
              level = new Level(1)
            }
          }
        } else {
          this.selection[1][1] = 0;
        }
        // Exit
        if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 590 && mousePos[1] < 630 ){
          this.selection[1][2] = 1;
          if (e.type == "mousedown"){
            this.selection[1][2] = 0;
            this.levelComplete = false;
            level = null;
          }
        } else {
          this.selection[1][2] = 0;
        }
      }
    }
    seeMap = (e) => {
      if (isDragging && !(e.pageX === startingPos[0] && e.pageY === startingPos[1])) {
        this.camera.xDrag = this.camera.xDrag + (e.pageX - startingPos[0])/25;
        this.camera.yDrag = this.camera.yDrag + (e.pageY - startingPos[1])/25;
      }
    }
}
