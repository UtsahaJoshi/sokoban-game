class Story{
  constructor(){
    this.levelCanvas = document.createElement("canvas");
    this.levelCanvas.width = 4500;
    this.levelCanvas.height = 3200;
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
    this.trees = [];
    this.mushrooms = [];
    this.ponds = [];
    this.paths = [];
    this.humans = [];
    this.player;
    this.getAndMakePlayer();
    this.createLevelObjects();
    this.exit = false; // for quitting
    this.paused = false;
    this.pauseHovered = false;
    this.selection = [[0, 0, 0, 0],[0,0,0]];
    this.pause = document.getElementById("pause");
    this.pauseHoverImg = document.getElementById("pause-hover");
    this.conversation = true;
    this.conversationIndex = 0;
    this.conversationTurnIndex = 0;
    this.storyBegins = true;
    this.conversationDialogues = {
      0: {0 : "Such a lovely town! I'm sure I can find a job here. Let me ask around."},
      1: {0 : "Hey! I'm new in town.", 1 : "Welcome! Come to the party tonight!", 2: "Where exactly!", 3: "You will know soon.", 4: "Okay! Excited!"},
      2: {0 : "Small Town Sokoban at your service!", 1: "Such a life saver. My friend, Kamala, needs some help!", 2: "Where is she?", 3: "Not sure please find her!"},
      3: {0 : "Kamala, right! Anything I can help you with?", 1 : "Oh yes! I was looking for you.", 2: "I'm listening", 3: "Can you please go inside and do what's necessary. Thanks!", 4: "At your service."},
      4: {0 : "Samantha, wassup!", 1 : "Hey! I just moved here from my other house.", 2: "That's cool!", 3: "Ya! but I need to move some boxes from my other house!", 4: "I can do that for you.", 5: "Will you! Sure, its the house next to the pond.", 6: "Which color is the house?", 7: "The same as this one.", 8: "Gotcha!", 9: "But you need to get the key from Jake first.", 10: "Who?", 11: "Jake!. He is the one who bought my old house!", 12: "Any clue as to where he is?", 13: "Well, he likes flowers!", 14: "I could win who wants to be a millionaire with that clue.", 15: "Haha! You're funny neighbour."},
      5: {0 : "Samantha sent me!", 1: "Oh! cool. You probably need the key.", 2: "Very smart, Jake!", 3: "Here you go! Do return it!", 4: "I...will...if....I...don't....lose....it....or....my...mind...haha", 5: "You sure will win the town with that sense of humour 😑.", 6: "You will get the key in an hour. Peace!"},
      6: {0: "The famous Bob! Isn't it!", 1: "Indeed! The greatest adventurer you have met!", 2: "And what adventure are you up to now?", 3: "Top Secret!", 4: "You can tell me.", 5: "Me and the soldier are plannig something big.", 6: "Hmm, the soldier?", 7: "Yes! We are planning to go to the mountains as soon as we meet.", 8: "Where is the soldier then.", 9: "IDK! Tell him i'm looking for him."},
      7: {0: "You have plans with Bob? He is looking for you.", 1: "Argh! That nimwit. I'm not going to mountains with him.", 2: "But he is waiting for you.", 3: "Then why don't you go instead of me?", 4: "........", 5: "That's what I thought. I have been hiding here since the morning.", 6: "Damn! Is there anything else I can help you with?", 7: "Yes. My house is right next to yours. I need my stuff arranged.", 8: "Sure!", 9: "I had packed them up to go with Bob. But I don't need them now!", 10: "Bob will be dissapointed.", 11: "I knowwww!"},
      8: {0: "Hello, friend!", 1: "Hey! Sokoban heard alot about you during the day. Finally met you.", 2: "Did you? Thanks.", 3: "Yes, and I do have a job for you.", 4: "I'm all ears!", 5: "Go see Dave and he will tell you what to do. Dave works for me.", 6: "Okay, I will find him.", 7: "Good luck!"},
      9: {0: "Kumar said you have a job for me.", 1: "Sure I do. Kumar sir is opening a store soon.", 2: "That's great.", 3: " We had some products delivered to us yesterday.", 4: "Want me to arrange and store them?", 5: "Yes sir they are at my house right now.", 6: "Sokoban is at it."},
      10: {0: "Hey, Eva where is the party?", 1: "At your place. surprise, surprise!", 2: "But my place is a mess.", 3: "Go get it cleaned up.", 4: "But I'll have to cook for you guys too.", 5: "Don't worry about food. We got you.", 6: "Sweet! Okay, I will go clean my house up."}
    }
    this.convoWith = null;
    this.levelOrder = ["Eva", "Kamala", "Samantha", "Jake", "Bob", "Kamara", "Kumar", "Dave", "Eva"];
    this.levelConvo = 0;
    this.missionStart = false;
    this.storySaveData = JSON.parse(localStorage.getItem("storymode"));
    if (this.storySaveData) {
      this.storyBegins = this.storySaveData[2];
      (!this.storyBegins) ? this.conversation = false : 0;
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

  getDialogue = () => {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.font = "10px Soko";
    ctx.textAlign = 'center';
    var text;
    if (this.storyBegins) {
      this.conversationIndex = 0;
    }
    text = this.conversationDialogues[this.conversationIndex][this.conversationTurnIndex]
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
    var pause = this.pause;
    this.drawLevelObjects();
    ctx.drawImage(this.levelCanvas, this.player.positionX - canvas.width/2.1, this.player.positionY - canvas.height/2.5, width, height, 0, 0, width, height);
    if (this.conversation) {
      this.getDialogue();
    }
    if (!this.paused){
      if (!this.levelComplete){
        if (this.pauseHovered){
          canvas.style.cursor = "pointer";
          pause = this.pauseHoverImg;
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
        ctx.fillText("SAVE", canvas.width/2, 420);
      }
      ctx.strokeText("SAVE", canvas.width/2, 420);
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
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.6) {
        value.drawTile(this.levelCanvasCtx);
      }
    })
    this.paths.forEach((value)=>{
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.6) {
        value.drawStuff(this.levelCanvasCtx);
      }
      })
    this.crosses.forEach((value)=>{
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.6) {
        value.drawCross(this.levelCanvasCtx);
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
    this.boxes.forEach((value)=>{
      if (Math.abs(this.player.positionX - value.positionX) < canvas.width/1.8 && Math.abs(this.player.positionY - value.positionY) < canvas.height/1.8) {
        value.drawBox(this.levelCanvasCtx);
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

  createLevelObjects = () => {
    var levLength = this.level.length;
    for(var i = 0; i < levLength; i++){
      var levLineLength = this.level[i].length;
      for(var j = 0; j < levLineLength; j++){
        var positionX = j * 40;
        var positionY =  i * 40;
        var sizeX = 40;
        var sizeY = 40;
        switch(this.level[i][j]){
          case "#":
            this.walls.push(new Wall(this.walls.length, positionX, positionY, sizeX, sizeY));
            break;
          case "@":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.player = new Player(positionX, positionY, sizeX, sizeY);
            break;
          case "R":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.houses.push(new House(this.houses.length, "red", positionX, positionY, sizeX*5, sizeY*5));
            break;
          case "B":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.houses.push(new House(this.houses.length, "blue", positionX, positionY, sizeX*5, sizeY*5));
            break;
          case "G":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.houses.push(new House(this.houses.length, "green", positionX, positionY, sizeX*5, sizeY*5));
            break;
          case "b":
            this.berries.push(new noCollisionStuffs(this.berries.length, "berries", positionX, positionY, sizeX, sizeY));
            break;
          case "f":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.flowers.push(new noCollisionStuffs(this.flowers.length, "flowers", positionX, positionY, sizeX, sizeY));
            break;
          case "m":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.mushrooms.push(new noCollisionStuffs(this.mushrooms.length, "mushroom", positionX, positionY, sizeX, sizeY));
            break;
          case "t":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.trees.push(new Tree(this.trees.length, "single", positionX, positionY, sizeX, sizeY));
            break;
          case "T":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.trees.push(new Tree(this.trees.length, "group", positionX, positionY, sizeX, sizeY));
            break;
          case "P":
            this.ponds.push(new Pond(this.ponds.length, positionX, positionY, sizeX*3, sizeY*3));
            break;
          case "/":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.humans.push(new Human(this.humans.length, "male-dark", positionX, positionY, sizeX, sizeY))
            break;
          case "!":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.humans.push(new Human(this.humans.length, "male-pale", positionX, positionY, sizeX, sizeY))
            break;
          case "|":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.humans.push(new Human(this.humans.length, "female-dark", positionX, positionY, sizeX, sizeY))
            break;
          case "?":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.humans.push(new Human(this.humans.length, "female-pale", positionX, positionY, sizeX, sizeY))
            break;
          case "<":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.humans.push(new Human(this.humans.length, "kid1", positionX, positionY, sizeX, sizeY))
            break;
          case ">":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.humans.push(new Human(this.humans.length, "kid2", positionX, positionY, sizeX, sizeY))
            break;
          case "^":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.humans.push(new Human(this.humans.length, "kid3", positionX, positionY, sizeX, sizeY))
            break;
          case "-":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            this.humans.push(new Human(this.humans.length, "soldier", positionX, positionY, sizeX, sizeY))
            break;
          case " ":
            this.paths.push(new noCollisionStuffs(this.paths.length, "path", positionX, positionY, sizeX, sizeY));
            break;
          case "=":
            this.tiles.push(new Tile(this.tiles.length, positionX, positionY, sizeX, sizeY));
            break;
        }
      }
    }
  }

  playerControl = (event) => {
    var key = event.code;
    if (!this.conversation) {
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
        case "Space":
          this.humans.forEach((value)=>{
            if (Math.abs(this.player.positionX - value.positionX) <= 40 && Math.abs(this.player.positionY - value.positionY) <= 40) {
              this.conversation = true;
              this.convoWith = value.nickName;
              console.log(this.levelOrder)
              console.log(this.convoWith, this.levelConvo, this.levelOrder.indexOf(this.convoWith));
              if (this.levelConvo === this.levelOrder.indexOf(this.convoWith)){
                this.conversationIndex = 2 + this.levelConvo;
              } else if (this.missionStart && this.levelConvo + 1 === this.levelOrder.indexOf(this.convoWith)) {
                this.conversationIndex = 2 + this.levelConvo + 1;
              } else if (this.levelConvo === this.levelOrder.indexOf(this.convoWith) + 1) {
                this.conversationIndex = 2 + this.levelConvo - 1;
              } else {
                this.conversationIndex = 1;
              }
              console.log(this.levelConvo, this.convoWith, this.missionStart, this.conversationIndex)
            }
          })
          this.houses.forEach((value)=>{
            if (this.missionStart && this.player.positionX - value.positionX === 80 && this.player.positionY - value.positionY === 200) {
              console.log(this.player.positionX, this.player.positionY)
              if (this.levelConvo === 0 && this.player.positionX === 2080 && this.player.positionY === 480) {
                story = level;
                level = new Level(1);
              }
              console.log(this.player.positionX, this.player.positionY);
              if (this.levelConvo === 2 && this.player.positionX === 3480 && this.player.positionY === 840) {
                story = level;
                level = new Level(2);
              }
              if (this.levelConvo === 4 && this.player.positionX === 2040 && this.player.positionY === 2000) {
                story = level;
                level = new Level(3);
              }
              if (this.levelConvo === 6 && this.player.positionX === 720 && this.player.positionY === 400) {
                story = level;
                level = new Level(4);
              }
              if (this.levelConvo === 8 && this.player.positionX === 3080 && this.player.positionY === 2000) {
                story = level;
                level = new Level(5);
              }
            }
          })
          break;
      }
      this.player.movePlayer(direction);
    } else {
      if (key === "Space") {
        this.conversationTurnIndex++;
      }
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
      // Save
      if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 390 && mousePos[1] < 430 ){
        this.selection[0][1] = 1;
        if (e.type == "mousedown"){
          this.selection[0][1] = 0;
          localStorage.setItem("storymode", JSON.stringify([this.levelConvo, this.missionStart, this.storyBegins, this.player.positionX, this.player.positionY]));
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
}
