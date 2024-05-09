import express from 'express';

import processController from '../../controllers/processController';

const router = express.Router();

router.post('/', processController.createProcess);
router.get('/', processController.getProcesses);
router.get('/:pid', processController.getProcess);
router.delete('/:pid', processController.deleteProcess);

export default router;
