import Controller from './controller.js'
import { Router } from "express";
import authentification  from '../../middleware/authentification.js'
const router = Router();

router.post('/register', Controller.register);
router.patch('/update', authentification, Controller.update);
router.delete('/delete', authentification, Controller.delete);
router.post('/list', authentification, Controller.list);
router.get('/details_by_id/:id', authentification, Controller.details_by_id);
router.post('/login', Controller.login);
router.post('/change_password', authentification, Controller.change_password);

export default router