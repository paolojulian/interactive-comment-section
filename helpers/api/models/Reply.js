import mongoose, { Schema } from 'mongoose';

export const ReplySchema = new Schema({
  content: {
    type: Schema.Types.String,
    required: true,
  },
  score: {
    type: Schema.Types.Number,
    required: false,
    default: 0,
  },
  voted: {
    type: Schema.Types.Number,
    required: false,
    default: 0,
  },
  replyingTo: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: false,
    default: null,
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

ReplySchema.statics.deleteById = function(_id) {
  return this.deleteOne({ _id });
};

let Reply;
try {
  Reply = mongoose.model('Reply');
} catch (e) {
  Reply = mongoose.model('Reply', ReplySchema);
}

module.exports = Reply;
