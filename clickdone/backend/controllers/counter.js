import Mongoose from "mongoose";

const ObjectId = Mongoose.Types.ObjectId;
const UniqueObjectId = new Mongoose.Schema({
  _id: {
      type: String,
      default: function () {
          return new ObjectId().toString()
      }
  }
})
const counterSchema = new Mongoose.Schema(
  {
    improzess: {type: Number},
    freiepraktika: {type: Number}
  }, { timestamps: true, versionKey: false}
);
counterSchema.add(UniqueObjectId);
const Counter = Mongoose.model('counter', counterSchema);

export function getItem(_id) {
  return Counter.findById(_id);
}

export function create(improzess, freiepraktika) {
  return new Counter({ improzess, freiepraktika }).save();
}

export function update(id, improzess, freiepraktika) {
  return Counter.findByIdAndUpdate(id, { improzess, freiepraktika }, { returnOriginal: false });
}
