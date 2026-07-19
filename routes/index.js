import express from 'express';
import notesRouter from './notes.js';

// Routes to the /notes endpoint
const router = express.Router();

router.use('/notes', notesRouter);

export default router;
