import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if the provided id does not exists', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'asdfj',
      price: 20
    })
    .expect(404)
})
it('returns 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'asdfj',
      price: 20
    })
    .expect(401)
})
it('returns 401 if user does not own the ticket', async () => {})
it('returns 404 if the user provides an invalid title or price', async () => {})
it('updates the ticket provided valid inputs', async () => {})