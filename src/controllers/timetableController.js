import Assignment from '../models/Assignment.js';
import generateTimetable from '../services/generator.js';

export async function generate(req, res, next) {
  try {
    const { semester, programs = [], constraints = {}, priorities = {} } = req.body || {};
    const result = await generateTimetable({ semester, programs, constraints, priorities });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getTimetable(req, res, next) {
  try {
    const { semester } = req.params;
    const items = await Assignment.find({ semester }).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function updateAssignment(req, res, next) {
  try {
    const { id } = req.params;
    const update = req.body || {};
    const updated = await Assignment.findByIdAndUpdate(id, update, { new: true }).lean();
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function getConflicts(_req, res, next) {
  try {
    // placeholder for conflict report retrieval
    res.json({ conflicts: [] });
  } catch (err) {
    next(err);
  }
}

export async function exportPdf(_req, res, next) {
  try {
    // placeholder: integrate pdfkit/puppeteer later
    res.json({ status: 'pdf-export-queued' });
  } catch (err) {
    next(err);
  }
}

export async function exportExcel(_req, res, next) {
  try {
    // placeholder: integrate exceljs later
    res.json({ status: 'excel-export-queued' });
  } catch (err) {
    next(err);
  }
}

export async function simulate(req, res, next) {
  try {
    const { changes = {} } = req.body || {};
    // placeholder: return empty diff
    res.json({ diff: {}, applied: changes });
  } catch (err) {
    next(err);
  }
}


