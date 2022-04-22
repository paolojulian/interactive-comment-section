import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  image: {
    png: {
      type: String,
      required: true,
    },
    web: {
      type: String,
      required: true,
    },
  },
  is_logged_in: {
    type: Boolean,
    required: false,
    default: false,
  },
});

UserSchema.statics.findCurrentUser = function () {
  return mongoose.model('User').findOne({ is_logged_in: true });
};

UserSchema.statics.deleteById = function(_id) {
  return this.deleteOne({ _id });
};

let User;
try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', UserSchema);
}

module.exports = User;
