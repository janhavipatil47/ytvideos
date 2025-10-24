import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  totalPages: { type: Number, required: true },
  coverImage: { type: String },
  metadata: { type: Object },
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
