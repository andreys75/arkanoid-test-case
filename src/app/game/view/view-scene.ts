import { Ball } from '../model/ball';
import { Player } from '../model/player';

export class ViewScene {
  constructor(private ctx: CanvasRenderingContext2D) {}
  drawBall = (ball: Ball) => {
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = ball.color;
    this.ctx.fill();
    this.ctx.closePath();
  };

  drawPlayer(player: Player) {
    this.ctx.fillStyle = player.color;
    this.ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  clearScene = (width: number, height: number) => {
    this.ctx.clearRect(0, 0, width, height);
  };
}
