const { Router } = require("express");
const router = Router();


const { sendEmail } = require("../controllers/mailerController");

router.post("/send", sendEmail);

module.exports = router;