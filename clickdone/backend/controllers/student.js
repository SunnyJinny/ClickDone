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
const studentSchema = new Mongoose.Schema(
  {
    name: {type: String, require: true },
    geburtsdatum: {type: String, require: true },
    geschlecht: {type: String, require: true },
    adresse: {type: String, require: true },
    schule: {type: String, require: true },
    betreuer: {type: String },
    email: {type: String },
    bewerbungDatum: {type: String },
    rueckmeldungDatum: { type: String },
    startDatum: { type: String },
    endDatum: { type: String },
    status: { type: String },
    motivation: { type: Boolean },
    lebenslauf: { type: Boolean },
    zeugnis: { type: Boolean },
    notiz: { type: String },
    bewertung: { type: String }
  }, { timestamps: true, versionKey: false}
);

studentSchema.add(UniqueObjectId);
const Student = Mongoose.model('student', studentSchema);

export function getAll() {
  return Student.find({}).sort({ "_id": -1 });
}

export function getItem(_id) {
  return Student.findById(_id);
}

export function create(name, geburtsdatum, geschlecht, adresse, schule, betreuer, email, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung) {
  return new Student({
    name, geburtsdatum, geschlecht, adresse, schule, betreuer, email, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung
  }).save();  
}

export function update(id, name, geburtsdatum, geschlecht, adresse, schule, betreuer, email, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung) {
  return Student.findByIdAndUpdate(id, {name, geburtsdatum, geschlecht, adresse, schule, betreuer, email, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung}, { returnOriginal: false });
}

export function remove(id) {
  return Student.findByIdAndRemove(id);
}

export function getByState(status) {
  return Student.find({ status: status }, {name: 1, geburtsdatum: 1, geschlecht: 1, adresse: 1, schule: 1, betreuer: 1, email: 1, bewerbungDatum: 1, rueckmeldungDatum: 1, startDatum: 1, endDatum: 1, status: 1, motivation: 1, lebenslauf: 1, zeugnis: 1, notiz: 1, bewertung: 1}).sort({ "_id": -1 })
}

export function getByDate(startDatum, endDatum) {
  return Student.find({
    startDatum: { $gte: startDatum },
    endDatum: { $lte: endDatum }
  }, {name: 1, geburtsdatum: 1, geschlecht: 1, adresse: 1, schule: 1, betreuer: 1, email: 1, bewerbungDatum: 1, rueckmeldungDatum: 1, startDatum: 1, endDatum: 1, status: 1, motivation: 1, lebenslauf: 1, zeugnis: 1, notiz: 1, bewertung: 1})
}
