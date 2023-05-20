import { Player } from './player';

export class Ball {
  constructor(
    public x: number,
    public y: number,
    public radius = 10,
    public speed: { dx: number; dy: number } = { dx: 2, dy: -2 },
    public color = '#0095DD'
  ) {}

  bouncingScene([sceneWidth, sceneHeight]: [number, number]) {
    if (this.x + this.speed.dx >= sceneWidth || this.x + this.speed.dx < 0) {
      this.speed.dx = -this.speed.dx;
    }

    if (this.y + this.speed.dy > sceneHeight || this.y + this.speed.dy < 0) {
      this.speed.dy = -this.speed.dy;
    }
  }

  bouncingPanel(player: Player) {
    let currentX = this.x;
    let nextX = this.x + this.speed.dx;
    let currentY = this.y;
    let nextY = this.y + this.speed.dy;
    let panelLeftX = player.x;
    let panelRightX = player.x + player.width;
    let panelTopY = player.y;
    let panelBottomY = player.y + player.height;
    if (
      ((nextX >= panelLeftX && currentX < panelLeftX) ||
        (nextX <= panelRightX && currentX > panelRightX)) &&
      nextY >= panelTopY &&
      nextY <= panelBottomY
    ) {
      this.speed.dx = -this.speed.dx;
      player.addPoints();
      return;
    }
    if (
      ((nextY >= panelTopY && currentY < panelTopY) ||
        (nextY <= panelBottomY && currentY > panelBottomY)) &&
      nextX >= panelLeftX &&
      nextX <= panelRightX
    ) {
      this.speed.dy = -this.speed.dy;
      player.addPoints();
    }
  }

  move = () => {
    this.x += this.speed.dx;
    this.y += this.speed.dy;
  };
}
