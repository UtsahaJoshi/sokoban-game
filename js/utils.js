var logo = document.getElementById("logo");
var face = document.getElementById("face");
var audio = true;

const RIGHT = "right";
const LEFT = "left";
const UP = "up";
const DOWN = "down";

var wallLeastPosX;
var wallLeastPosY;
var wallMaxPosX;
var wallMaxPosY;

// a function to create level objects in story, level and level editor
createLevelObjects = (levelObject, levelData, gameObjects) => {
  const STORY_MODE = levelObject.levelCount === 13;
  const LEVEL_EDITOR = levelObject.levelCount === 14;
  if (LEVEL_EDITOR) {
    levelData = levelData[0];
  }
  for(var i = 0; i < levelData.length; i++){
    for(var j = 0; j < levelData[i].length; j++){
      var sizeX = 40;
      var sizeY = 40;
      var positionX = j * sizeX;
      var positionY =  i * sizeY;
      if (!LEVEL_EDITOR && !STORY_MODE) {
        gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
      }
      switch(levelData[i][j]){
        case "#":
          gameObjects.walls.push(new Wall(gameObjects.walls.length, positionX, positionY, sizeX, sizeY));
          break;
        case "+":
          gameObjects.boxes.push(new Box(gameObjects.boxes.length, positionX, positionY, sizeX, sizeY));
          break;
        case "@":
          if (STORY_MODE){
            gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          }
          levelObject.player = new Player(positionX, positionY, sizeX, sizeY);
          break;
        case "*":
          gameObjects.crosses.push(new Cross(gameObjects.crosses.length, positionX, positionY, sizeX, sizeY));
          break;
        case "&":
          gameObjects.crosses.push(new Cross(gameObjects.crosses.length, positionX, positionY, sizeX, sizeY));
          gameObjects.boxes.push(new Box(gameObjects.boxes.length, positionX, positionY, sizeX, sizeY));
          break;
        case "$":
          gameObjects.crosses.push(new Cross(gameObjects.crosses.length, positionX, positionY, sizeX, sizeY));
          gameObjects.player = new Player(positionX, positionY, sizeX, sizeY);
          break;
        case "R":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.houses.push(new House(gameObjects.houses.length, "red", positionX, positionY, sizeX*5, sizeY*5));
          break;
        case "B":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.houses.push(new House(gameObjects.houses.length, "blue", positionX, positionY, sizeX*5, sizeY*5));
          break;
        case "G":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.houses.push(new House(gameObjects.houses.length, "green", positionX, positionY, sizeX*5, sizeY*5));
          break;
        case "b":
          gameObjects.berries.push(new NoneColliders(gameObjects.berries.length, "berries", positionX, positionY, sizeX, sizeY));
          break;
        case "f":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.flowers.push(new NoneColliders(gameObjects.flowers.length, "flowers", positionX, positionY, sizeX, sizeY));
          break;
        case "m":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.mushrooms.push(new NoneColliders(gameObjects.mushrooms.length, "mushroom", positionX, positionY, sizeX, sizeY));
          break;
        case "t":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.trees.push(new Tree(gameObjects.trees.length, "single", positionX, positionY, sizeX, sizeY));
          break;
        case "T":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.trees.push(new Tree(gameObjects.trees.length, "group", positionX, positionY, sizeX, sizeY));
          break;
        case "P":
          gameObjects.ponds.push(new Pond(gameObjects.ponds.length, positionX, positionY, sizeX*3, sizeY*3));
          break;
        case "/":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.humans.push(new Human(gameObjects.humans.length, "male-dark", positionX, positionY, sizeX, sizeY))
          break;
        case "!":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.humans.push(new Human(gameObjects.humans.length, "male-pale", positionX, positionY, sizeX, sizeY))
          break;
        case "|":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.humans.push(new Human(gameObjects.humans.length, "female-dark", positionX, positionY, sizeX, sizeY))
          break;
        case "?":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.humans.push(new Human(gameObjects.humans.length, "female-pale", positionX, positionY, sizeX, sizeY))
          break;
        case "<":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.humans.push(new Human(gameObjects.humans.length, "kid1", positionX, positionY, sizeX, sizeY))
          break;
        case ">":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.humans.push(new Human(gameObjects.humans.length, "kid2", positionX, positionY, sizeX, sizeY))
          break;
        case "^":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.humans.push(new Human(gameObjects.humans.length, "kid3", positionX, positionY, sizeX, sizeY))
          break;
        case "-":
          gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          gameObjects.humans.push(new Human(gameObjects.humans.length, "soldier", positionX, positionY, sizeX, sizeY))
          break;
        case " ":
          if (STORY_MODE) {
            gameObjects.paths.push(new NoneColliders(gameObjects.paths.length, "path", positionX, positionY, sizeX, sizeY));
          }
          break;
        case "=":
          if (STORY_MODE) {
            gameObjects.tiles.push(new Tile(gameObjects.tiles.length, positionX, positionY, sizeX, sizeY));
          }
          break;
      }
    }
  }
}

