exports.successResponse = (data, statusCode, message, res) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

exports.failedResponse = (statusCode, message, res) => {
  res.status(statusCode).json({
    success: false,
    message,
    data:null,
});
};