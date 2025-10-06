import { Router } from 'express';
import dataRouter from './management.js';
import genRouter from './timetable.js';

const router = Router();

router.use('/data', dataRouter);
router.use('/', genRouter);

export default router;


