const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/banana', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
});

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});