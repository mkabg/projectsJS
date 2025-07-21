import { updatePlayerTime } from "../api/player-api.js";

// models/Player.js
export default class Player {
  constructor(name) {
    this.name = name;
    this.times = [];
    this.bestTime = null; // holds the personal best time in milliseconds
  }

  recordTime(start, end) {
    const duration = end - start;
    this.times.push(duration);

    // Update the personal best if needed
    this.updateBestTime(duration);
  }

  // Display the current personal best time, or a message if none exists
  showBestTime() {
    if (this.bestTime === null) {
      console.log("No personal best time yet.");
    } else {
      console.log(`🏆 Personal best: ${this.bestTime}ms`);
    }
  }

  // Update the personal best time if the new time is lower
  updateBestTime(time) {
    if (this.bestTime === null || time < this.bestTime) {
      this.bestTime = time;
      console.log(`🎉 New personal best: ${this.bestTime}ms`);
      updatePlayerTime();
    }
  }

  showStats() {
    console.log(`Player: ${this.name}`);
    console.log(`Solved: ${this.times.length} riddles`);
    const total = this.times.reduce((a, b) => a + b, 0);
    console.log(`Total time: ${total}ms`);
    const averageTime = this.times.length > 0 ? totalTime / this.times.length : 0;
    console.log(`\nGreat job, ${this.name}!`);
    console.log(`Total time: ${(totalTime / 1000).toFixed(2)} seconds`);
    console.log(`Average time per riddle: ${(averageTime / 1000).toFixed(2)} seconds`);
    this.showBestTime();
  }
}
