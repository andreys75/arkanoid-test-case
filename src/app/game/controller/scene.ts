import { ElementRef } from '@angular/core';
import { Ball } from '../model/ball';
import { ActionsByKeyCode, Player } from '../model/player';
import { ViewScene } from '../view/view-scene';

export class Scene {
  players: Player[] = [];
  ball!: Ball;
  #timer!: number;
  #sceneView: ViewScene;

  public width = 500;
  public height = 500;
  #actions: { [key: string]: Function } = {};

  constructor(private canvas: ElementRef<HTMLCanvasElement>) {
    let ctx = canvas.nativeElement.getContext('2d');
    if (!ctx) throw Error('Wrong context');
    this.#sceneView = new ViewScene(ctx);
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
  }

  draw = () => {
    this.#sceneView.clearScene(this.width, this.height);
    this.players.forEach((p) => {
      this.#sceneView.drawPlayer(p);
      this.ball.bouncingPanel(p);
    });
    this.ball.bouncingScene([this.width, this.height]);
    this.ball.move();
    this.#sceneView.drawBall(this.ball!);
  };

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
