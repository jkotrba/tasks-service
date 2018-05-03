import express from 'express';
import bodyParser from 'body-parser';
import uuid from 'uuid/v4';
import task from '../db/models/task';

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  task.find({}, (err, tasks) => {
    if(err) {
      return res.status(500).json({error: {message: 'An error occurred loading tasks'}});
    }
    res.json({data: tasks});
  });
});

router.post('/', async (req, res) => {
  const newTask = {
    taskId: uuid(),
    title: req.body.data.title,
    description: req.body.data.description,
    createdDate: new Date()
  };
  task.create(newTask, (err, created) => {
    if(err) {
      return res.status(500).json({error: {message: 'An error creating a task'}});
    }
    res.json({data: created});
  });
});

export default router;
