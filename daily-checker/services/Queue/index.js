const Bull = require("bull");
const { Message } = require("../../db/models/Message");
const { send } = require("../Mailer");

const msgsQueue = new Bull("future-msgs", process.env.REDIS_URL);

// when job is completed
msgsQueue.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed`);
});

// function to process a job
msgsQueue.process(async (job, done) => {
  console.log(`job ${job.id} is being processed!`);
  let { msgId } = job.data;
  try {
    let elm = await Message.findById(msgId);
    const d = {
      msg: elm.msg,
      deliveryDate: elm.date,
      receiver: elm.email,
      writingDate: elm.createdAt,
      mood: elm.mood,
    };
    const res = await send(d);
    if (res) {
      console.log({ "res after sending mail": res });
      await Message.findByIdAndUpdate(elm._id, { emailSent: true });
      job.moveToCompleted("done", true);
    }
    done();
  } catch (err) {
    if (err.response) {
      console.log(err);
      job.moveToFailed({ message: "job failed" });
    }
  }
});

// add a job the queue
const addMsgToQueue = async ({ msgId, body }) => {
  let { date } = body;
  let timeMs = new Date(date).getTime() - new Date().getTime() + 3.6e6;
  let job = await msgsQueue.add({ msgId }, { delay: timeMs });
  console.log(`msg with db id ${msgId} is added to queue`);
  let {
    id: jobId,
    data,
    delay,
    name: jobName,
    queue: { name: queueName },
  } = job;
  return { jobId, msgId, data, delay, jobName, queueName };
};

module.exports = {
  addMsgToQueue,
};
