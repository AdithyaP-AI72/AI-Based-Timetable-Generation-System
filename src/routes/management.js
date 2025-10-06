import { Router } from 'express';
import * as mgmt from '../controllers/managementController.js';

const router = Router();

router.post('/import/data', mgmt.importData);
router.get('/courses', mgmt.listCourses);
router.get('/students', mgmt.listStudents);
router.get('/faculty', mgmt.listFaculty);
router.get('/rooms', mgmt.listRooms);

export default router;


