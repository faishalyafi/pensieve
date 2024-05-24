import { Router  } from "express";
const router = Router();

router.use('/gps', (await import('./modules/gps/route.js')).default);
router.use('/user', (await import('./modules/user/route.js')).default);

export default router