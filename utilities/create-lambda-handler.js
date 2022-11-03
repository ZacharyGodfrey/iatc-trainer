module.exports = (getDataAsync) => {
  return async (event) => {
    const data = await getDataAsync();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'application/json',
        'x-powered-by': ''
      },
      isBase64Encoded: false,
      body: JSON.stringify(data, null, 2)
    };
  };
};