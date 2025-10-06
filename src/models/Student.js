import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    program: { type: String },
    year: { type: Number },
    major: { type: String },
    minor: { type: String },
    enrolledCourseIds: { type: [String], default: [] },
    preferences: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model('Student', StudentSchema);


