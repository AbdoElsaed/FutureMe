const hbs = require("nodemailer-express-handlebars");
const { createTransport } = require("nodemailer");
const { resolve } = require("path");

// initialize nodemailer
var transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACC,
    pass: process.env.GMAIL_PASS,
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: resolve("./views/"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

const sendLetter = async (mailOptions) => {
  try {
    const res = await transporter.sendMail(mailOptions);
    console.log("Message sent: " + res.response);
    return res;
  } catch (err) {
    console.log(err)
  }
};

module.exports = { sendLetter };
