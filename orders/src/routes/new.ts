import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  requireAuth,
  validateRequest,
  OrderStatus } from '@small-tickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

router.post('/api/orders', requireAuth, [
  body('ticketId')
    .not()
    .isEmpty()
    // below custom checks if id is a mongodb id it could be deleted in case of other db to be used
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided')
], validateRequest, async (req: Request, res: Response) => {
  const { ticketId } = req.body;
  // Find the ticket the user is tring to order in the db
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new NotFoundError();
  }

  // Make sure this ticket is not already reserved
  // Run query to look at all orders. Find an order where the ticket
  // is the ticket we just found *and* the order status is *not* cancelled.
  // if we find an order from that means the ticket *is* reserved
  const existingOrder = await Order.findOne({
    ticket: ticket,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete
      ]
    }
  });
  if(existingOrder) {
    throw new  BadRequestError('Ticket is already reserved.');
  }
  // Caoculate an expiration date for this order

  // build the order and save to db.

  // Publish an event saying that an order was created.

  res.send({});
});

export { router as newOrderRouter };
