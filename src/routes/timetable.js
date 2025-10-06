import { Router } from 'express';
import * as tt from '../controllers/timetableController.js';

const router = Router();

router.post('/generate', tt.generate);
router.get('/timetable/:semester', tt.getTimetable);
router.put('/timetable/:id', tt.updateAssignment);
router.get('/reports/conflicts', tt.getConflicts);
router.post('/timetable/:semester/export/pdf', tt.exportPdf);
router.post('/timetable/:semester/export/excel', tt.exportExcel);
router.post('/simulate', tt.simulate);

export default router;


