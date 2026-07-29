import {Router} from 'express';
import {createUrlCorta} from '../controllers/urlController.js';

const router = Router();

//Endpoint para acortar una URL (POST /api/urls/acortar)
router.post('/acortar', createUrlCorta);

export default router;