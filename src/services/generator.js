import Student from '../models/Student.js';
import Course from '../models/Course.js';
import Faculty from '../models/Faculty.js';
import Room from '../models/Room.js';
import TimetableSlot from '../models/TimetableSlot.js';
import Assignment from '../models/Assignment.js';

export default async function generateTimetable({ semester = 'default', programs = [], constraints = {}, priorities = {} }) {
  // NOTE: This is a placeholder that returns an empty schedule.
  // Wire-in a real heuristic/CP solver later.
  const [students, courses, faculty, rooms, slots] = await Promise.all([
    Student.find(programs.length ? { program: { $in: programs } } : {}).lean(),
    Course.find().lean(),
    Faculty.find().lean(),
    Room.find().lean(),
    TimetableSlot.find().lean(),
  ]);

  // Remove previous assignments for this semester for idempotency of demo
  await Assignment.deleteMany({ semester });

  const timetable = [];
  const conflicts = [];

  // Minimal demo: no-op, return data counts to verify pipeline
  return {
    semester,
    summary: {
      numStudents: students.length,
      numCourses: courses.length,
      numFaculty: faculty.length,
      numRooms: rooms.length,
      numSlots: slots.length,
    },
    timetable,
    conflicts,
    constraints,
    priorities,
  };
}


