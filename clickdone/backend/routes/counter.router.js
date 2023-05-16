import express from 'express';
const router = express.Router();
import * as counterRepository from '../controllers/counter.js';

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const counter = await counterRepository.getItem(id);
  if (counter) {
    return res.status(200).json(counter);
  }
  return res.status(404).send({ message: "Counter data not found." });
});

router.post('/', async (req, res) => {
  const { improzess, freiepraktika } = req.body;
  const counter = await counterRepository.create(improzess, freiepraktika);
  if (counter) {
    return res.status(200).json(counter);
  }
  return res.status(404).send({ message: "Fail to create." });
});

router.put('/:id', async (req, res) => {
  const { improzess, freiepraktika } = req.body;
  const id = req.params.id;
  const counter = await counterRepository.getItem(id)
  if (counter) {
    const updated = await counterRepository.update(id, improzess, freiepraktika);
    return res.status(200).json(updated);
  }
  return res.status(404).json({ message: "Fail to create." });
})

export default router;
