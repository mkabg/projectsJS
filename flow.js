import playGame from "./game.js";
import {
    exitApp,
    showAllRiddles,
    add,
    update,
    del,
    showLeadBoard

} from "./ui/menu.js"
export default async function flow(choice) {
switch (choice) {
    case 0:
        exitApp();
        break;
    case 1:
        await playGame();
        break;
    case 2:
        await showAllRiddles();
        break;
    case 3:
        await add();
        break;
    case 4:
        await update();
        break;
    case 5:
        await del();
        break;
    case 6:
        await showLeadBoard();
        break;
      
    default:
        console.log("⚠️  Invalid choice, please try again.");
    }
}