var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
var height = window.innerHeight;
var width = window.innerWidth;
canvas.height = height;
canvas.width = width;

var isDragging = false;
var startingPos = [];

mainMenu = new MainMenu();
var level;
var story;


var drawCanvas = () => {
  resizeScreen();
  ctx.clearRect(0, 0, width, height);
  mainMenu.drawMenu();
  requestAnimationFrame(drawCanvas);
}

var resizeScreen = () => {
  height = window.innerHeight;
  width = window.innerWidth;
  canvas.height = height;
  canvas.width = width;
}

requestAnimationFrame(drawCanvas);

window.addEventListener("resize", resizeScreen);
window.addEventListener("keydown", (e) => {
  if (level && !level.paused && !level.levelComplete){
    level.playerControl(e);
  }
});
canvas.addEventListener("mousedown", (e) => {
  if (mainMenu){
    mainMenu.menuSelection(e);
  }
  if (level && !level.deleteObject){
    startingPos = [e.pageX, e.pageY]
    isDragging = true;
    level.pauseClicked(e);
    level.pauseMenuSelection(e);
    if (level.levelCount === 14) {
      level.placeObject(e);
      level.editorMenuSelection(e);
    }
  }
});

canvas.oncontextmenu = function(e) {
  e.preventDefault();
  console.log("hello", e)
  if (level.levelCount === 14) {
    level.deleteObject = true;
    level.placeObject(e);
  }
};

canvas.addEventListener("mouseup", (e) => {
  if (level){
    isDragging = false;
  }
});
canvas.addEventListener("mousemove", (e) => {
  if (mainMenu){
    mainMenu.menuSelection(e);
  }
  if (level) {
    level.pauseHover(e);
    level.pauseMenuSelection(e);
    if(level.levelCount !== 13) {
      level.seeMap(e);
    }
    if (level.levelCount === 14) {
      level.editorMenuSelection(e);
      if (isDragging) level.placeObject(e);
    }
  }
});
