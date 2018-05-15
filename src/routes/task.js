import express from "express";
import bodyParser from "body-parser";
import uuid from "uuid/v4";
import task from "../db/models/task";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/:id', async(req, res) => {
  const id = req.params.id;
  try {
    const foundTask = await task.findOne({taskId: id});
    if(foundTask) {
      res.json({ data: foundTask });
    } else {
      res.status(404).json({message: 'NOT FOUND'});
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: { message: `An error occurred loading task ${id}` } });
  }
});

router.get("/", async (req, res) => {

  try {
    const tasks = await task.find({});
    res.json({ data: tasks });
  } catch (err) {
    return res
      .status(500)
      .json({ error: { message: "An error occurred loading tasks" } });
  }
});


router.post("/", async (req, res) => {
  try {
    let { title, description } = req.body.data;

    const newTask = {
      taskId: uuid(),
      title: title,
      description: description,
      createdDate: new Date()
    };
    const created = await task.create(newTask);
    res.json({ data: created });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: { message: "An error creating a task" } });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let { title, description } = req.body.data;
    const query = { taskId: id };
    const updateTask =  {
      taskId: id,
      title: title,
      description: description
    }

    const updated = await task.findOneAndUpdate(query, updateTask, { new: true });
    if(updated) {
      res.json( {data: updated });
    } else {
      res.status(404).send({message: 'NOT FOUND'});
    }
  }
  catch(err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: { message: `An error occurred updating task ${id}` } });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await task.findOneAndRemove({taskId: id});
    if(deleted) {
      res.status(200).send();
    }
    res.status(404).json({message: 'NOT FOUND'});
  }
  catch(err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: { message: `An error occurred deleting task ${id}` } });
  }
});


export default router;
