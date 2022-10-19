require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRouter = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(trackRouter);

const mongoUri = 'mongodb+srv://admin:punisher1974@cluster0.33a3y.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  // useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance!');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email:  ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
