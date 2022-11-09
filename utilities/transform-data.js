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

module.exports = (sheetDataObjects) => {
  return sheetDataObjects.map((sheetData) => {
    const denormalized = denormalizeSheetData(sheetData);
    const result = {
      timestamp: dayjs(denormalized.timestamp, 'M/D/YYYY HH:mm:ss').format('DD MMM YYYY hh:mm a'),
      totalMatchScore: 0,
      averageMatchScore: 0,
      match1: {
        total: sum(Object.values(denormalized.match1)),
        ...denormalized.match1
      },
      match2: {
        total: sum(Object.values(denormalized.match2)),
        ...denormalized.match2
      },
      match3: {
        total: sum(Object.values(denormalized.match3)),
        ...denormalized.match3
      },
      match4: {
        total: sum(Object.values(denormalized.match4)),
        ...denormalized.match4
      },
      match5: {
        total: sum(Object.values(denormalized.match5)),
        ...denormalized.match5
      },
      bigAxe: {
        total: sum(Object.values(denormalized.bigAxe)),
        ...denormalized.bigAxe
      },
    };

    result.totalMatchScore = sum([
      result.match1.total,
      result.match2.total,
      result.match3.total,
      result.match4.total,
      result.match5.total,
    ]);

    result.averageMatchScore = roundToPlaces(result.totalMatchScore / 5, 3);

    return result;
  });
};