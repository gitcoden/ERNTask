import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/validate_phone', (req, res) => {
  res.json({ valid: false }).end();
});

export default router;
