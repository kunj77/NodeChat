import express from 'express';
import cors from 'cors';
import setAuthRoutes from './routes';
import connectDB from 'db/index';

const PORT = 5001;

const app = express();

app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

setAuthRoutes(app);

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Auth service is running on port ${PORT}`);
    });
  });