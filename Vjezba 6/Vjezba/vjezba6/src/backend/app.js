const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRouter = require('./routes/productRouter');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:5500/vjezba').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', productRouter());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});