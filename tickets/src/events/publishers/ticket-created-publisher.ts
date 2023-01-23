import { Publisher, TicketCreatedEvent, Subjects } from '@small-tickets/common';

export class TicketsCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
