import { updatePlayerTime } from "../api/player-api.js";

export default class Player {
  constructor(name) {
    this.username = name;
    this.times = [];
    this.best_time = null; // in milliseconds
  }

  recordTime(start, end) {
    const duration = end - start;
    this.times.push(duration);
  }

  showBestTime() {
    if (this.best_time === null) {
      console.log("No personal best time yet.");
    } else {
      console.log(`🏆 Personal best: ${(this.best_time / 1000).toFixed(2)}sec`);
    }
  }

  async updateBestTime(time) {
    if (this.best_time === null || time < this.best_time) {
      this.best_time = time;
      console.log(`🎉 New personal best: ${(this.best_time / 1000).toFixed(2)}sec`);
      try {
        await updatePlayerTime(this, Math.round(this.best_time / 1000));
        console.log("✅ Time updated in DB");
      } catch (err) {
        console.error("❌ Failed to update player:", err.message);
      }
    }
  }

  async showStats() {
    console.log(`Player: ${this.username}`);
    console.log(`Solved: ${this.times.length} riddles`);

    const total_time = this.times.reduce((a, b) => a + b, 0);
    const averageTime = this.times.length > 0 ? total_time / this.times.length : 0;

    console.log(`\nGreat job, ${this.username}!`);
    console.log(`Total time: ${(total_time / 1000).toFixed(2)} seconds`);
    console.log(`Average time per riddle: ${(averageTime / 1000).toFixed(2)} seconds`);

    await this.updateBestTime(total_time);
    this.showBestTime();
  }
}

