const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.pre('save', async function (next) {
  if (this.password) this.password = await bycrypt.hash(this.password, 12);
  next();
});

exports.User = mongoose.model('User', userSchema);
