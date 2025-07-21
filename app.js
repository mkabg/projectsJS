import dotenv from "dotenv";
dotenv.config();
import showMenu from "./ui/menu.js";
import { input } from "./utils/formatter.js";
import flow from "./flow.js";



// Main loop
async function main() {
  while (true) {
    showMenu();
    const choice = Number(input("Choose option (0-6): "));
    await flow(choice);
    console.log(); // blank line before re-showing menu
  }
}

// Start the app
main();
