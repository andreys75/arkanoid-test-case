export const config = {
  players: [
    {
      x: 100,
      y: 150,
      width: 100,
      height: 150,
      color: 'red',
      name: 'Bob',
      points: 10,
      actions: {
        ArrowLeft: 'left',
        ArrowUp: 'up',
        ArrowRight: 'right',
        ArrowDown: 'down',
      },
    },
    {
      x: 500,
      y: 150,
      width: 100,
      height: 150,
      color: 'green',
      name: 'James',
      points: 10,
      actions: {},
    },
  ],
  scene: {
    width: 700,
    height: 500,
  },
  ball: {
    x: 250,
    y: 250,
    radius: 10,
    speed: { dx: 2, dy: -2 },
    color: '#0095DD',
  },
};
