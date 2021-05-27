class Story{
  constructor(){
    this.levelCanvas = document.createElement("canvas");
    this.levelCanvas.width = 4500;
    this.levelCanvas.height = 3200;
    this.levelCanvasCtx = this.levelCanvas.getContext("2d");
    this.levelCount = 13;
    this.level = allLevels[this.levelCount];

    this.walls = [];
    this.tiles = [];
    this.houses = [];
    this.berries = [];
    this.flowers = [];
    this.trees = [];
    this.mushrooms = [];
    this.ponds = [];
    this.paths = [];
    this.humans = [];
    this.player;
    getAndMakePlayer(this);
    var gameObjects = {walls: this.walls, tiles: this.tiles, houses: this.houses, berries: this.berries, flowers: this.flowers, trees: this.trees, mushrooms: this.mushrooms, ponds: this.ponds, paths: this.paths, humans: this.humans, player: this.player};
    createLevelObjects(this, this.level, gameObjects);
    this.exit = false; // for quitting
    this.paused = false;
    this.pauseHovered = false;
    this.menuSelection = [[0, 0, 0, 0],[0,0,0]];
    this.pause = document.getElementById("pause");
    this.pauseHoverImg = document.getElementById("pause-hover");
    this.conversation = true;
    this.conversationIndex = 0;
    this.conversationTurnIndex = 0;
    this.storyBegins = true;
    
    this.convoWith = null;
    this.levelOrder = ["Eva", "Kamala", "Samantha", "Jake", "Bob", "Kamara", "Kumar", "Dave", "Eva"];
    this.levelConvo = 0;
    this.missionStart = false;
    this.storySaveData = JSON.parse(getSavedData("storymode"));
    if (this.storySaveData) {
      this.storyBegins = this.storySaveData[2];
      if (!this.storyBegins) this.conversation = false;
      this.levelConvo = this.storySaveData[0];
      if (this.levelConvo > 0) {
        this.levelOrder[0] = "EVA1";
      }
      this.missionStart = this.storySaveData[1];
      this.player.positionX = this.storySaveData[3];
      this.player.positionY = this.storySaveData[4];
      this.player.newPosition = {
        x: this.player.positionX,
        y: this.player.positionY
      }
    }
  }

  getDialogue = () => {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.font = "10px Soko";
    ctx.textAlign = 'center';
    var text;
    if (this.storyBegins) {
      this.conversationIndex = 0;
    }
    text = conversationDialogues[this.conversationIndex][this.conversationTurnIndex]
    if (text) {
      if (this.conversationTurnIndex % 2 === 0) {
        ctx.fillRect(0, height - 150, width, 150);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("You: " + text, width/2, height - 75);
        ctx.fillText("(space key)", width/2, height - 55);
      } else {
        ctx.fillRect(0, 0, width, 150);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(this.convoWith + ": " + text, width/2, 55);
        ctx.fillText("(space key)", width/2, 75);
      }
    } else {
      this.conversationTurnIndex = 0;
      this.conversation = false;
      if (this.storyBegins) {
        this.storyBegins = false;
      }
      if ((this.conversationIndex > 1 && this.conversationIndex % 2 === 0) || this.conversationIndex == this.levelOrder.length - 1) {
        this.missionStart = true;
      }
    }
  }

  drawLevel = () => {
    this.drawLevelObjects();
    ctx.drawImage(this.levelCanvas, this.player.positionX - canvas.width/2.1, this.player.positionY - canvas.height/2.5, width, height, 0, 0, width, height);
    if (this.conversation) {
      this.getDialogue();
    }
    if (!this.paused){
      var pause = this.pause;
      if (this.pauseHovered){
        canvas.style.cursor = "pointer";
        pause = this.pauseHoverImg;
      }
      ctx.drawImage(pause, width - 120, 10, 100 , 100 );
    } else {
      menuContent();
    }
  }

  drawLevelObjects = () => {
    this.tiles.forEach((value)=>{
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.6) {
        value.drawTile(this.levelCanvasCtx);
      }
    })
    this.paths.forEach((value)=>{
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.6) {
        value.drawStuff(this.levelCanvasCtx);
      }
      })
    this.berries.forEach((value) => {
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.6) {
        value.drawStuff(this.levelCanvasCtx);
      }
    })
    this.flowers.forEach((value) => {
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.6) {
        value.drawStuff(this.levelCanvasCtx);
      }
    })
    this.mushrooms.forEach((value) => {
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.6) {
          value.drawStuff(this.levelCanvasCtx);
        }
    })
    this.ponds.forEach((value) => {
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.6) {
        value.drawPond(this.levelCanvasCtx);
      }
    })
    this.player.drawPlayer(this.levelCanvasCtx);
    this.humans.forEach((value)=>{
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.8) {
        value.drawHuman(this.levelCanvasCtx);
      }
    })
    this.walls.forEach((value)=>{
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.7 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.7) {
        value.drawWall(this.levelCanvasCtx);
      }
    })
    this.houses.forEach((value) => {
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.4 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.4) {
        value.drawHouse(this.levelCanvasCtx);
      }
    } )
    this.trees.forEach((value) => {
      if (value.type == "single") {
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.6 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.6) {
          value.drawTree(this.levelCanvasCtx);
        }
      } else {
        if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.2 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.2) {
          value.drawTree(this.levelCanvasCtx);
        }
      }
    })
  }
}