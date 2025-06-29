// all import
import readlineSync from 'readline-sync';
import riddlesData from './riddles/importAll.js'
import Riddle from './classes/Riddle.js';
import Player from './classes/Player.js';

const riddles = riddlesData.map(r => new Riddle(r.id, r.name, r.taskDescription, r.correctAnswer));

// game
const name = readlineSync.question('What is your name? \n');
const player = new Player(name);
console.log(`Hello, ${name}!`);
console.log("done");

let stage = 0;
while(stage < riddles.length)
{
    const start = Date.now();
    riddles[stage].Repeat();
    const end = Date.now();
    player.RecordTime(start, end)
    stage++;
}

player.ShowStats();