import Mongoose from "mongoose";

const emailSchema = new Mongoose.Schema(
  {
    email: { type: string, required: true },
    title: { type: string, required: true },
    massage: { type: string, required: true },
  }, { timestamps: true, versionKey: false }
);

const SendEmail = Mongoose.model('sendEmail', emailSchema);
