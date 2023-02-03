import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Order } from "../../models/order";
import { OrderStatus } from "@small-tickets/common";

it('returns a 404 when purchasing the order that does not exists', async() => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdkjf',
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404)

})
it('returns a 401 when purchasing an order that doesnt belongs to the user', async() => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  })
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdkjf',
      orderId: order.id,
    })
    .expect(401)

})
it('returns a 400 when purchasing a cancelled order', async() => {})
