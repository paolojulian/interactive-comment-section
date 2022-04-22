import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
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

CommentSchema.statics.deleteById = function(_id) {
  return this.deleteOne({ _id });
};

let Comment;
try {
  Comment = mongoose.model('Comment');
} catch (e) {
  Comment = mongoose.model('Comment', CommentSchema);
}

module.exports = Comment;
