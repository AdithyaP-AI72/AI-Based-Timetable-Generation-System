import mongoose from 'mongoose';

const TimetableSlotSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('TimetableSlot', TimetableSlotSchema);


