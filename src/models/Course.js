import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, index: true },
    title: { type: String, required: true },
    credits: { type: Number, default: 0 },
    theoryHours: { type: Number, default: 0 },
    practicalHours: { type: Number, default: 0 },
    tags: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model('Course', CourseSchema);


