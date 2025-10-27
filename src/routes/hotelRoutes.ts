import express from 'express';
import axios from 'axios';
import { createClient } from 'redis';

const router = express.Router();
const redis = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
redis.connect();

const supplierA = [
  { hotelId: 'a1', name: 'Holtin', price: 6000, city: 'delhi', commissionPct: 10 },
  { hotelId: 'a2', name: 'Radison', price: 5900, city: 'delhi', commissionPct: 13 }
];

const supplierB = [
  { hotelId: 'b1', name: 'Holtin', price: 5340, city: 'delhi', commissionPct: 20 },
  { hotelId: 'b2', name: 'Taj', price: 7000, city: 'delhi', commissionPct: 15 }
];

router.get('/', async (req, res) => {
  const { city, minPrice, maxPrice } = req.query;
  const cacheKey = `hotels:${city}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    let hotels = JSON.parse(cached);
    if (minPrice || maxPrice) {
      hotels = hotels.filter((h: any) => (!minPrice || h.price >= +minPrice) && (!maxPrice || h.price <= +maxPrice));
    }
    return res.json(hotels);
  }

  const combined = [...supplierA.filter(h => h.city === city), ...supplierB.filter(h => h.city === city)];
  const deduped = Object.values(
    combined.reduce((acc: any, curr) => {
      if (!acc[curr.name] || curr.price < acc[curr.name].price) acc[curr.name] = curr;
      return acc;
    }, {})
  );

  await redis.set(cacheKey, JSON.stringify(deduped));
  res.json(deduped);
});

export default router;