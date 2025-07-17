const URL = "http://localhost:3000/riddles"

// export let riddles = [];

async function getAllRiddles() {
    const response = await fetch(URL)    
    const riddles = await response.json();
    return riddles;
}

async function createRiddle(riddle) {
    const response = fetch(URL + "/create", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(riddle)
    });
    console.log((await response).status)
}

async function updateRiddle(riddle) {
    const response = await fetch(URL + "/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(riddle)
    });
    console.log(response.status)
}

async function deleteRiddle(id) {
    const response = await fetch(URL + "/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(id)});
    console.log(response.status);
}

function showRiddles(riddles){
    console.log(riddles);
}

export {
    getAllRiddles,
    createRiddle, 
    updateRiddle, 
    deleteRiddle
}

// getRiddles();
// console.log(await getRiddles());

// createRiddle({
//     // id: 7,
//     name: 'math',
//     taskDescription: "What is 7 * 7",
//     correctAnswer: '49'
//   })

// updateRiddle({
//     id: 8,
//     name: 'math',
//     taskDescription: "What is 17 * 7",
//     correctAnswer: '119'
// })

// deleteRiddle({
//     id: 8
// })
