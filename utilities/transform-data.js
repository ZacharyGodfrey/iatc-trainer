const dayjs = require('dayjs');

const sum = (values) => {
  return values.reduce((total, value) => total + value, 0);
};

const roundToPlaces = (number, places) => {
  const factor = 10 ** places;

  return Math.round(number * factor) / factor;
};

const switchKey = (key) => {
  const matchPattern = /^Match \d{1} \[Throw \d{1,2}\]$/;
  const bigAxePattern = /^Big Axe \[Throw \d{1,2}\]$/;
  const parts = key.replace('[', '').replace(']', '').split(' ');

  switch (true) {
    case key === 'Timestamp': return 'timestamp';
    case matchPattern.test(key): return `match${parts[1]}.throw${parts[3]}`;
    case bigAxePattern.test(key): return `bigAxe.throw${parts[3]}`;
    default: return key;
  }
};

const parseValue = (value) => {
  const isNumeric = /^\d+$/.test(value);

  return isNumeric ? parseInt(value, 10) : value;
};

const denormalizeSheetData = (sheetData) => {
  return Object.entries(sheetData).reduce((agg, [key, value]) => {
    const newKey = switchKey(key);
    const newValue = parseValue(value);
    const [prefix, suffix] = newKey.split('.');

    if (suffix) {
      agg[prefix] = agg[prefix] || {};
      agg[prefix][suffix] = newValue;
    } else {
      agg[prefix] = newValue;
    }

    return agg;
  }, {});
};

const byDescending = (items, selector) => {
  return items.sort((left, right) => {
    const l = selector(left), r = selector(right);

    return r < l ? -1 : r > l ? 1 : 0;
  });
};

const transformMatch = (name, denormalizedMatch) => {
  const throws = Object.values(denormalizedMatch);

  return {
    name,
    throws,
    total: sum(throws),
    ...denormalizedMatch
  };
};

module.exports = (sheetDataObjects) => {
  const mapped = sheetDataObjects.map((sheetData) => {
    const denormalized = denormalizeSheetData(sheetData);
    const date = dayjs(denormalized.timestamp, 'M/D/YYYY HH:mm:ss');
    const result = {
      id: date.toISOString(),
      date: date.format('YYYY MMM DD'),
      time: date.format('hh:mma'),
      totalMatchScore: 0,
      averageMatchScore: 0,
      matches: [],
      match1: transformMatch('Match 1', denormalized.match1),
      match2: transformMatch('Match 2', denormalized.match2),
      match3: transformMatch('Match 3', denormalized.match3),
      match4: transformMatch('Match 4', denormalized.match4),
      match5: transformMatch('Match 5', denormalized.match5),
      bigAxe: transformMatch('Big Axe', denormalized.bigAxe),
    };

    result.totalMatchScore = sum([
      result.match1.total,
      result.match2.total,
      result.match3.total,
      result.match4.total,
      result.match5.total,
    ]);

    result.averageMatchScore = roundToPlaces(result.totalMatchScore / 5, 3);

    result.matches = [
      result.match1,
      result.match2,
      result.match3,
      result.match4,
      result.match5,
      result.bigAxe,
    ];

    return result;
  });

  return byDescending(mapped, ({ id }) => id);
};
