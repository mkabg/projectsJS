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

    ShowRiddle()
    {
        console.log(`Riddle #${this.id}: ${this.name}`);
        console.log(this.taskDescription);
    }   
    
    Ask()
    {
        const answer = readlineSync.question('enter your answer \n');
        return answer;
    }

    Compare(input)
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

    Repeat()
    {
        this.ShowRiddle();

        let isCorrect = false;

        while (!isCorrect)
        {
            const input = this.Ask();
            isCorrect = this.Compare(input);
        }
    }
}