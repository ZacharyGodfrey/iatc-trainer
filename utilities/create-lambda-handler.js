module.exports = (getDataAsync) => {
  return async (event) => {
    const data = await getDataAsync();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/json',
        'x-powered-by': ''
      },
      isBase64Encoded: false,
      body: JSON.stringify(data, null, 2)
    };
  };
};