// a function to get and make player for gameplay
getAndMakePlayer = (levelObject) => {
  var levLength = levelObject.level.length;
  for(var i = 0; i < levLength; i++){
    var levLineLength = levelObject.level[i].length;
    for(var j = 0; j < levLineLength; j++){
      var positionX = j * 40;
      var positionY =  i * 40;
      var sizeX = 40;
      var sizeY = 40;
      switch(levelObject.level[i][j]){
        case "@":
          levelObject.player = new Player(positionX, positionY, sizeX, sizeY);
          break;
        case "$":
          levelObject.player = new Player(positionX, positionY, sizeX, sizeY);
          break;
      }
    }
  }
}

//reset the gameObjects
resetGameObjects = (gameObjects) => {
  level.player = null;
 Object.entries(gameObjects).forEach((value) => {
    gameObjects[value[0]].length = 0;
 })
}

// player control for all modes
playerControl = (event) => {
  if (level.levelCount !==13) {
    if (level.camera.xDrag !== 0 || level.camera.yDrag !==0) level.camera.isSnapping = true;
    if (level.camera.isSnapping) return;
  }
  var key = event.code;
  if (level.levelCount !== 13 || (level.levelCount === 13 && !level.conversation)) {
    var direction;
    switch(key){
      case "ArrowRight":
        direction = RIGHT;
        break;
      case "ArrowLeft":
        direction = LEFT;
        break;
      case "ArrowUp":
        direction = UP;
        break;
      case "ArrowDown":
        direction = DOWN;
        break;
      case "Space":
        if (level.levelCount === 13) {
          level.humans.forEach((value)=>{
            if (Math.abs(level.player.positionX - value.positionX) <= 40 && Math.abs(level.player.positionY - value.positionY) <= 40) {
              level.conversation = true;
              level.convoWith = value.nickName;
              if (level.levelConvo === level.levelOrder.indexOf(level.convoWith)){
                level.conversationIndex = 2 + level.levelConvo;
              } else if (level.missionStart && level.levelConvo + 1 === level.levelOrder.indexOf(level.convoWith)) {
                level.conversationIndex = 2 + level.levelConvo + 1;
              } else if (level.levelConvo === level.levelOrder.indexOf(level.convoWith) + 1) {
                level.conversationIndex = 2 + level.levelConvo - 1;
              } else {
                level.conversationIndex = 1;
              }
            }
          })
          level.houses.forEach((value)=>{
            if (level.missionStart && level.player.positionX - value.positionX === 80 && level.player.positionY - value.positionY === 200) {
              if (level.levelConvo === 0 && level.player.positionX === 2080 && level.player.positionY === 480) {
                story = level;
                level = new Level(1);
              }
              if (level.levelConvo === 2 && level.player.positionX === 3480 && level.player.positionY === 840) {
                story = level;
                level = new Level(2);
              }
              if (level.levelConvo === 4 && level.player.positionX === 2040 && level.player.positionY === 2000) {
                story = level;
                level = new Level(3);
              }
              if (level.levelConvo === 6 && level.player.positionX === 720 && level.player.positionY === 400) {
                story = level;
                level = new Level(4);
              }
              if (level.levelConvo === 8 && level.player.positionX === 3080 && level.player.positionY === 2000) {
                story = level;
                level = new Level(5);
              }
            }
          })
        }
        break;
    }
    level.player.movePlayer(direction);
  } else {
    if (level.levelCount === 13 && key === "Space") {
      level.conversationTurnIndex++;
    }
  }
}


