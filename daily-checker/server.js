const express = require("express");
var cors = require("cors");
require("dotenv").config();
require("./db/mongoose.js");

const app = express();
app.use(cors());

const port = 5000;
const { Message } = require("./db/models/Message");
const { addMsgToQueue } = require("./services/Queue/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/addToQueue", async (req, res) => {
  try {
    const msg = await Message.create(req.body);
    let data = await addMsgToQueue({ msgId: msg._id, body: req.body });
    return res.status(201).json({ status: "success", data });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: "failure", err });
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
