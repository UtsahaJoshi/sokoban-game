var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
var height = window.innerHeight;
var width = window.innerWidth;
canvas.height = height;
canvas.width = width;

var isDragging = false;

level = new Level();

var drawCanvas = () => {
  resizeScreen();
  ctx.clearRect(0, 0, width, height);
  level.drawLevel();
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
window.addEventListener("keydown", level.playerControl);
canvas.addEventListener("mousedown", (e) => {
  if (level){

  }
  startingPos = [e.pageX, e.pageY]
  isDragging = true;
});
canvas.addEventListener("mouseup", (e) => {
  if (level){

  }
  isDragging = false;
});
canvas.addEventListener("mousemove", level.seeMap);
