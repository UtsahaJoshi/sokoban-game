class LevelEditor{
  constructor(){
    this.levelCanvas = document.createElement("canvas");
    this.levelCanvas.width = 2000;
    this.levelCanvas.height = 2000;
    this.levelCanvasCtx = this.levelCanvas.getContext("2d");
    this.walls = [];
    this.boxes = [];
    this.crosses = [];
    this.player = null;
    this.gameObjects = {walls: this.walls, boxes: this.boxes, crosses: this.crosses, player: this.player};
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
    this.deleteImg = document.getElementById("delete");
    this.playerImg = document.getElementById("player-down-1");
    this.playerImgBackup = document.getElementById("player-down-1");
    this.playImg = document.getElementById("playbtn");
    this.exportImg = document.getElementById("import");
    this.importImg = document.getElementById("export");
    this.fileInput = document.getElementById('file-input');
    
    this.canMoveCamera = false;
    this.errorStatement = null;
    }
    // draw level editor
    drawLevel = () => {
      var pause = document.getElementById("pause");
      this.levelCanvasCtx.clearRect(0, 0, 2000, 2000);
      this.levelCanvasCtx.fillStyle = "#ebebeb";
      this.levelCanvasCtx.fillRect(0,0,this.levelCanvas.width, this.levelCanvas.height);
      ctx.clearRect(0, 0, width, height);
      this.camera.getCamPos();
      this.drawLevelObjects();
      if (this.camera.isSnapping) this.camera.snapCameraBackInPosition();
      ctx.drawImage(this.levelCanvas, this.camera.camPosX - 150, this.camera.camPosY, width, height, 0, 0, width, height);
      this.drawEditorTools();
      if (!this.paused){
        if (this.pauseHovered){
          canvas.style.cursor = "pointer";
          pause = document.getElementById("pause-hover");
        }
        if (this.errorStatement) {
          ctx.fillStyle = "#000000";
          ctx.fillRect(width/2 - 300, height/2 - 230, 600, 50);
          ctx.font = "10px Soko";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText(this.errorStatement, width/2, height/2 - 200);
        }
        ctx.drawImage(pause, width - 120, 10, 100 , 100 );
      } else {
        menuContent();
      }
    }

    //draw editor tool side bar
    drawEditorTools = () => {
      this.canMoveCamera = false;
      if (this.editorSelection[4][1]) this.canMoveCamera = true;
      var tools = [this.wallImg, this.boxImg, this.crossImg, this.deleteImg, this.cameraImg, this.playerImg, this.exportImg, this.importImg];
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

    //draw objects inside the level editor
    drawLevelObjects = () => {
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

    // show error mssg
    getError = (levelData) => {
      if (!this.errorStatement) {
        this.errorStatement = levelData;
        setTimeout(() => {
          this.errorStatement = null;
          this.editorSelection[5][1] = 0;
        }, 1000);
      }
    }

    // side bar editor tool selection 
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
        // delete
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
        // player & play
        if (mousePos[0]>20 && mousePos[0] < 100 && mousePos[1] > 415 && mousePos[1] < 475 ){
          this.editorSelection[5][0] = 1;
          if (e.type == "mousedown"){
            this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]];
            this.editorSelection[5][1] = 1;
            if (this.player){
              var levelData = this.getLevelData();
              if (Array.isArray(levelData)){
                levelEditor = level;
                level = null;
                level = new Level(null, levelData);
              } else {
                this.getError(levelData);
              }
            }
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
            this.importLevelData();
            this.editorSelection[6][1] = 0;
          }
        } else {
          this.editorSelection[6][0] = 0;
        }
        // export
        if (mousePos[0]>20 && mousePos[0] < 100 && mousePos[1] > 575 && mousePos[1] < 635 ){
          this.editorSelection[7][0] = 1;
          if (e.type == "mousedown"){
            this.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]; 
            this.exportLevelData();
          }
        } else {
          this.editorSelection[7][0] = 0;
        }

    }

    // file reader
    onReaderLoad = (event) =>{
      var levelData = JSON.parse(event.target.result);
      var gameObjects = {walls: this.walls, boxes: this.boxes, crosses: this.crosses, player: this.player};
      if (typeof levelData === 'object') {
        resetGameObjects(gameObjects);
        createLevelObjects(this, levelData, gameObjects);
        this.playerImg = this.playImg;
      } else {
        var errorMsg = "Import Data Invalid";
        this.getError(errorMsg);
      }
      this.fileInput.value = "";
    }

    // import file
    importLevelData = () => {
      this.fileInput.type = 'file';
      this.fileInput.onchange = e => { 
        var reader = new FileReader();
        reader.onload = this.onReaderLoad;
        reader.readAsText(e.target.files[0]);
      }
    
      this.fileInput.click();
    }

    // export file
    exportLevelData = async () => {
      var levelData = this.getLevelData();
      if (!Array.isArray(levelData)) {
        this.getError(levelData);
        return;
      }

      var myData = {
        0: levelData
      };
      const fileName = "myLevelData";
      const json = JSON.stringify(myData);
      const blob = new Blob([json],{type:'application/json'});
      const href = await URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // check if object can be put in position
    canPutObject = (posX, posY, exception) => {
      var hasAlreadyOccupied = false;
      var allObjects = [this.crosses, this.walls, this.boxes];
      allObjects.forEach((obj, index) => {
        obj.forEach((value) => {
          if (value.positionX === posX && value.positionY === posY) {
            hasAlreadyOccupied = true;
            if (exception && index === 0) {
              hasAlreadyOccupied = false;
            }
          }
        })
      })
      if (this.player && this.player.positionX === posX && this.player.positionY === posY){
        hasAlreadyOccupied = true;
      }
      return !hasAlreadyOccupied;
    }

    //place object
    placeObject = (e) => {
      if (this.paused) {
        return;
      }
      var mousePos = [e.pageX, e.pageY];
      var posX =  Math.floor(-(this.camera.xDrag+150)/40  + mousePos[0]/40) * 40;
      var posY = Math.floor(-this.camera.yDrag/40 + mousePos[1]/40) * 40;
      if (posX < 0 || posX > 2000 || posY < 0 || posY > 2000) {
        return;
      }
      var sizeX = 40;
      var sizeY = 40;
      //make wall
      if (this.editorSelection[0][1]){
        if (this.canPutObject(posX, posY)){
          this.walls.push(new Wall(this.walls.length, posX, posY, sizeX, sizeY));
          
        }
      }
      // make box
      if (this.editorSelection[1][1]){
        if (this.canPutObject(posX, posY, true)) {
          this.boxes.push(new Box(this.boxes.length, posX, posY, sizeX, sizeY));
        }
      }
      // make cross
      if (this.editorSelection[2][1]){
        if (this.canPutObject(posX, posY)){
          this.crosses.push(new Cross(this.crosses.length, posX, posY, sizeX, sizeY));
        }
      }
      // make player
      if (this.editorSelection[5][1] && !this.player){
        if (this.canPutObject(posX, posY, true)) {
          this.player = new Player(posX, posY, sizeX, sizeY);
          this.playerImg = this.playImg;
          this.editorSelection[5][1] = 0;
        }
      }
      //delete
      if (this.editorSelection[3][1]) {
        this.walls.forEach((value, index) => {
          if (value.positionX === posX && value.positionY === posY) {
            this.walls.splice(index, 1);
          }
        })
        this.boxes.forEach((value, index) => {
          if (value.positionX === posX && value.positionY === posY) {
            this.boxes.splice(index, 1);
          }
        })
        this.crosses.forEach((value, index) => {
          if (value.positionX === posX && value.positionY === posY) {
            this.crosses.splice(index, 1);
          }
        })
        if (this.player && posX === this.player.positionX && posY === this.player.positionY) {
          this.player = null;
          this.playerImg = this.playerImgBackup;
        }
      }
    }

    getLevelData = () => {
      var totalBoxes = this.boxes.length;
      var totalCrosses = this.crosses.length;
      var totalWalls = this.walls.length;
      var levelData = [];
      var errorMsg = null;

      if (!totalBoxes) {
        return "Must add atleast one box to the level."
      }
      if (!totalCrosses) {
        return "Must add atleast one box-goal to the level."
      }
      if (totalBoxes !== totalCrosses) {
        return "Boxes and goals should be equal in number.";
      }
      if (!totalWalls || totalWalls < 12) {
        return "Must add atleast 12 walls to the level.";
      }

      //get least and max values of the walls
      wallLeastPosX = this.walls[0].positionX;
      wallLeastPosY = this.walls[0].positionY;
      wallMaxPosX = this.walls[0].positionX;
      wallMaxPosY = this.walls[0].positionY;
      this.walls.forEach((value) => {
        if (value.positionX < wallLeastPosX) wallLeastPosX = value.positionX;
        if (value.positionY < wallLeastPosY) wallLeastPosY = value.positionY;
        if (value.positionX > wallMaxPosX) wallMaxPosX = value.positionX;
        if (value.positionY > wallMaxPosY) wallMaxPosY = value.positionY;
      })

      // check if level data is valid
      for(var i = wallLeastPosY; i<=wallMaxPosY; i+=40){
        levelData.push("");
        for(var j = wallLeastPosX; j<=wallMaxPosX; j+=40){
          var hasAddedChar = false;
          this.walls.forEach((value) => {
            if (value.positionX === j && value.positionY === i) {
              levelData[levelData.length-1] = levelData[levelData.length-1] + "#";
              hasAddedChar = true;
            }
          })
          this.boxes.forEach((value) => {
            //check for out of bounds
            if (value.positionX < wallLeastPosX || value.positionX > wallMaxPosX || value.positionY < wallLeastPosY || value.positionY > wallMaxPosY) {
              errorMsg = "Box is out of bounds";
            }
            //convert to json txt
            if (value.positionX === j && value.positionY === i) {
              levelData[levelData.length-1] = levelData[levelData.length-1] + "+";
              hasAddedChar = true;
            }
          })
          if (errorMsg) {
            return errorMsg;
          }
          this.crosses.forEach((value) => {
            //check for out of bounds
            if (value.positionX < wallLeastPosX || value.positionX > wallMaxPosX || value.positionY < wallLeastPosY || value.positionY > wallMaxPosY) {
              errorMsg = "Cross is out of bounds";
            }
            //convert to json txt
            if (value.positionX === j && value.positionY === i) {
              if (hasAddedChar) {
                levelData[levelData.length-1] = levelData[levelData.length-1].slice(0, -1) + "&";
              } else {
                levelData[levelData.length-1] = levelData[levelData.length-1] + "*";
              }
              hasAddedChar = true;
            }
          })
          if (errorMsg) {
            return errorMsg;
          }
          if (!this.player) {
            return "Player not added."
          }
          //check for out of bounds
          if (this.player.positionX < wallLeastPosX || this.player.positionX > wallMaxPosX || this.player.positionY < wallLeastPosY || this.player.positionY > wallMaxPosY) {
            return "Player is out of bound.";
          }
          //convert to json txt
          if (this.player.positionX === j && this.player.positionY === i) {
            if (hasAddedChar) {
              levelData[levelData.length-1] = levelData[levelData.length-1].slice(0,-1) + "$";
            } else {
              levelData[levelData.length-1] = levelData[levelData.length-1] + "@";
            }
            hasAddedChar = true;
          }
          if (!hasAddedChar) levelData[levelData.length-1] = levelData[levelData.length-1] + "=";
        }
      }
      return levelData;
    }
}
