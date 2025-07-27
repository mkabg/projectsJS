import { getAllRiddles } from "./api/riddles-api.js";
import { input } from "./utils/formatter.js";
import Player from "./models/Player.js";
import Riddle from "./models/Riddle.js";
import { addPlayer, getPlayerByUsername } from "./api/player-api.js";

export default async function playGame() {
    const name = input("Enter your name: ");
    const player = new Player(name);

    const exist = await isPlayerExist(player);
    console.log(exist);
    
    if (exist) {
        console.log(`Hello ${exist.username}, welcome back to the Riddle Game!`)
        console.log(`time to beat ${exist.best_time}`);
    }
    else {
    console.log(`Hello ${player.username}, welcome to the Riddle Game!`);
    }

    const riddles = await loadRiddles();
    await gameLoop(riddles, player);

    await player.showStats();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function isPlayerExist(player) {
  const exist = await getPlayerByUsername(player.username);
  if (!exist) {
    return await addPlayer({
      username: player.username,
      best_time: 0,
    });
  }
  return exist;
}

async function loadRiddles() {
    const data = await getAllRiddles();
    return data.map(r => new Riddle(r.id, r.name, r.taskDescription, r.correctAnswer));
}

async function gameLoop(riddles, player) {
    let count = 1;
    for (const riddle of riddles) {
        const start = Date.now();
        await riddle.repeat(count);
        const end = Date.now();
        player.recordTime(start, end);
        count += 1;
    }
}
