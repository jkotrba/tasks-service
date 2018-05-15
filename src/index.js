import '../env';
import Express from 'express'
import Parser from 'body-parser'
// import Compression from 'compression'
// import Multer from 'multer'
import ErrorHandler from 'errorhandler'
import ResponseTime from 'response-time'
import cors from 'cors';

import db from './db';
import task from './routes/task';

const port = process.env.PORT || 3000
const ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const app = Express()

app.use(Parser.json())
app.use(ResponseTime())
app.use(cors());

if (ENV === 'development') {
  app.use(ErrorHandler())
}

app.get('/', (req, res) => res.send('Hello World'))

app.use('/api/tasks', task);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('An error occurred on the server');
});

app.listen(port, () => console.log(`Server started at: http://localhost:${port}`))

export default app;
