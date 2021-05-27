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
var levelEditor;

// loop function that draws on the canvas
var drawCanvas = () => {
  resizeScreen();
  ctx.clearRect(0, 0, width, height);
  mainMenu.drawMenu();
  requestAnimationFrame(drawCanvas);
}

// function that updates height and width when resized
var resizeScreen = () => {
  height = window.innerHeight;
  width = window.innerWidth;
  canvas.height = height;
  canvas.width = width;
}



// create and immediately invoke event listeners
var eventListeners = (() => {
  window.addEventListener("load", () => {requestAnimationFrame(drawCanvas)});
  window.addEventListener("resize", resizeScreen);
  window.addEventListener("keydown", (e) => {
    if (level && !level.paused && !level.levelComplete && level.levelCount !== 14){
      playerControl(e);
    }
  });
  canvas.addEventListener("mousedown", (e) => {
    if (mainMenu){
      mainMenu.menuSelection(e);
    }
    if (level){
      startingPos = [e.pageX, e.pageY]
      if (level.levelCount === 14) {
        if (startingPos[0]>150) {
          level.placeObject(e);
        }
        level.editorMenuSelection(e);
      }
      isDragging = true;
      pauseClicked(e);
      pauseMenuSelection(e);
    }
  });
  
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
      pauseHover(e);
      pauseMenuSelection(e);
      if(level.levelCount !== 13) {
        seeMap(e);
      }
      if (level.levelCount === 14) {
        if (!isDragging) level.editorMenuSelection(e);
        if (startingPos[0]>150 && isDragging) level.placeObject(e);
      }
    }
  });
})();
