import readlineasync from "readline-sync";


function input(question){
    return readlineasync.question(question);
}

function print(msg) {
    console.log(msg);
}

export {
    input, 
    print
}
