import { getAllRiddles } from "./api/riddles-api.js";
import { input } from "./utils/formatter.js";
import Player from "./models/Player.js";
import Riddle from "./models/Riddle.js";

export default async function playGame() {
    const name = input("Enter your name: ");
    const player = new Player(name);
    console.log(`Hello ${player.name}, welcome to the Riddle Game!`);

    const riddles = await loadRiddles();
    await gameLoop(riddles, player);

    player.showStats();
}

async function loadRiddles() {
    const data = await getAllRiddles();
    return data.map(r => new Riddle(r.id, r.name, r.taskDescription, r.correctAnswer));
}

async function gameLoop(riddles, player) {
    for (const riddle of riddles) {
        const start = Date.now();
        await riddle.repeat();
        const end = Date.now();
        player.recordTime(start, end);
    }
}
