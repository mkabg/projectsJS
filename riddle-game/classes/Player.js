export default class Player
{
    constructor(name)
    {
        this.name = name;
        this.times = [];
    }

    RecordTime(start, end)
    {
        const duration = end - start; // milliseconds
        this.times.push(duration);
    }

    ShowStats()
    {
        const totalTime = this.times.reduce((sum, t) => sum + t, 0);
        const averageTime = this.times.length > 0 ? totalTime / this.times.length : 0;

        console.log(`\nGreat job, ${this.name}!`);
        console.log(`Total time: ${(totalTime / 1000).toFixed(2)} seconds`);
        console.log(`Average time per riddle: ${(averageTime / 1000).toFixed(2)} seconds`);
    }
}