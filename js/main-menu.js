class MainMenu{
  constructor(){
    this.selection = [[0,0,0,0],[0,0],0];
    this.menuPage = 0;
    this.levelInStorage = Number(getSavedData("soko-level-complete")) || 0;
    this.bgAudio = document.getElementById("bg-music");
    this.bgAudio.loop = true;
  }
  drawMenu = () => {
    if (!level){
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
        var levelCount = 0;
        for (var i=0; i<3; i++){
          for (var j=0; j<4; j++){
            ctx.font = "15px Soko";
            levelCount++;
            var posX = j * 100;
            var posY = i * 100;
            ctx.fillStyle = "#FFFFFF";
            var levelText = levelCount;
            var shiftX = 0;
            if (levelCount === this.selection[1][1]){
              canvas.style.cursor = "pointer";
              ctx.fillStyle = "#FFD700";
              if (levelCount > this.levelInStorage + 1) {
                ctx.font = "25px Soko";
                levelText = "🔒";
                shiftX = 2;
              }
            }
            ctx.fillRect(canvas.width/2-175 + posX, 350 + posY, 50, 50);
            ctx.fillStyle = "black";
            ctx.fillText(levelText, canvas.width/2-(148 + shiftX) + posX, 384 + posY);
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
      if (this.menuPage === 4){
        ctx.font = "20px Soko";
        ctx.fillStyle = "	#FFD700";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.textAlign = "center";
        ctx.fillText("HOW TO PLAY", canvas.width/2, 320);
        ctx.strokeText("HOW TO PLAY", canvas.width/2, 320);
        ctx.font = "20px Soko";
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "	#FFFFFF";
        ctx.font = "8px Soko";
        ctx.fillText("Small Town Sokoban is a remake", canvas.width/2, 350);
        ctx.fillText("of the classic box-pushing puzzle", canvas.width/2, 370);
        ctx.fillText("game, Sokoban.", canvas.width/2, 390);
        ctx.fillText("Each level has the same objective;", canvas.width/2, 410);
        ctx.fillText("to push boxes to their destination", canvas.width/2, 430);
        ctx.fillText(" locations. Although this may sound", canvas.width/2, 450);
        ctx.fillText("simple, the progressive difficulty", canvas.width/2, 470);
        ctx.fillText(" of the levels will certainly demand", canvas.width/2, 490);
        ctx.fillText("creativity & imagination.", canvas.width/2, 510);
        ctx.fillText("You can only walk or push.", canvas.width/2, 530);
        ctx.fillText("You cannot walk through walls or", canvas.width/2, 550);
        ctx.fillText("over boxes and you cannot pull.", canvas.width/2, 570);
        ctx.fillText("There are 12 levels & a story", canvas.width/2, 590);
        ctx.fillText("mode as well. Enjoy!", canvas.width/2, 610);
        ctx.font = "20px Soko";
        ctx.fillStyle = "	#FFD700";
        if (this.selection[1][0]){
          canvas.style.cursor = "pointer";
          ctx.fillText("< BACK", canvas.width/2 - 110, 650);
        }
        ctx.strokeText("< BACK", canvas.width/2 - 110, 650);
      }
    } else {
      if (level){
        level.drawLevel();
        if (level.exit == 1){
          level = null;
        }
      }
    }
  }

  menuSelection = (e) => {

    //how to play
    var mousePos = [e.pageX, e.pageY];
    if (this.menuPage === 4 && !level){
      if (mousePos[0]>canvas.width/2 - 170 && mousePos[0]<canvas.width/2 - 50 && mousePos[1] > 625 && mousePos[1] < 655 ){
        this.selection[1][0] = 1;
        if (e.type == "mousedown"){
          this.menuPage = 0;
          this.selection = [[0,0,0,0],[0,0],0];
        }
      } else {
        this.selection[1][0] = 0;
      }
    }

    //level mode
    if (this.menuPage === 2 && !level){
      var levelCount = 0;
      this.selection[1][1] = 0;
      for (var i=0; i<3; i++){
        for (var j=0; j<4; j++){
          levelCount++;
          var posX = j * 100;
          var posY = i * 100;
          if (mousePos[0]>canvas.width/2-175 + posX && mousePos[0]<canvas.width/2 - 125 +posX && mousePos[1] > 350 + posY && mousePos[1] < 400+ posY) {
            this.selection[1][1] = levelCount;
            if (e.type == "mousedown"){
              if (levelCount <= this.levelInStorage + 1) {
                this.menuPage = 0;
                this.selection = [[0,0,0,0],[0,0],0];
                level = new Level(levelCount);
                if (audio) {
                  this.bgAudio.play();
                }
              }
            }
          }
        }
      }
      if (mousePos[0]>canvas.width/2 - 170 && mousePos[0]<canvas.width/2 - 50 && mousePos[1] > 625 && mousePos[1] < 655 ){
        this.selection[1][0] = 1;
        if (e.type == "mousedown"){
          this.menuPage = 0;
          this.selection = [[0,0,0,0],[0,0],0];
        }
      } else {
        this.selection[1][0] = 0;
      }
    }
    if (this.menuPage === 0 && !level){
      // story mode
      if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 290 && mousePos[1] < 330 ){
        this.selection[0][0] = 1;
        if (e.type == "mousedown"){
          this.menuPage = 0;
          this.selection = [[0,0,0,0],[0,0],0];
          level = new Story();
          if (audio) {
            this.bgAudio.play();
          }
        }
      } else {
        this.selection[0][0] = 0;
      }
      // play levels
      if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 390 && mousePos[1] < 430 ){
        this.selection[0][1] = 1;
        if (e.type == "mousedown"){
          this.menuPage = 2;
          this.selection = [[0,0,0,0],[0,0],0];
        }
      } else {
        this.selection[0][1] = 0;
      }
      // level editor
      if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 490 && mousePos[1] < 530 ){
        this.selection[0][2] = 1;
        if (e.type == "mousedown"){
          this.menuPage = 0;
          this.selection = [[0,0,0,0],[0,0],0];
          level = new LevelEditor();
          if (audio) {
            this.bgAudio.play();
          }
        }
      } else {
        this.selection[0][2] = 0;
      }
      // how to play
      if (mousePos[0]>canvas.width/2 - 150 && mousePos[0] < canvas.width/2 + 150 && mousePos[1] > 590 && mousePos[1] < 630 ){
        this.selection[0][3] = 1;
        if (e.type == "mousedown"){
          this.menuPage = 4;
          this.selection = [[0,0,0,0],[0,0],0];
        }
      } else {
        this.selection[0][3] = 0;
      }
    }
  }
}