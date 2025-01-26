
const sendResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
  };
  
  module.exports = { sendResponse };
  