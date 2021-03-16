import { Router } from 'express';
import adminCreate from './controllers/adminCreate';
import adminLogin from './controllers/adminLogin';
import adminLogout from './controllers/adminLogout';
import adminGetById from './controllers/adminGetById';
import adminUpdateById from './controllers/adminUpdateById';
import adminDeleteById from './controllers/adminDeleteById';
import auth from '../../middleware/auth';

const router = Router();

router.post('/', adminCreate);
router.post('/login', adminLogin);
router.post('/logout', auth, adminLogout);
router.get('/:id', auth, adminGetById);
router.patch('/:id', auth, adminUpdateById);
router.delete('/:id', auth, adminDeleteById);

export default router;
