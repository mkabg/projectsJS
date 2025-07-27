import readlineSync from 'readline-sync';

export default class Riddle
{
    constructor(id, name, taskDescription, correctAnswer)
    {
        this.id = id;
        this.name = name;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
    }

    showRiddle(num)
    {
        console.log(`Riddle #${num} ${this.name}`);
        console.log(this.taskDescription);
    }   
    
    ask()
    {
        const answer = readlineSync.question('enter your answer \n');
        return answer;
    }

    compare(input)
    {
        if (input === this.correctAnswer)
        {
            console.log("That's correct! Well done.");
            return true;
        }
        else
        {
            console.log("not correct try again");
            return false;
        }
    }

    async repeat(num)
    {
        this.showRiddle(num);
        let isCorrect = false;

        while (!isCorrect)
        {
            const input = this.ask();
            isCorrect = this.compare(input);
        }
    }
}