// pause and game over menu contents conditionally rendered
menuContent = () => {
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
  if (level.levelComplete){
    ctx.fillText("BRAVO!", canvas.width/2, 320);
    ctx.strokeText("BRAVO!", canvas.width/2, 320);
    ctx.font = "15px Soko";
    var lvlCompleteTxt = "LEVEL " + level.levelCount + " COMPLETED!"
    if (level.levelCount > 11){
      lvlCompleteTxt = "ALL LEVELS COMPLETED!"
    }
    if (story) {
      lvlCompleteTxt = "YOU DID IT!"
      if (story.levelConvo === 8) {
        lvlCompleteTxt = "Story Mode Complete"
      }
    }
    if (levelEditor) {
      lvlCompleteTxt = "YOU DID IT!"
    }
    ctx.fillText(lvlCompleteTxt, canvas.width/2, 360);
    ctx.font = "20px Soko";
    if (level.menuSelection[1][0] == 1){
      canvas.style.cursor = "pointer";
      ctx.fillText("PLAY AGAIN!", canvas.width/2, 420);
    }
    ctx.strokeText("PLAY AGAIN!", canvas.width/2, 420);
    var nxtLvlTxt = "NEXT LEVEL";
    if (level.levelCount > 11){
      nxtLvlTxt = "START OVER"
    }
    if (story || levelEditor) {
      nxtLvlTxt = "CONTINUE";
    }
    if (level.menuSelection[1][1] == 1){
      canvas.style.cursor = "pointer";
      ctx.fillText(nxtLvlTxt, canvas.width/2, 520);
    }
    ctx.strokeText(nxtLvlTxt, canvas.width/2, 520);
    if (level.menuSelection[1][2] == 1){
      canvas.style.cursor = "pointer";
      ctx.fillText("EXIT", canvas.width/2, 620);
    }
    ctx.strokeText("EXIT", canvas.width/2, 620);
  } else {
    if (level.menuSelection[0][0] == 1){
      canvas.style.cursor = "pointer";
      ctx.fillText("RESUME", canvas.width/2, 320);
    }
    ctx.strokeText("RESUME", canvas.width/2, 320);
    var menuOptionRestartOrSave = "RESTART";
    if (level.levelCount === 13) {
      menuOptionRestartOrSave = "SAVE";
    }
    if (levelEditor) {
      menuOptionRestartOrSave = "GO BACK";
    }
    if (level.menuSelection[0][1] == 1){
      canvas.style.cursor = "pointer";
      ctx.fillText(menuOptionRestartOrSave, canvas.width/2, 420);
    }
    ctx.strokeText(menuOptionRestartOrSave, canvas.width/2, 420);
    var audioTxt = "ON";
    if (!audio) {
      var audioTxt = "OFF";
    }
    if (level.menuSelection[0][2] == 1){
      canvas.style.cursor = "pointer";
      ctx.fillText("AUDIO: " + audioTxt, canvas.width/2, 520);
    }
    ctx.strokeText("AUDIO: " + audioTxt, canvas.width/2, 520);
    if (level.menuSelection[0][3] == 1){
      canvas.style.cursor = "pointer";
      ctx.fillText("EXIT", canvas.width/2, 620);
    }
    ctx.strokeText("EXIT", canvas.width/2, 620);
  }
}

// pause game
pauseClicked = (e) => {
  if (e.pageX > width - 120 && e.pageX < width - 20 && e.pageY > 10 && e.pageY < 110){
    level.paused = true;
  }
}

// pause button hover
pauseHover = (e) => {
  level.pauseHovered = false;
  if (e.pageX > width - 120 && e.pageX < width - 20 && e.pageY > 10 && e.pageY < 110){
    level.pauseHovered = true;
  }
}

