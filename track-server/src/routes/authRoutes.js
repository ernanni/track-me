/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signUp', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signIn', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).send({ error: 'Must provide email and password!' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(422).send({ error: 'Invalid email or password!' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    res.status(422).send({ error: 'Invalid email or password!' });
  }
});

module.exports = router;
