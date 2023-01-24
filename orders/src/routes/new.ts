import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@small-tickets/common';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/orders', requireAuth, [
  body('ticketId')
    .not()
    .isEmpty()
    // below custom checks if id is a mongodb id it could be deleted in case of other db to be used
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided')
], validateRequest, async (req: Request, res: Response) => {
  res.send({});
});

export { router as newOrderRouter };
