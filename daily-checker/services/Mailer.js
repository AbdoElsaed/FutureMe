const axios = require("axios");

const sendEmail = async (data) => {
  try {
    const response = await axios({
      method: "post",
      url: process.env.MAILER_API,
      data,
    });
    const res = await response.data;
    return res;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendEmail };
