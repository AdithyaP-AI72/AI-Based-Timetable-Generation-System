import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    expertise: { type: [String], default: [] },
    maxLoadHoursPerWeek: { type: Number, default: 16 },
    unavailableTimes: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Faculty', FacultySchema);


