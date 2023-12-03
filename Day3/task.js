const fs = require('fs');

const lines = fs.readFileSync('input-1.txt').toString().split('\n');
const lines2 = fs.readFileSync('input-2.txt').toString().split('\n');

const sum1 = () => lines.flatMap( (row, y) => {
    const foundNumbers = Array.from(row.matchAll(/[\d]+/g));

    return foundNumbers.flatMap( (match) => {
        const { 0: number, index: x} = match;

        return adjacentSymbol(lines, x, x + number.length - 1, y) ? [parseInt(number)] : [];
    });
}).reduce( (a,b) => a + b, 0);

const adjacentSymbol = (lines, x1, x2, row) => {
    for ( let y = row - 1; y <= row + 1; y++) {
        for ( let x = x1 - 1; x <= x2 + 1; x++) {
            if ( !lines[y] || !lines[y][x] ) continue;

            const c = lines[y][x];

            if ( c !== '.' && !(c >= '0' && c <= '9') ) return true;
        }
    }
    return false;
}

const engineSummary = sum1();

console.log('Task-1 Summary:',engineSummary);

const sum2 = () => lines2.flatMap( (row, y) => {
    return row.split('').flatMap( (c, x) => c === '*' ? [x] : [])
    .map( (x) => findAdjacentNumbers(lines2, x, y) )
    .filter( n => n.length === 2)
    .map( n => n.reduce( (a,b) => a * b ,1))
}).reduce( (a,b) => a + b, 0);

const findAdjacentNumbers = (lines, x, y) => {
    const numbers = [];

    for (let dy = y - 1; dy <= y + 1; dy++) {
        const row = lines[dy];
        const foundNumbers = Array.from(row.matchAll(/[\d]+/g));

        const adjacent = foundNumbers.flatMap( (match) => {
            const { 0: number, index: x1 } = match;

            const x2 = x1 + number.length - 1;

            return x2 >= x - 1 && x1 <= x + 1 ? [parseInt(number)] : [];
        });
        numbers.push(...adjacent);
    }
    return numbers;
}

const gearSummary = sum2();

console.log('Task-2 Summary:',gearSummary);