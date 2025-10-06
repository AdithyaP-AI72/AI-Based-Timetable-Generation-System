import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Student from '../src/models/Student.js';
import Course from '../src/models/Course.js';
import Faculty from '../src/models/Faculty.js';
import Room from '../src/models/Room.js';
import TimetableSlot from '../src/models/TimetableSlot.js';

async function run() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai_timetable_dev';
  await mongoose.connect(mongoUri);

  await Promise.all([
    Student.deleteMany({}),
    Course.deleteMany({}),
    Faculty.deleteMany({}),
    Room.deleteMany({}),
    TimetableSlot.deleteMany({}),
  ]);

  await Course.insertMany([
    { code: 'C1', title: 'Foundations of CS', credits: 3, theoryHours: 3 },
    { code: 'C2', title: 'Intro to Lab Work', credits: 2, practicalHours: 2, tags: { type: 'practical' } },
    { code: 'C3', title: 'Mathematics I', credits: 3, theoryHours: 3 },
  ]);

  await Student.insertMany([
    { name: 'Alice', program: 'FYUP', year: 1, enrolledCourseIds: ['C1', 'C2'] },
    { name: 'Bob', program: 'FYUP', year: 1, enrolledCourseIds: ['C1', 'C3'] },
  ]);

  await Faculty.insertMany([
    { name: 'Prof. Rao', expertise: ['C1', 'C3'], maxLoadHoursPerWeek: 12, unavailableTimes: ['Mon 9-11'] },
    { name: 'Dr. Sen', expertise: ['C2'], maxLoadHoursPerWeek: 10 },
  ]);

  await Room.insertMany([
    { name: 'R1', capacity: 60, roomType: 'lecture' },
    { name: 'Lab1', capacity: 24, roomType: 'lab' },
  ]);

  await TimetableSlot.insertMany([
    { day: 'Mon', startTime: '09:00', endTime: '10:00' },
    { day: 'Mon', startTime: '10:00', endTime: '11:00' },
    { day: 'Mon', startTime: '11:00', endTime: '12:00' },
    { day: 'Tue', startTime: '09:00', endTime: '11:00' },
    { day: 'Wed', startTime: '11:00', endTime: '12:00' },
  ]);

  // eslint-disable-next-line no-console
  console.log('Seed complete');
  await mongoose.disconnect();
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


