import express from 'express';
import cors from 'cors';
import { connectDB } from './controllers/database.js'
import studentRouter from './routes/student.router.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/student', studentRouter);




connectDB()
.then(() => {
  console.log('Connected DB-Server!');
  app.listen(port, () => {
    console.log(`on port ${port} connected!`);
  })
})
.catch(console.error);
