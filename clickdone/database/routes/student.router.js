import express from 'express';
const router = express.Router();
import * as studentRepository from '../controllers/student.js';


router.get('/list', async (req, res) => {
  const students = await studentRepository.getAll();
  if (students) {
    return res.status(200).json(students);
  }
  return res.status(404).send("Not found")
})

router.post('/', async(req, res) => {
  const {name, geburtsdatum, geschlecht, adresse, schule, betreuer, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung} = req.body;
  const student = await studentRepository.create(name, geburtsdatum, geschlecht, adresse, schule, betreuer, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung);
  if (student) {
    return res.status(200).json(student);
  } 
  return res.status(404).send('Fail to save');
  
})

export default router;
