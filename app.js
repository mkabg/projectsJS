// app.js
import playGame from "./game.js";
import {
  getAllRiddles,
  createRiddle,
  updateRiddle as apiUpdateRiddle,
  deleteRiddle as apiDeleteRiddle
} from "./api/riddles-api.js";
import { getPlayers } from "./api/player-api.js";
import { showMenu } from "./ui/menu.js";
import { input } from "./utils/formatter.js";

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
async function addRiddleMenu() {
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
async function updateRiddleMenu() {
  const id = Number(input("Enter riddle ID to update: "));
  const name = input("New riddle name: ");
  const taskDescription = input("New task description: ");
  const correctAnswer = input("New correct answer: ");
  try {
    await apiUpdateRiddle({ id, name, taskDescription, correctAnswer });
    console.log("✅ Riddle updated!");
  } catch (err) {
    console.error("Error updating riddle:", err.message);
  }
}

// 5. Delete a riddle
async function deleteRiddleMenu() {
  const id = Number(input("Enter riddle ID to delete: "));
  try {
    await apiDeleteRiddle(id);
    console.log("✅ Riddle deleted!");
  } catch (err) {
    console.error("Error deleting riddle:", err.message);
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

// 0. Exit
function exitApp() {
  console.log("Goodbye!");
  process.exit(0);
}

// Main loop
async function main() {
  while (true) {
    showMenu();
    const choice = Number(input("Choose option (0-6): "));

    switch (choice) {
      case 1:
        await playGame();
        break;
      case 2:
        await showAllRiddles();
        break;
      case 3:
        await addRiddleMenu();
        break;
      case 4:
        await updateRiddleMenu();
        break;
      case 5:
        await deleteRiddleMenu();
        break;
      case 6:
        await showLeadBoard();
        break;
      case 0:
        exitApp();
        break;
      default:
        console.log("⚠️  Invalid choice, please try again.");
    }

    console.log(); // blank line before re-showing menu
  }
}

// Start the app
main();
