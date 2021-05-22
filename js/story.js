class Story{
  constructor(){
    this.levelCanvas = document.createElement("canvas");
    this.levelCanvas.width = 4500;
    this.levelCanvas.height = 4000;
    this.levelCanvasCtx = this.levelCanvas.getContext("2d");
    this.isDragging = false;
    this.levelCount = 13;
    this.level = allLevels[this.levelCount];

    this.levelComplete = false;

    this.walls = [];
    this.tiles = [];
    this.boxes = [];
    this.crosses = [];
    this.houses = [];
    this.berries = [];
    this.flowers = [];
    this.flowerPotBig = [];
    this.flowerPotSmall = [];
    this.trees = [];
    this.mushrooms = [];
    this.ponds = [];
    this.paths = [];
    this.humans = [];
    this.player;

    this.getAndMakePlayer();
    this.createLevelObjects();
    this.camera = new Camera(this);
    this.exit = false; // for quitting
    this.paused = false;
    this.pauseHovered = false;
    this.selection = [[0, 0, 0, 0],[0,0,0]];
    this.isStory = true;
    }
    
    getAndMakePlayer = () => {
      for(var i = 0; i < this.level.length; i++){
        for(var j = 0; j < this.level[i].length; j++){
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
      ctx.drawImage(this.levelCanvas, this.player.positionX - canvas.width/2.1, this.player.positionY - canvas.height/2.5, width, height, 0, 0, width, height);
      if (!this.paused){
        if (!this.levelComplete){
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

    drawLevelObjects = () => {
      this.tiles.forEach((value)=>{
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width && Math.abs(this.player.positionY - value.positionY) < canvas.height) {
          value.drawTile(this.levelCanvasCtx);
        }
      })
      this.crosses.forEach((value)=>{
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width && Math.abs(this.player.positionY - value.positionY) < canvas.height) {
          value.drawCross(this.levelCanvasCtx);
        }
      })
      this.berries.forEach((value) => {
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width && Math.abs(this.player.positionY - value.positionY) < canvas.height) {
          value.drawStuff(this.levelCanvasCtx);
        }
      })
      this.flowers.forEach((value) => {
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width && Math.abs(this.player.positionY - value.positionY) < canvas.height) {
          value.drawStuff(this.levelCanvasCtx);
        }
      })
      this.mushrooms.forEach((value) => {
          if (Math.abs(this.player.positionX - value.positionX) < canvas.width && Math.abs(this.player.positionY - value.positionY) < canvas.height) {
            value.drawStuff(this.levelCanvasCtx);
          }
      })
      this.ponds.forEach((value) => {
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width && Math.abs(this.player.positionY - value.positionY) < canvas.height) {
          value.drawPond(this.levelCanvasCtx);
        }
      })
      this.boxes.forEach((value)=>{
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width && Math.abs(this.player.positionY - value.positionY) < canvas.height) {
          value.drawBox(this.levelCanvasCtx);
        }
       })
      this.player.drawPlayer(this.levelCanvasCtx);
      this.humans.forEach((value)=>{
          value.drawHuman(this.levelCanvasCtx);
       })
      this.walls.forEach((value)=>{
          if (Math.abs(this.player.positionX - value.positionX) < canvas.width && Math.abs(this.player.positionY - value.positionY) < canvas.height) {
            value.drawWall(this.levelCanvasCtx);
          }
      })
      this.houses.forEach((value) => {
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width && Math.abs(this.player.positionY - value.positionY) < canvas.height) {
          value.drawHouse(this.levelCanvasCtx);
        }
      } )
      this.trees.forEach((value) => {
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width && Math.abs(this.player.positionY - value.positionY) < canvas.height) {
          value.drawTree(this.levelCanvasCtx);
        }
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
            case "R":
              this.houses.push(new House(this.houses.length, "red", positionX, positionY, sizeX*5, sizeY*5));
              break;
            case "B":
              this.houses.push(new House(this.houses.length, "blue", positionX, positionY, sizeX*5, sizeY*5));
              break;
            case "G":
              this.houses.push(new House(this.houses.length, "green", positionX, positionY, sizeX*5, sizeY*5));
              break;
            case "b":
              this.berries.push(new noCollisionStuffs(this.berries.length, "berries", positionX, positionY, sizeX, sizeY));
              break;
            case "f":
              this.flowers.push(new noCollisionStuffs(this.flowers.length, "flowers", positionX, positionY, sizeX, sizeY));
              break;
            case "m":
              this.mushrooms.push(new noCollisionStuffs(this.mushrooms.length, "mushroom", positionX, positionY, sizeX, sizeY));
              break;
            case "t":
              this.trees.push(new Tree(this.trees.length, "single", positionX, positionY, sizeX, sizeY));
              break;
            case "T":
              this.trees.push(new Tree(this.trees.length, "group", positionX, positionY, sizeX, sizeY));
              break;
            case "P":
              this.ponds.push(new Pond(this.ponds.length, positionX, positionY, sizeX*3, sizeY*3));
              break;
            case "/":
              this.humans.push(new Human(this.humans.length, "male-dark", positionX, positionY, sizeX, sizeY))
              break;
            case "!":
              this.humans.push(new Human(this.humans.length, "male-pale", positionX, positionY, sizeX, sizeY))
              break;
            case "|":
              this.humans.push(new Human(this.humans.length, "female-dark", positionX, positionY, sizeX, sizeY))
              break;
            case "?":
              this.humans.push(new Human(this.humans.length, "female-pale", positionX, positionY, sizeX, sizeY))
              break;
            case "<":
              this.humans.push(new Human(this.humans.length, "kid1", positionX, positionY, sizeX, sizeY))
              break;
            case ">":
              this.humans.push(new Human(this.humans.length, "kid2", positionX, positionY, sizeX, sizeY))
              break;
            case "^":
              this.humans.push(new Human(this.humans.length, "kid3", positionX, positionY, sizeX, sizeY))
              break;
            case "-":
              this.humans.push(new Human(this.humans.length, "soldier", positionX, positionY, sizeX, sizeY))
              break;
            case " ":
              this.mushrooms.push(new noCollisionStuffs(this.mushrooms.length, "path", positionX, positionY, sizeX, sizeY));
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
        this.player.movePlayer(direction);
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
