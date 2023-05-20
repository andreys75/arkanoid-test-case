import { BehaviorSubject } from 'rxjs';

export type ActionsByKeyCode = {
  [key: string]: 'up' | 'down' | 'left' | 'right';
};

export class Player {
  #score = new BehaviorSubject(0);
  score$ = this.#score.asObservable();
  #speed = 5;

  move = (key: string, screenSize: { width: number; height: number }) => {
    switch (this.actions[key]) {
      case 'left':
        this.x = this.x - this.#speed > 0 ? this.x - this.#speed : 0;
        break;
      case 'right':
        this.x =
          this.x + this.#speed + this.width < screenSize.width
            ? this.x + this.#speed
            : screenSize.width - this.width;
        break;
      case 'up':
        this.y = this.y - this.#speed > 0 ? this.y - this.#speed : 0;
        break;
      case 'down':
        this.y =
          this.y + this.#speed + this.height < screenSize.height
            ? this.y + this.#speed
            : screenSize.height - this.height;
        break;
    }
  };

  addPoints = () => {
    this.#score.next(this.#score.value + this.points);
  };

  constructor(
    public x = 0,
    public y = 0,
    public width = 50,
    public height = 70,
    public color = 'red',
    public name = 'Andrey',
    private points = 10,
    public actions: ActionsByKeyCode = {}
  ) {}
}
