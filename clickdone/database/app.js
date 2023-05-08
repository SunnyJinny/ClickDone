import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './controllers/database.js'
import studentRouter from './routes/student.router.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin:"http://localhost:4200",
  credentials: true
}));
app.use(morgan('tiny'));

app.use('/student', studentRouter);

// app.use((req, res, next) => {
//   res.sendStatus(404);
// });

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
.then(() => {
  console.log('Connected DB-Server!');
  app.listen(port, () => {
    console.log(`on port ${port} connected!`);
  })
})
.catch(console.error);
