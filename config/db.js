//This is where we connect to MongoDB
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//this will give us back a promise;
// promise is an object representing the completion 
//or failure of the async operation
//lets use async await 
const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('Database connected!');
  } catch (err) {
    console.log('Error message:', err.message);
    //Exit the process if error occurs
    process.exit(1);
  }
};

module.exports = connectDb;

//whenever we use async await, also use try/catch
//await only works inside async functions. This can be put in front of any async promise-based function to pause your code on that line until the promise fulfills, then return the resulting value. In the meantime, other code that may be waiting for a chance to execute gets to do so.