import mongoose from 'mongoose';

const AcademicCalendarSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    type: { type: String, enum: ['holiday', 'exam', 'event'], required: true },
  },
  { timestamps: true }
);

export default mongoose.model('AcademicCalendar', AcademicCalendarSchema);