// select option in pause menu
pauseMenuSelection = (e) => {
  var mousePos = [e.pageX, e.pageY];
  const STORY_MODE = level.levelCount === 13;
  const LEVEL_MODE = level.levelCount > 0 && level.levelCount <= 12;
  const LEVEL_EDITOR = level.levelCount === 14;

  if (level.paused){
    // Resume
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 290 && mousePos[1] < 330 ){
      level.menuSelection[0][0] = 1;
      if (e.type == "mousedown"){
        level.menuSelection[0][0] = 0;
        level.paused = false;
      }
    } else {
      level.menuSelection[0][0] = 0;
    }
    // Save or restart
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 390 && mousePos[1] < 430 ){
      level.menuSelection[0][1] = 1;
      if (e.type == "mousedown"){
        level.paused = false;
        level.menuSelection[0][1] = 0;
        if (STORY_MODE) {
          var data = JSON.stringify([level.levelConvo, level.missionStart, level.storyBegins, level.player.positionX, level.player.positionY]);
          saveData("storymode", data) 
        } else if (LEVEL_MODE) {
          resetGameObjects(level.gameObjects);
          getAndMakePlayer(level);
          createLevelObjects(level, level.level, level.gameObjects);
        } else {
          if (!LEVEL_EDITOR){
            level.menuSelection[1][1] = 0;
            level = levelEditor;
            levelEditor = null;
            return;
          }
          level.editorSelection = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]];
          level.playerImg = level.playerImgBackup;
          resetGameObjects(level.gameObjects);
        }
      }
    } else {
      level.menuSelection[0][1] = 0;
    }
    // Audio
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 490 && mousePos[1] < 530 ){
      level.menuSelection[0][2] = 1;
      if (e.type == "mousedown"){
        level.menuSelection[0][2] = 1;
        audio = !audio
        if (!audio){
          mainMenu.bgAudio.pause();
        } else {
          mainMenu.bgAudio.play();
        }
      }
    } else {
      level.menuSelection[0][2] = 0;
    }
    // Exit
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 590 && mousePos[1] < 630 ){
      level.menuSelection[0][3] = 1;
      if (e.type == "mousedown"){
        level.menuSelection[0][3] = 0;
        level.paused = false;
        level = null;
        story = null;
        levelEditor = null;
        mainMenu.bgAudio.pause();
        mainMenu.bgAudio.currentTime = 0;
      }
    } else {
      level.menuSelection[0][3] = 0;
    }
  }
  if (level && level.levelComplete){
    // Play Again
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 390 && mousePos[1] < 430 ){
      level.menuSelection[1][0] = 1;
      if (e.type == "mousedown"){
        resetGameObjects(level.gameObjects);
        getAndMakePlayer(level);
        createLevelObjects(level, level.level, level.gameObjects);
        level.levelComplete = false;
      }
    } else {
      level.menuSelection[1][0] = 0;
    }
    // Next Level
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 490 && mousePos[1] < 530 ){
      level.menuSelection[1][1] = 1;
      if (e.type == "mousedown"){
        level.menuSelection[1][1] = 0;
        if (story) {
          if (story.levelConvo === 8) {
            level.menuSelection[1][1] = 0;
            story = null;
            saveData("storymode", null);
            return;
          }
          level = story;
          level.missionStart = false;
          if (level.levelConvo === 0) {
            level.conversationDialogues[3] = ["All done!", "Thank you Sokoban my house was a mess!", "My pleasure!", "See you around. Have a nice day!"];
            level.levelOrder[0] = "EVA1";
          }
          if (level.levelConvo === 2) {
            level.conversationDialogues[5] = ["Here's your key, Jake!", "Thanks! Sokoban! Have you met Bob?", "Not yet!", "Go see him. such a nice bloke!", "Sure! G'day!"];
          }
          if (level.levelConvo === 4) {
            level.conversationDialogues[7] = ["All complete! Do rate my services.", "I'll give you a 5 star if you don't tell Bob where I am!", "Haha! I got your back. Peace!", "Don't tell Kumar either. He is Bob's good friend.", "Telling nobody!"];
          }
          if (level.levelConvo === 6) {
            level.conversationDialogues[9] = ["Complete! I need some rest.", "Thanks and don't forget to come to the party tonight!", "Where is it?", "Go meet Eva by the pond. She will tell you.", "On my way.", "Thanks again!"];
          }
          level.levelConvo += 2;
          return;
        }
        if (level.levelCount < 12) {
          level = new Level(level.levelCount + 1)
        } else {
          level = new Level(1)
        }
      }
    } else {
      level.menuSelection[1][1] = 0;
    }
    // Exit
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 590 && mousePos[1] < 630 ){
      level.menuSelection[1][2] = 1;
      if (e.type == "mousedown"){
        level.menuSelection[1][2] = 0;
        level.levelComplete = false;
        level = null;
        story = null;
        levelEditor = null;
        mainMenu.bgAudio.pause();
        mainMenu.bgAudio.currentTime = 0;
      }
    } else {
      level.menuSelection[1][2] = 0;
    }
  }
}

// save to local storage
saveData = (key, value) => {
  localStorage.setItem(key, value);
}

// get from local storage
getSavedData = (key) => {
  return localStorage.getItem(key);
}

//function that allows users to drag and view level map
seeMap = (e) => {
  if (level.canMoveCamera && isDragging && !(e.pageX === startingPos[0] && e.pageY === startingPos[1])) {
    level.camera.xDrag = level.camera.xDrag + (e.pageX - startingPos[0])/25;
    level.camera.yDrag = level.camera.yDrag + (e.pageY - startingPos[1])/25;
  }
}