// import Riddle from "../models/Riddle.js";
// import { getAllRiddles , createRiddle, updateRiddle , deleteRiddle } from "../api/riddles-api.js";
// import { input } from "../utils/formatter.js";
// import player from "../game.js";

function showMenu() {
    console.log("enter 1 to play the game");
    console.log("enter 2 to read all riddels");
    console.log("enter 3 to creat a new riddle");
    console.log("enter 4 to update an existing riddle");
    console.log("enter 5 to delete a riddle");
    console.log("enter 6 to view leaderboard");
}

// function select(selction) {
//     switch (selction) {
//         case 1:
//             play();
//             break;
//         case 2:
//             const name = input("Enter riddle name");
//             const taskDescription = input("Enter taskDescription");
//             const correctAnswer = input("Enter correctAnwser")
//             createRiddle({
//                 "name": name,
//                 "taskDescription": taskDescription,
//                 "correctAnswer": correctAnswer
//             })
//             break;
//         case 3:
//             const id = input("Enter riddle id");
//             const newName = input("Enter riddle name");
//             const newTaskDescription = input("Enter taskDescription");
//             const newCorrectAnswer = input("Enter correctAnwser")
//             updateRiddle({
//                 "id": id,
//                 "name": newName,
//                 "taskDescription": newTaskDescription,
//                 "correctAnswer": newCorrectAnswer
//             });
//             break;
//         case 4:
//             idToDelete = input("Enter riddle id");
//             deleteRiddle({"id": idToDelete})
//             break;
//         case 5:
//             input("Enter the id in the following structure: {id}");
//             break;
//     }
// }

// async function play() {
//     const data = await getAllRiddles();
//     const riddles = data.map(r => new Riddle(r.id, r.name, r.taskDescription, r.correctAnswer));

//     riddles.forEach((riddle) => {
//         const start = Date.now();
//         riddle.Repete();
//         const end = Date.now();
//         player.RecordTime(start, end);
//     });
//     player.ShowState()

    
// }



// function createR(riddle) {
    
// }


// function showAllRiddles() {

// }


// function updateR(id, newRiddle) {

// }


// function deleteR(id) {

// }


// function viewLeaderboard() {

// }

export {
    showMenu,
    
}