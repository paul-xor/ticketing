import { Subjects, Publisher, OrderCancelledEvent } from '@small-tickets/common';


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}