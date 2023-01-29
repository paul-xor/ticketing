import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { TicketUpdatedEvent } from '@small-tickets/common';

const setup = async() => {
  // create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // create a save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  //create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'new concert',
    price: 99,
    userId: new mongoose.Types.ObjectId().toHexString()
  }

  // create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  // return all of this stuff
  return { msg, data, ticket, listener };
}

it('finds, updates and saves a ticket', async() => {})
it('acks the message', async() => {})