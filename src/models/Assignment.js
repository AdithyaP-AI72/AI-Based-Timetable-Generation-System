import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    groupId: { type: String },
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'TimetableSlot' },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    semester: { type: String, index: true },
  },
  { timestamps: true }
);

export default mongoose.model('Assignment', AssignmentSchema);


