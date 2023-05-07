import Mongoose from "mongoose";

const studentSchema = new Mongoose.Schema(
  {
    name: {type: String, require: true },
    geburtsdatum: {type: String, require: true },
    geschlecht: {type: String, require: true },
    adresse: {type: String, require: true },
    schule: {type: String, require: true },
    betreuer: {type: String },
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

const Student = Mongoose.model('student', studentSchema);

export function getAll() {
  return Student.find({}).sort({ "_id": -1 });
}

export function create(name, geburtsdatum, geschlecht, adresse, schule, betreuer, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung) {
  return new Student({
    name, geburtsdatum, geschlecht, adresse, schule, betreuer, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung
  }).save();  
}


