const fs = require('fs');
const colors = ["red","green","blue"];

const games = fs.readFileSync('input-2.txt').toString().split("\n").map( (item) => {
    const [gameId, results] = item.split(': ');
    const id = gameId.replace('Game ', '');
    const sets = results.split('; ').map( (set) => {
        return set.split(', ').map( (cubes) => {
            const [num, color] = cubes.split(' ');
            return [parseInt(num), color];
        });
    });

    return { id, sets};
});

const isGamePossible = (game) => {
    const limits = {
        red: 12,
        green: 13,
        blue: 14,
    };

    return !game.sets.some( (set) => 
        set.some(([num, color]) => num > limits[color])
    );
}

const getMinCubes = (game) => {
    const minQuantities = { red: 0, green: 0, blue: 0};

    for (const set of game.sets) {
        set.forEach( ([num, color]) => {
            minQuantities[color] = Math.max(minQuantities[color], num);
        });
    }
    return minQuantities;
}

const calculateGameIdsSum = (games) => games.reduce( (sum, game) => (isGamePossible(game) ? sum + parseInt(game.id) : sum), 0);

const calculatePowerSum = (games)  => {
    const powers = games.map( (game) => {
        const minValues = Object.values(getMinCubes(game));
        return minValues.reduce((acc,val) => acc * val, 1);
    });
    return powers.reduce((acc, val) => acc + val, 0);
};

const gameIdSum = calculateGameIdsSum(games);
const powerSum = calculatePowerSum(games);

console.log('GameIdSum:',gameIdSum);
console.log('PowerSum', powerSum);