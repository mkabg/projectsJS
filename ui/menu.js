import {
    getAllRiddles,
    createRiddle,
    updateRiddle,
    deleteRiddle,
} from "../api/riddles-api.js"
import { getPlayers } from "../api/player-api.js"
import { input } from "../utils/formatter.js";

export default function showMenu() {
    console.log("enter 0 to exit")
    console.log("enter 1 to play the game");
    console.log("enter 2 to read all riddels");
    console.log("enter 3 to creat a new riddle");
    console.log("enter 4 to update an existing riddle");
    console.log("enter 5 to delete a riddle");
    console.log("enter 6 to view leaderboard");
}

// 0. Exit
function exitApp() {
  console.log("Goodbye!");
  process.exit(0);
}

// 2. Show all riddles
async function showAllRiddles() {
  try {
    const riddles = await getAllRiddles();
    console.table(riddles);
  } catch (err) {
    console.error("Error fetching riddles:", err.message);
  }
}

// 3. Create a new riddle
async function add() {
  const name = input("Enter riddle name: ");
  const taskDescription = input("Enter task description: ");
  const correctAnswer = input("Enter correct answer: ");
  try {
    await createRiddle({ name, taskDescription, correctAnswer });
    console.log("✅ Riddle created!");
  } catch (err) {
    console.error("Error creating riddle:", err.message);
  }
}

// 4. Update an existing riddle
async function update() {
  const id = Number(input("Enter riddle ID to update: "));
  const name = input("New riddle name: ");
  const taskDescription = input("New task description: ");
  const correctAnswer = input("New correct answer: ");
  try {
    await updateRiddle({ id, name, taskDescription, correctAnswer });
    console.log("✅ Riddle updated!");
  } catch (err) {
    console.error("Error updating riddle:", err.message);
  }
}

// 5. Delete a riddle
async function del() {
  const id = input("Enter riddle ID to delete: ");
  try {
    await deleteRiddle(id);
    console.log("✅ Riddle deleted!");
  } catch (err) {
    console.error("❌ Error deleting riddle:", err.message);
  }
}

// 6. Show leaderboard
async function showLeadBoard() {
  try {
    const players = await getPlayers();
    players.sort((a, b) => a.lowestTime - b.lowestTime);
    console.table(players);
  } catch (err) {
    console.error("Error fetching leaderboard:", err.message);
  }
}


export { 
    exitApp,
    showAllRiddles,
    add,
    update,
    del,
    showLeadBoard
}