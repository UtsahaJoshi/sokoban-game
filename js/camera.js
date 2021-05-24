class Camera {
  constructor(map) {
    this.level = map
    this.camPosXOffset = 0;
    this.camPosYOffset = 0;
    console.l
    if (this.level.player) {
      this.camPosXOffset = Math.floor(this.level.player.positionX / canvas.width);
      this.camPosYOffset = Math.floor(this.level.player.positionY / canvas.height);
    }
    this.newSceneX = this.camPosXOffset * canvas.width;
    this.newSceneY = this.camPosYOffset * canvas.height;
    this.camPosX = this.newSceneX;
    this.camPosY = this.newSceneY;
    this.xDrag = 0;
    this.yDrag = 0;
    this.isSnapping = false;
    this.changeScene = null;
  }

  getCamPos = () => {
    this.camPosX = - this.xDrag + this.newSceneX;
    this.camPosY = - this.yDrag + this.newSceneY;
    var lastOffsetX = this.camPosXOffset;
    var lastOffsetY = this.camPosYOffset;
    if (this.level.player){
      this.camPosXOffset = Math.floor(this.level.player.positionX / canvas.width);
      this.camPosYOffset = Math.floor(this.level.player.positionY / canvas.height);
    }
    if (lastOffsetX !== this.camPosXOffset){
      if (lastOffsetX < this.camPosXOffset){
        this.changeScene = "right"
      } else {
        this.changeScene = "left";
      }
    }
    if (lastOffsetY !== this.camPosYOffset){
      if (lastOffsetY < this.camPosYOffset){
        this.changeScene = "down"
      } else {
        this.changeScene = "up";
      }
    }
  }

  snapCameraBackInPosition = () => {
    if (this.isSnapping){
      if (this.xDrag < 0) {
        this.xDrag += Math.abs(this.xDrag/10);
      }
      if (this.yDrag < 0) {
        this.yDrag += Math.abs(this.yDrag/10);
      }
      if (this.xDrag > 0) {
        this.xDrag -= Math.abs(this.xDrag/10);
      }
      if (this.yDrag > 0) {
        this.yDrag -= Math.abs(this.yDrag/10);
      }
      if (Math.abs(this.xDrag) < 1 && Math.abs(this.yDrag) < 1) {
        this.xDrag = 0;
        this.yDrag = 0;
        this.isSnapping = false;
      }
    }
  
    if (this.changeScene === "right"){
      if (this.newSceneX < this.camPosXOffset * canvas.width){
        this.newSceneX += 25;
      } else {
        this.newSceneX = this.camPosXOffset * canvas.width
        this.changeScene = null
      }
    }
    if (this.changeScene === "left"){
      if (this.camPosX > this.camPosXOffset * canvas.width){
        this.newSceneX -= 25;
      } else {
        this.newSceneX = this.camPosXOffset * canvas.width
        this.changeScene = null
      }
    }
    if (this.changeScene === "down"){
      if (this.camPosY < this.camPosYOffset * canvas.height){
        this.newSceneY += 25;
      } else {
        this.newSceneY = this.camPosYOffset * canvas.height;
        this.changeScene = null
      }
    }
    if (this.changeScene === "up"){
      if (this.camPosY > this.camPosYOffset * canvas.height){
        this.newSceneY -= 25;
      } else {
        this.newSceneY = this.camPosYOffset * canvas.height
        this.changeScene = null
      }
    }
  }
}