const getSheetData = require('../utilities/get-sheet-data');
const createLambdaHandler = require('../utilities/create-lambda-handler');

module.exports.handler = createLambdaHandler(async () => {
  const {
    GOOGLE_SHEETS_API_KEY: apiKey,
    GOOGLE_SHEETS_DOC_ID: docId,
    GOOGLE_SHEETS_SHEET_NAME: sheetName
  } = process.env;

  const data = await getSheetData(apiKey, docId, sheetName);

  return data;
});