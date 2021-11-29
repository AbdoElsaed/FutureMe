import mongoose from "mongoose";
import validator from "validator";

const MessageSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    date: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: "not a valid email!",
      },
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    emailSent: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
