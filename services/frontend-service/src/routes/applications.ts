// src/services/frontend-service/src/routes/applications.ts (TypeScript)
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db';

const router = express.Router();

router.post('/', async (req, res) => {
  const { applicant, productType, amount } = req.body;
  const id = uuidv4();
  await db.query(
    `INSERT INTO loan_applications(id, applicant_json, product_type, amount, state) VALUES($1,$2,$3,$4,$5)`,
    [id, JSON.stringify(applicant), productType, amount, 'SUBMITTED']
  );
  // generate presigned URLs via infra service (stubbed)
  const presigned = await generatePresignedUrls(id);
  // enqueue for processing
  await enqueueProcessing(id);
  res.status(201).json({ id, presigned });
});

export default router;