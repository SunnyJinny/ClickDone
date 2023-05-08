import express from 'express';
const router = express.Router();
import * as studentRepository from '../controllers/student.js';


router.get('/list', async (req, res) => {
  const students = await studentRepository.getAll();
  if (students) {
    return res.status(200).json(students);
  }
  return res.status(404).send({ message: "Student List not found" });
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const student = await studentRepository.getItem(id);
  if(student) {
    return res.status(200).json(student);
  }
  return res.status(404).send({ message: "Student not found" });
})

router.post('/', async(req, res) => {
  const {name, geburtsdatum, geschlecht, adresse, schule, betreuer, email, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung} = req.body;
  const student = await studentRepository.create(name, geburtsdatum, geschlecht, adresse, schule, betreuer, email, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung);
  if (student) {
    return res.status(200).json(student);
  } 
  return res.status(404).send('Fail to save');
  
})

router.put('/:id', async(req, res) => {
  const { name, geburtsdatum, geschlecht, adresse, schule, betreuer, email, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung } = req.body;
  const id = req.params.id;
  const student = await studentRepository.getItem(id);
  if(student){
    const updated = await studentRepository.update(id, name, geburtsdatum, geschlecht, adresse, schule, betreuer, email, bewerbungDatum, rueckmeldungDatum, startDatum, endDatum, status, motivation, lebenslauf, zeugnis, notiz, bewertung);
    res.status(200).json(updated);
  } else {
    res.status(404).json({ message: `student not found :${id}` });
  }
})

router.delete('/:id', async(req, res) => {
  const id = req.params.id;
  const student = await studentRepository.getItem(id);
  if(student){
    const updated = await studentRepository.remove(id);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `student not found :${id}` });
  }
})

router.get('/status', async(req, res, next) => {
  if(req.query.status) {
    const status = req.query.status;
    const filterByStatus = await studentRepository.getByState(status);
    if(filterByStatus) {
      res.status(200).json(filterByStatus);
    } else {
      res.status(404).json({ message: 'No student match the state, please try again.' });
    }
  } else {
    next();
  }
})

router.get('/date', async (req, res, next) => {
  if (req.query.startDatum && req.query.endDatum) {
    const startDate = new Date(req.query.startDatum);
    const endDate = new Date(req.query.endDatum);
    const filterByDate = await studentRepository.getByDate(startDate, endDate);
    
    if (filterByDate.length > 0) {
      res.status(200).json(filterByDate);
    } else {
      res.status(404).json({ message: 'No student matches the status and date range, please try again.' });
    }
  } else {
    next();
  }
});

export default router;
