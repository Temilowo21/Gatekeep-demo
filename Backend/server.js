import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/ProductRoutes.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

console.log("🚀 connectDB() called");

app.get('/', (req, res) => {
    res.send('API is running...');
});

// ✅ Delegate routing
app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
