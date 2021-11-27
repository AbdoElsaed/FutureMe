import dbConnect from "../../lib/dbConnect";
import Message from "../../models/Message";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (req.query.filter === "public") {
          const msgs = await Message.find({ isPublic: true });
          res.status(200).json({ status: "success", msgs });
        }else if(req.query.filter === "single"){
          const msg = await Message.findOne({ _id: req.query.id });
          res.status(200).json({ status: "success", msg });
        }
         else {
          res.status(400).json({ msg: "unsupported request" });
        }
      } catch (error) {
        res.status(400).json({ status: "failure", error });
      }
      break;
    case "POST":
      try {
        const msg = await Message.create(req.body);
        res.status(201).json({ status: "success", data: msg });
      } catch (error) {
        res.status(400).json({ status: "failure", error });
      }
      break;
    default:
      res.status(400).json({ msg: "unsupported request" });
      break;
  }
}
