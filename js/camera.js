class Camera {
  constructor(map) {
    this.level = map
    this.camPosXOffset = 0;
    this.camPosYOffset = 0;
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

    this.changeSceneDirection(lastOffsetX, lastOffsetY);
  }

  changeSceneDirection = (lastOffsetX, lastOffsetY) => {
    var offsetXNotEqual = lastOffsetX !== this.camPosXOffset;
    var offsetXLessThan = lastOffsetX < this.camPosXOffset;
    var offsetYNotEqual = lastOffsetY !== this.camPosYOffset;
    var offsetYLessThan = lastOffsetY < this.camPosYOffset;

    if (offsetXNotEqual){
      this.changeScene = (offsetXLessThan) ? RIGHT : LEFT;
    }
    if (offsetYNotEqual){
      this.changeScene = (offsetYLessThan) ? DOWN : UP;
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

    this.snapCameraToScene();
  }

  snapCameraToScene = () => {
    const SNAPPING_SPEED = 25;
    var newSceneX = this.camPosXOffset * canvas.width;
    var newSceneY = this.camPosYOffset * canvas.height;

    switch (this.changeScene) {
      case RIGHT:
        if (this.newSceneX < newSceneX){
          this.newSceneX += SNAPPING_SPEED;
        } else {
          this.newSceneX = newSceneX;
          this.changeScene = null
        }
        break;
      case LEFT:
        if (this.camPosX > newSceneX){
          this.newSceneX -= SNAPPING_SPEED;
        } else {
          this.newSceneX = newSceneX;
          this.changeScene = null
        }
        break;
      case DOWN:
        if (this.camPosY < newSceneY){
          this.newSceneY += SNAPPING_SPEED;
        } else {
          this.newSceneY = newSceneY;
          this.changeScene = null
        }
        break;
      case UP:
        if (this.camPosY > newSceneY){
          this.newSceneY -= SNAPPING_SPEED;
        } else {
          this.newSceneY = newSceneY;
          this.changeScene = null
        }
        break;
    }
  }
}