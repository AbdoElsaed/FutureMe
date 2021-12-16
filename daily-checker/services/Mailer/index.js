const { transporter } = require("./transporter");

const send = async (d) => {
  try {
    const { receiver, msg, deliveryDate, writingDate, mood } = d;
    const d1 = new Date(writingDate).toLocaleString().split(",")[0];
    const d2 = new Date(deliveryDate).toLocaleString().split(",")[0];
    const subject = `a message from your old self at ${new Date(writingDate).toLocaleString()}`;
    const moodLine = mood !== "" ? `Sincerely, \n your ${mood} version` : "";
    const footer = `${d1} → ${d2}`;

    const mailOptions = {
      from: process.env.GMAIL_ACC,
      to: receiver,
      subject,
      template: "email",
      context: { msg, footer, moodLine },
    };

    const res = await transporter.sendMail(mailOptions);
    console.log("Message sent: " + res.response);
    return res;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { send };
