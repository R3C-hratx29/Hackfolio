module.exports = (obj, status, headers = {}) => {
  return {
    statusCode: status || 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      ...headers
    },
    body: JSON.stringify(obj),
  };
};
