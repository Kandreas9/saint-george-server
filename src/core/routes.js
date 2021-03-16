import baseRouter from '../modules/base/Router';
import adminRouter from '../modules/admin/Routes';

export default function routes(app) {
    app.use('/base', baseRouter);
    app.use('/admin', adminRouter);
}
