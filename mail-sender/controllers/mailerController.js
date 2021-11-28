const { sendLetter } = require("../services/mailer");

const sendEmail = async (req, res) => {
  try {
    const { receiver, msg, deliveryDate, writingDate } = req.body;
    const d1 = new Date(writingDate).toLocaleString().split(',')[0]
    const d2 = new Date(deliveryDate).toLocaleString().split(',')[0]

    const footer = `${d1} → ${d2}`;

    const mailOptions = {
      from: process.env.GMAIL_ACC,
      to: receiver,
      subject: `a message from your old self at ${new Date(writingDate).toLocaleString()}`,
      template: "email",
      context: { msg, footer },
    };

    const result = await sendLetter(mailOptions);
    console.log(result);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

module.exports = { sendEmail };
