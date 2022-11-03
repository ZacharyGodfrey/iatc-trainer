const axios = require('axios');

const fetch = (docId, sheetName, apiKey) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${docId}/values/${sheetName}?key=${apiKey}`;
  const { data } = await axios.get(url);

  return data.values;
};

const transform = (headers, rows) => {
  return rows.map(row => {
    return row.reduce((result, value, index) => {
      const key = headers[index];

      result[key] = value;

      return result;
    }, {});
  });
};

module.exports = async (docId, sheetName, apiKey) => {
  const [headers, ...rows] = await fetch(docId, sheetName, apiKey);
  const data = transform(headers, rows);

  return data;
};