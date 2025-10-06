import Student from '../models/Student.js';
import Course from '../models/Course.js';
import Faculty from '../models/Faculty.js';
import Room from '../models/Room.js';

export async function importData(req, res, next) {
  try {
    const { students = [], courses = [], faculty = [], rooms = [] } = req.body || {};
    if (students.length) await Student.insertMany(students, { ordered: false });
    if (courses.length) await Course.insertMany(courses, { ordered: false });
    if (faculty.length) await Faculty.insertMany(faculty, { ordered: false });
    if (rooms.length) await Room.insertMany(rooms, { ordered: false });
    res.json({ status: 'ok' });
  } catch (err) {
    next(err);
  }
}

export async function listCourses(_req, res, next) {
  try {
    const items = await Course.find().limit(500).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function listStudents(_req, res, next) {
  try {
    const items = await Student.find().limit(500).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function listFaculty(_req, res, next) {
  try {
    const items = await Faculty.find().limit(500).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function listRooms(_req, res, next) {
  try {
    const items = await Room.find().limit(500).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
}


