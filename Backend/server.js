import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/ProductRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/uploadRoutes.js';


dotenv.config();
connectDB();

const app = express();
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

const port = process.env.PORT || 5001;

console.log("🚀 connectDB() called");

app.get('/', (req, res) => {
    res.send('API is running...');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ✅ Delegate routing
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);


app.get('/api/config/paypal', (req, res) =>
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
);

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
