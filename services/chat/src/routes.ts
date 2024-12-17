import { Application, Router } from 'express';
import { getMessages, postMessage } from './controllers/chat';
import { getAllUsers } from './controllers/users';

const setChatRoutes = (app: Application) => {
    const router = Router();

    router.get('/users', getAllUsers);
    router.get('/messages', getMessages);
    router.post('/messages', postMessage);

    app.use('/chat', router);
};

export default setChatRoutes;