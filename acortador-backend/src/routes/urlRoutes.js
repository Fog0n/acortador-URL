import {Router} from 'express';
import {createUrlCorta, redireccionarUrl} from '../controllers/urlController.js';

const router = Router();

//Endpoint para acortar una URL (POST /api/urls/acortar)
router.post('/acortar', createUrlCorta);

router.get('/:hash_id', redireccionarUrl);

export default router;