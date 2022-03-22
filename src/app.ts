import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';

// Initialitations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// midddlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


//routes
app.get('/', (req, res) => {    
    res.send(`API is at http://localhost:${app.get('port')}`);
})

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);


export default app;