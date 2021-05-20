class MainMenu{
  constructor(){
    this.selection = [[0,0,0,0],[0,0],0];
    this.menuPage = 0;
  }
  drawMenu = () => {
    var logo = document.getElementById("logo");
    var bg = document.getElementById("menu-background");
    var face = document.getElementById("face");
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(width/2-logo.width/4, 150,logo.width/2, 520);
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.font = "10px Soko";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Small Town", canvas.width/2-120, 190);
    ctx.drawImage(logo, width/2-logo.width/4, 150,logo.width/2, logo.height/2);
    ctx.drawImage(face, width/2-160, 165,face.width/2, face.height/2);

    canvas.style.cursor = "default";
    if (this.menuPage === 0){
      ctx.font = "20px Soko";
      ctx.fillStyle = "	#FFD700";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
      if (this.selection[0][0]){
        canvas.style.cursor = "pointer";
        ctx.fillText("STORY MODE", canvas.width/2, 320);
      }
      ctx.strokeText("STORY MODE", canvas.width/2, 320);
      if (this.selection[0][1]){
        canvas.style.cursor = "pointer";
        ctx.fillText("PLAY LEVELS", canvas.width/2, 420);
      }
      ctx.strokeText("PLAY LEVELS", canvas.width/2, 420);
      if (this.selection[0][2]){
        canvas.style.cursor = "pointer";
        ctx.fillText("LEVEL EDITOR", canvas.width/2, 520);
      }
      ctx.strokeText("LEVEL EDITOR", canvas.width/2, 520);
      if (this.selection[0][3]){
        canvas.style.cursor = "pointer";
        ctx.fillText("HOW TO PLAY", canvas.width/2, 620);
      }
      ctx.strokeText("HOW TO PLAY", canvas.width/2, 620);
    }

    if (this.menuPage === 2){
      ctx.font = "20px Soko";
      ctx.fillStyle = "	#FFD700";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
      ctx.fillText("LEVELS", canvas.width/2, 320);
      ctx.strokeText("LEVELS", canvas.width/2, 320);
      ctx.font = "15px Soko";
      var levelCount = 0;
      for (var i=0; i<3; i++){
        for (var j=0; j<4; j++){
          levelCount++;
          var posX = j * 100;
          var posY = i * 100;
          ctx.fillStyle = "#FFFFFF";
          if (levelCount === this.selection[1][1]){
            canvas.style.cursor = "pointer";
            ctx.fillStyle = "#FFD700";
          }
          ctx.fillRect(canvas.width/2-175 + posX, 350 + posY, 50, 50);
          ctx.fillStyle = "black";
          ctx.fillText(levelCount, canvas.width/2-148 + posX, 384 + posY);
        }
      }
      ctx.font = "20px Soko";
      ctx.strokeStyle = "#ffffff";
      ctx.fillStyle = "	#FFD700";
      if (this.selection[1][0]){
        canvas.style.cursor = "pointer";
        ctx.fillText("< BACK", canvas.width/2 - 110, 650);
      }
      ctx.strokeText("< BACK", canvas.width/2 - 110, 650);
    }
    if (level) {
      level.drawLevel();
      if (level.exit == 1){
        level = null;
      }
    }
  }
}

menuSelection = (e) => {
  var mousePos = [e.pageX, e.pageY];

  if (mainMenu.menuPage === 0){
    // story mode
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 290 && mousePos[1] < 330 ){
      mainMenu.selection[0][0] = 1;
      if (e.type == "mousedown"){
        mainMenu.menuPage = 1;
        mainMenu.selection = [[0,0,0,0],[0,0],0];
      }
    } else {
      mainMenu.selection[0][0] = 0;
    }
    // play levels
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 390 && mousePos[1] < 430 ){
      mainMenu.selection[0][1] = 1;
      if (e.type == "mousedown"){
        mainMenu.menuPage = 2;
        mainMenu.selection = [[0,0,0,0],[0,0],0];
      }
    } else {
      mainMenu.selection[0][1] = 0;
    }
    // level editor
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 490 && mousePos[1] < 530 ){
      mainMenu.selection[0][2] = 1;
      if (e.type == "mousedown"){
        mainMenu.menuPage = 3;
        mainMenu.selection = [[0,0,0,0],[0,0],0];
      }
    } else {
      mainMenu.selection[0][2] = 0;
    }
    // how to play
    if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 590 && mousePos[1] < 630 ){
      mainMenu.selection[0][3] = 1;
      if (e.type == "mousedown"){
        mainMenu.menuPage = 4;
        mainMenu.selection = [[0,0,0,0],[0,0],0];
      }
    } else {
      mainMenu.selection[0][3] = 0;
    }
  }
  if (mainMenu.menuPage === 2){
    if (mousePos[0]>canvas.width/2 - 170 && mousePos[0]<canvas.width/2 - 50 && mousePos[1] > 625 && mousePos[1] < 655 ){
      mainMenu.selection[1][0] = 1;
      if (e.type == "mousedown"){
        mainMenu.menuPage = 0;
        mainMenu.selection = [[0,0,0,0],[0,0],0];
      }
    } else {
      mainMenu.selection[1][0] = 0;
    }
    var levelCount = 0;
    mainMenu.selection[1][1] = 0;
    for (var i=0; i<3; i++){
      for (var j=0; j<4; j++){
        levelCount++;
        var posX = j * 100;
        var posY = i * 100;
        if (mousePos[0]>canvas.width/2-175 + posX && mousePos[0]<canvas.width/2 - 125 +posX && mousePos[1] > 350 + posY && mousePos[1] < 400+ posY) {
          mainMenu.selection[1][1] = levelCount;
          if (e.type == "mousedown"){
            level = new Level(levelCount);
            mainMenu.selection = [[0,0,0,0],[0,0],0];
          }
        }
      }
    }
  }
}

document.addEventListener("mousemove", menuSelection)
document.addEventListener("mousedown", menuSelection)