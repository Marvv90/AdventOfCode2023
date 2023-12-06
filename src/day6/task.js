const fs = require('fs');

const races = () => {
    const attempts = [];
    const [times,distances] = fs.readFileSync('input-1.txt').toString().split('\n').flatMap( (line) => {
        return Array(line.split(':').pop().trim().split(/\s+/));
    });

    times.forEach( (time,index) => {
        attempts.push({time: time, distance: distances[index]});
    });

    return attempts;
}

const racesPart2 = () => {
    const attempts = [];
    const [times,distances] = fs.readFileSync('input-2.txt').toString().split('\n').flatMap( (line) => {
        return Array(line.split(':').pop().trim().replace(/\s/g,''));
    });

    attempts.push({time: times, distance: distances});

    return attempts;
}

const calculateWins = () => {
    const attempts = races();
    let summary = 1;

    for(const race of attempts) {
        const wins = [];
        const {time,distance} = race;

        for(let i=1;i<time;i++) {
            let travelTime = time-i;
            let travelDistance = travelTime*i;

            if ( travelDistance > distance) wins.push(i);
        }

        summary *= wins.length;
    }

    return summary;
}

const calculateWinsPart2 = () => {
    const attempts = racesPart2();
    let summary = 0;

    for(const race of attempts) {
        const wins = [];
        const {time,distance} = race;

        for(let i=1;i<time;i++) {
            let travelTime = time-i;
            let travelDistance = travelTime*i;

            if ( travelDistance > distance) wins.push(i);
        }

        summary += wins.length;
    }

    return summary;
}

console.log('Summary Part-1:',calculateWins());
console.log('Summary Part-2:',calculateWinsPart2());