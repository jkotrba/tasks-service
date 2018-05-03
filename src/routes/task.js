import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Task!');
});

router.post('/', async (req, res) => {

});

export default router;
