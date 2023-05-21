import { ElementRef } from '@angular/core';
import { Ball } from './ball';
import { ActionsByKeyCode, Player } from './player';

export class Scene {
  players: Player[] = [];
  ball!: Ball;
  #timer!: number;
  #ctx!: CanvasRenderingContext2D;
  public width = 500;
  public height = 500;
  #actions: { [key: string]: Function } = {};

  constructor(private canvas: ElementRef<HTMLCanvasElement>) {
    let ctx = canvas.nativeElement.getContext('2d');
    if (!ctx) throw Error('Wrong context');
    this.#ctx = ctx;
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
  }

  private clearScene = () => {
    this.#ctx.clearRect(0, 0, this.width, this.height);
  };

  draw = () => {
    this.clearScene();
    this.players.forEach((p) => {
      this.drawPlayer(p);
      this.ball.bouncingPanel(p);
    });
    this.ball.bouncingScene([this.width, this.height]);
    this.ball.move();
    this.drawBall(this.ball!);
  };

  private drawBall = (ball: Ball) => {
    this.#ctx.beginPath();
    this.#ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    this.#ctx.fillStyle = ball.color;
    this.#ctx.fill();
    this.#ctx.closePath();
  };

  private drawPlayer(player: Player) {
    this.#ctx.fillStyle = player.color;
    this.#ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  gameStart = () => {
    if (!this.ball && !(this.players.length === 2))
      throw Error('Game has not been inisialised');
    this.#timer = window.setInterval(this.draw, 10);
  };

  gameStop = () => {
    if (this.#timer) clearInterval(this.#timer);
  };

  initGameFromConfig(cfg: any) {
    let { width, height } = cfg.scene;
    this.canvas.nativeElement.width = width;
    this.canvas.nativeElement.height = height;
    this.width = width;
    this.height = height;

    if (cfg.players.length !== 2)
      throw Error('Wrong number of players. Should be 2 playyers.');

    cfg.players.forEach((player: any) => {
      let { x, y, width, height, color, name, points, actions } = player;
      let playerObj = new Player(
        x,
        y,
        width,
        height,
        color,
        name,
        points,
        actions as ActionsByKeyCode
      );
      this.players.push(playerObj);
      Object.keys(actions).forEach((key) => {
        this.#actions[key] = () =>
          playerObj.move(key, {
            width: this.width,
            height: this.height,
          });
      });
    });

    let { x, y, radius, speed, color } = cfg.ball;
    this.ball = new Ball(x, y, radius, speed, color);
    console.log(this.#actions);
  }

  movePlayer(key: string) {
    if (this.#actions[key]) this.#actions[key]();
  }
}
