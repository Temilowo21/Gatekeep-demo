import express from 'express';
import products from './data/products.js';

const port = 5001;  // Change to 5001

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});
app.listen(port, () => console.log(`Server running on port ${port}`));