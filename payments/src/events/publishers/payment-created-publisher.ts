import { Subjects, Publisher, PaymentCreatedEvent } from "@small-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

}
