import mongoose from 'mongoose';

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const connectionString = `mongodb://${dbUser}:${dbPass}@ds113700.mlab.com:13700/tasks-app`;

console.log(connectionString);
mongoose.connect(connectionString);
