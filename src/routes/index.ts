
import { Application } from 'express';

export default function (app: Application) {
    app.use('/api', require('../middlewares/api').default);
    app.use(require('./api').default);
    app.use(require('../middlewares/root').default);
    app.use(require('./home').default);
    app.use(require('./topic').default);
}
