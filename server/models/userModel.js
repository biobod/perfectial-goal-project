const mongosse = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongosse.Schema;

const SALT_WORK_FACTOR = 10;
const secretKey = 'app_secret_key';

const UserSchema = new Schema({
  name: { type: String, required: true, max: 100, unique: false},
  email: { type: String, required: true, max: 100, unique: true},
  password: { type: String, required: true, max: 100},
})

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.compareToken = function(token) {
  return new Promise((res, rej) => {
    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        rej(new Error('token is no valid'));
      }else{
        res(decoded.id)
      }
    })
    });
  };

UserSchema.methods.comparePassword = function(candidatePassword, id) {
  return new Promise((res, rej) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return new Error('something going wrong');
      const token = jwt.sign({ id }, secretKey, { expiresIn: '5 days' });
      res({isMatch, token});
    });
  })

};

module.exports = mongosse.model('User', UserSchema);
