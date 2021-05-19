var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
var height = window.innerHeight;
var width = window.innerWidth;
canvas.height = height;
canvas.width = width;

var levelCanvas = document.createElement("canvas");
levelCanvas.width = 6000;
levelCanvas.height = 6000;
var levelCanvasCtx = levelCanvas.getContext("2d");

startingPos = [];
isDragging = false;

var level = [
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

var levelComplete = false;

var walls = [];
var tiles = [];
var boxes = [];
var crosses = [];
var player;

createLevelObjects();

var camera = new Camera();


var drawCanvas = () => {
  camera.getCamPos();
  resizeScreen();
  drawLevel();
  (camera.isSnapping || camera.changeScene) ? camera.snapCameraBackInPosition() : 0;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(levelCanvas, camera.camPosX, camera.camPosY, width, height, 0, 0, width, height);
  checkForLevelComplete();
  requestAnimationFrame(drawCanvas);
}

var checkForLevelComplete = () => {
  var totalSolved = 0;
  boxes.forEach((value)=>{
    (value.solved) ? totalSolved += 1 : 0;
   });
   (totalSolved === boxes.length) ? levelComplete = true : levelComplete = false;
}
var drawLevel = () => {
  tiles.forEach((value)=>{
    value.drawTile();
  })
  crosses.forEach((value)=>{
    value.drawCross();
  })
  boxes.forEach((value)=>{
   value.drawBox();
  })
  player.drawPlayer();
  walls.forEach((value)=>{
    value.drawWall();
  })
}

function createLevelObjects() {
  for(var i = 0; i < level.length; i++){
    for(var j = 0; j < level[i].length; j++){
      var positionX = j * 80;
      var positionY =  i * 80;
      var sizeX = 80;
      var sizeY = 80;
      tiles.push(new Tile(tiles.length, positionX, positionY, sizeX, sizeY));
      switch(level[i][j]){
        case "#":
          walls.push(new Wall(walls.length, positionX, positionY, sizeX, sizeY));
          break;
        case "*":
          crosses.push(new Cross(crosses.length, positionX, positionY, sizeX, sizeY));
          break;
        case "+":
          boxes.push(new Box(boxes.length, positionX, positionY, sizeX, sizeY));
          break;
        case "@":
          player = new Player(positionX, positionY, sizeX, sizeY);
          break;
        case "&":
          crosses.push(new Cross(crosses.length, positionX, positionY, sizeX, sizeY));
          boxes.push(new Box(boxes.length, positionX, positionY, sizeX, sizeY));
          break;
      }
    }
  }
}

var canMovePlayer = (move) => {
  player.movePlayer(move);
}

var resizeScreen = () => {
  height = window.innerHeight;
  width = window.innerWidth;
  canvas.height = height;
  canvas.width = width;
}

var playerControl = (event) => {
  if (camera.xDrag !== 0 || camera.yDrag !==0) camera.isSnapping = true;
  if (!camera.isSnapping) {
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
    var indices = canMovePlayer(direction);
    if (indices) movePlayer(indices);
  }
}

var seeMap = (e) => {
  if (isDragging && !(e.pageX === startingPos[0] && e.pageY === startingPos[1])) {
    camera.xDrag = camera.xDrag + (e.pageX - startingPos[0])/25;
    camera.yDrag = camera.yDrag + (e.pageY - startingPos[1])/25;
  }
}

requestAnimationFrame(drawCanvas);

window.addEventListener("resize", resizeScreen);
window.addEventListener("keydown", playerControl);
canvas.addEventListener("mousedown", (e) => {
  startingPos = [e.pageX, e.pageY]
  isDragging = true;
});
canvas.addEventListener("mouseup", (e) => {
  isDragging = false;
});
canvas.addEventListener("mousemove", seeMap);
