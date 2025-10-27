import express from 'express';
import hotelRoutes from './routes/hotelRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/hotels', hotelRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', suppliers: { supplierA: true, supplierB: true } });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));