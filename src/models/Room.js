import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    capacity: { type: Number, default: 0 },
    roomType: { type: String, enum: ['lecture', 'lab', 'other'], default: 'lecture' },
    equipment: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Room', RoomSchema);


