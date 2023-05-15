const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;
const auth=require('./routes/auth')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://nirajinquiry:root@fooddelivery.go2apqz.mongodb.net/otp_verification', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Failed to connect to MongoDB', error);
});

app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});