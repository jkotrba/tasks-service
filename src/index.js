import Express from 'express'
import Parser from 'body-parser'
// import Compression from 'compression'
// import Multer from 'multer'
import ErrorHandler from 'errorhandler'
import ResponseTime from 'response-time'
import task from './routes/task';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_USER);

const port = process.env.PORT || 3000
const ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const app = Express()

app.use(Parser.json())
app.use(ResponseTime())

if (ENV === 'development') {
  app.use(ErrorHandler())
}

app.get('/', (req, res) => res.send('Hello World'))

app.use('/tasks', task);

app.listen(port, () => console.log(`Server started at: http://localhost:${port}`))

export default app;
