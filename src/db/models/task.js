import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskId: String,
  title: String,
  description: String,
  completedDate: Date,
  createdDate: Date
});

mongoose.model('task', taskSchema);

export default mongoose.model('task');
