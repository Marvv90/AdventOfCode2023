const fs = require('fs');
const intString = {'one': 1,'two': 2,'three': 3,'four': 4,'five': 5,'six': 6,'seven': 7,'eight': 8,'nine': 9};

function task1() {
    const lines = fs.readFileSync('input-1.txt').toString().split("\n");
    var start = 0;
    var end = 0;
    var sum = 0;

    lines.forEach( (line) => {
        for(let i=0; i<line.length; i++) {
            start = findNum(line,i, false);

            if (start !== 0) break;
        }
        for(let i=line.length-1; i >= 0; i--) {
            end = findNum(line, i, false);

            if(end !== 0) break;
        }
        sum += +`${start}${end}`
    });

    console.log('Task-1 Summary:', sum);
}


function task2() {
    const lines = fs.readFileSync('input-2.txt').toString().split("\n");
    var start = 0;
    var end = 0;
    var sum = 0;

    lines.forEach( (line) => {
        for(let i=0; i<line.length; i++) {
            start = findNum(line,i, true);

            if (start !== 0) break;
        }
        for(let i=line.length-1; i >= 0; i--) {
            end = findNum(line, i, true);

            if(end !== 0) break;
        }
        sum += +`${start}${end}`
    });

    console.log('Task-2 Summary:', sum);
}

function findNum(line, i, withLetters) {
    if(Number.isInteger(+line[i])) {
        return +line[i];
    }
    if (withLetters) {
        for(const num of Object.keys(intString)) {
            if(line.substring(i).indexOf(num) === 0) {
                return intString[num];
            }
        }
    }
    return 0;
}

task1();
task2();