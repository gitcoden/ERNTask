import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use(express.json());

const phoneRegExp = /^(\+7|8)\d{10}$/;
const errorMessage = 'Phone number is invalid';
const successMessage = 'Phone number is valid';

router.post('/validate_phone', (req, res) => {
  const { phone } = req.body;

  const valid = phoneRegExp.test(phone);

  res.json({ valid, message: valid ? successMessage : errorMessage }).end();
});

export default router;
