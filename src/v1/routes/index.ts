import express from 'express';

import processRoutes from './processRoutes';

const router = express.Router();

router.use('/process', processRoutes);

export default router;
