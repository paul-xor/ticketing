import request from 'supertest';
import { app } from '../../app';


it('return a 201 on successful signup', async() => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: 'password'
    })
    .expect(201);
})

it('return a 400 with invalid email', async() => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'hdjskfhk',
      password: 'password'
    })
    .expect(400);
})

it('return a 400 with invalid password', async() => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: 'p'
    })
    .expect(400);
})

it('return a 400 with missing email and password', async() => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com'
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'dfjashdfl'
    })
    .expect(400);
})

it('dissallow a duplicate emails', async() => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: 'password'
    })
    .expect(400);
})