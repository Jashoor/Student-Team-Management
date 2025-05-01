import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  bio: {
    type: String,
    trim: true
  },
  skills: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String,
    default: ''
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Member = mongoose.model('Member', memberSchema);

export default Member;