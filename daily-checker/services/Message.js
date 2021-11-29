const { startOfDay, endOfDay } = require("date-fns");
const { Message } = require("../db/models/Message.js");

const getTodayMsgs = async () => {
  try {
    console.log("getting msgs");
    const msgs = await Message.find({
      date: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
      emailSent: false,
    });
    console.log({ msgs });
    return msgs;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getTodayMsgs };
