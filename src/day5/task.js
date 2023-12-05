const fs = require('fs');

const input1 = fs.readFileSync('input-1.txt').toString().split('\n\n');
const input2 = fs.readFileSync('input-2.txt').toString().split('\n\n');

const seeds = input1[0].split(': ').pop().split(' ').map(Number);
const seeds2 = input2[0].split(': ').pop().split(' ').map( (seed) => +seed);

const list = () => {
    return input1.flatMap( (maps, i) => {
        if ( !i ) return [];
        const lines = maps.split(':\n').pop().split('\n').flatMap( (line) => {
            return Array.of(line.split(' ').map(Number));
        });

        return Array.of(lines);
    });
}
const list2 = () => {
    return input2.flatMap( (maps, i) => {
        if ( !i ) return [];
        const lines = maps.split(':\n').pop().split('\n').flatMap( (line) => {
            const [destRangeStart, srcRangeStart, rngLength] = line.split(' ').map(Number);

            return {
                destRangeStart: +destRangeStart,
                srcRangeStart: +srcRangeStart,
                rngLength: +rngLength,
              };
        });

        return Array.of(lines);
    });
}

const minLocations = () => {
    const maps = list();
    var locations = [];

    seeds.forEach( (seed) => {
        for(let i=0;i< maps.length; i++) {
            for(let assignment of maps[i]) {
                const [to, from, range] = assignment;

                if(seed >= from && seed <= from + range -1) {
                    seed = to + (seed - from);
                    break;
                }
            }
        }
        locations.push(seed);
    });
    return Math.min(...locations);
}


const minLocations2 = () => {
    const seeds = seeds2;
    const conv = list2();
    const lowestSeedsInRanges = [];

    for (let i = 0; i < seeds.length; i += 2) {
        const seedStart = seeds[i];
        const seedEnd = seeds[i + 1] + seedStart;
        lowestSeedsInRanges.push(
          getLowestFinalPos(seedStart, seedEnd, conv)
        );
    }
      
    return Math.min(...lowestSeedsInRanges);    

}

const getLowestFinalPos = (start, end, conversions) => {
    let seedLocationRanges = [{ start, end }];
    for (const conversionStep of conversions) {
      const convertedValues = [];
      let unconvertedValues = [...seedLocationRanges];
      for (const conversionRange of conversionStep) {
        const conversionSrc = {
          start: conversionRange.srcRangeStart,
          end: conversionRange.srcRangeStart + conversionRange.rngLength - 1,
        };
        const conversionValue =
          conversionRange.destRangeStart - conversionRange.srcRangeStart;
        const conversionRemainder = [];
  
        unconvertedValues.forEach((unconvertedValue) => {
          const { result, remainder } = mapRange(
            unconvertedValue,
            conversionSrc,
            conversionValue
          );
          if (result) {
            convertedValues.push(result);
          }
          conversionRemainder.push(...remainder);
        });
        unconvertedValues = conversionRemainder;
      }
      seedLocationRanges = [...convertedValues, ...unconvertedValues];
    }
    return Math.min(...seedLocationRanges.map((range) => range.start));
}

const mapRange = (srcRange, conversionRange, conversionValue) => {
    let result = undefined;
    const remainder = [];
  
    const convertableRange = {
      start: Math.max(srcRange.start, conversionRange.start),
      end: Math.min(srcRange.end, conversionRange.end),
    };
  
    if (convertableRange.start <= convertableRange.end) {
      result = {
        start: convertableRange.start + conversionValue,
        end: convertableRange.end + conversionValue,
      };
      if (srcRange.start < convertableRange.start) {
        remainder.push({
          start: srcRange.start,
          end: convertableRange.start - 1,
        });
      }
      if (srcRange.end > convertableRange.end) {
        remainder.push({
          start: convertableRange.end + 1,
          end: srcRange.end,
        });
      }
    } else {
      remainder.push(srcRange);
    }
    return { result, remainder };
}

// console.log(minLocations());
console.log(minLocations2());