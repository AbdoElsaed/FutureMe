const cron = require("node-cron");
require("dotenv").config();
require("./db/mongoose.js");

const { Message } = require("./db/models/Message");
const { getTodayMsgs } = require("./services/db.js");
const { send } = require("./services/Mailer");

// run cron job every day at midnight
cron.schedule("0 0 * * *", async () => {
  const msgs = await getTodayMsgs();
  if (!msgs.length) {
    return console.log("there isn't any message today!");
  }
  msgs.map(async (el) => {
    const d = {
      msg: el.msg,
      deliveryDate: el.date,
      receiver: el.email,
      writingDate: el.createdAt,
    };
    const res = await send(d);
    if (res) {
      await Message.findByIdAndUpdate(el._id, { emailSent: true });
    }
  });
});
