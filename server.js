require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const setupMiddleware = require('./middllewares/middleware');

const app = express();
const PORT = process.env.PORT || 5000;

setupMiddleware(app);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));


const productRoutes = require('./routes/productRoutes');

app.use('/api/products', productRoutes);
;

app.get('/', (req, res) => {
  res.send('🚀 Karushka Jewells API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
