import { Publisher, OrderCreatedEvent, Subjects } from '@small-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrederCreated = Subjects.OrederCreated;
};

