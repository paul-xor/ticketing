import { Ticket } from "../ticket";

it('implements optimistic concurrency controll', async() => {
  //create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  })

  // Save the ticket to the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separate changes to the ticket we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // save the first fetched ticket
  await firstInstance!.save();

  // save second fetched ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (error) {
    return;
  }
  throw new Error('Should not reach this point');
})