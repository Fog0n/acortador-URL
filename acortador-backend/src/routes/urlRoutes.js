import {Router} from 'express';
import {createUrlCorta, obtenerUrls, obtenerMetricas} from '../controllers/urlController.js';

const router = Router();

//Endpoint para acortar una URL (POST /api/urls/acortar)
router.post('/acortar', createUrlCorta);

router.get('/', obtenerUrls);

router.get('/metricas', obtenerMetricas);

export default router;