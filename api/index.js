const getSheetData = require('../utilities/get-sheet-data');
const transformData = require('../utilities/transform-data');
const createLambdaHandler = require('../utilities/create-lambda-handler');

module.exports.handler = createLambdaHandler(async () => {
  const {
    GOOGLE_SHEETS_DOC_ID: docId,
    GOOGLE_SHEETS_SHEET_NAME: sheetName,
    GOOGLE_SHEETS_API_KEY: apiKey
  } = process.env;

  const data = await getSheetData(docId, sheetName, apiKey);
  const result = transformData(data);

  return result;
});