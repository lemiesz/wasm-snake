import { Game, Vector } from "wasm-snake-game";
import CONFIG from "./config";
import Storage from "./storage";
import { Controller } from "./controller";
import { View } from "./view";

export class GameManager {
  constructor() {
    this.stopTime = false;
    this.controller = new Controller(this.onStop.bind(this));
    this.restart();
  }

  tick() {
    if (!this.stopTime) {
      const lastUpdate = Date.now();
      if (this.lastUpdate) {
        this.game.process(
          lastUpdate - this.lastUpdate,
          this.controller.movement
        );
        if (this.game.is_over()) {
          this.restart();
          return;
        }
        if (this.game.score > Storage.getBestScore()) {
          Storage.setBestScore(this.game.score);
        }
      }
      this.lastUpdate = lastUpdate;
      this.render();
    }
  }

  onStop() {
    this.stopTime = true;
  }

  restart() {
    this.game = new Game(
      CONFIG.WIDTH,
      CONFIG.HEIGHT,
      CONFIG.SPEED,
      CONFIG.SNAKE_LENGTH,
      new Vector(CONFIG.SNAKE_DIRECTION_X, CONFIG.SNAKE_DIRECTION_Y)
    );
    if (!this.view) {
      // reuse old render if possible
      this.view = new View(
        this.game.width,
        this.game.height,
        this.render.bind(this)
      );
    }
  }
  render() {
    this.view.render(
      this.game.food,
      this.game.get_snake(),
      this.game.score,
      Storage.getBestScore()
    );
  }

  run() {
    setInterval(this.tick.bind(this), 1000 / CONFIG.FPS);
  }
}
