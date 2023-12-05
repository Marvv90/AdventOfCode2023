const fs = require('fs');

const table = fs.readFileSync('input-1.txt').toString().split('\n');
const table2 = fs.readFileSync('input-2.txt').toString().split('\n');

const summary1 = () => table.flatMap( (rows) => {
    const game = rows.split(':').pop();
    const [winNums, nums] = game.split(' | ').map( nums => nums.trim().split(' ').filter(n => n !== ''));
    return isWinningNumber(winNums,nums);
}).reduce( (a,b) => a+b, 0);

const isWinningNumber = (winNums,nums) => {
    var sum = 0;
    nums.forEach(num => {
         if ( winNums.indexOf(num) != -1 ) {
            sum = sum === 0 ? 1 : sum*2;
         }
    });

    return sum;
}

const summary2 = () =>  {
    const counts = Array(table2.length).fill(1);
    
    table2.forEach( (line,index) => {
        const [winNums, nums] = line.split(':').pop().split(' | ').map( nums => nums.trim().split(' ').filter(n => n !== ''));

        const matches = nums.filter( n => winNums.includes(n)).length;

        for (let i = 1; i <= matches; i++) {
            counts[index+i] += counts[index];
        }
    });

    return counts.reduce( (a,b) => a+b,0);
};

const pointsSummary = summary1();
const cardsSummary = summary2();

console.log(pointsSummary);
console.log(cardsSummary);