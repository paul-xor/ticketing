import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

// declare global {
//   namespace NodeJS {
//     export interface Global {
//       signin(): Promise<string[]>
//     }
//   }
// }
declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;

beforeAll(async() => {
  process.env.JWT_KEY = 'asdfdd'

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  mongoose.set('strictQuery', false)
  await mongoose.connect(mongoUri, {});
});

beforeEach(async() => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  // build jsonwebtoken payload {id, email}

  // Create the JWT!

  // Build a session Object { jwt: MY_JWT }

  // Turn this session into JSON

  // Take JSON and encode it as base64

  // return a string thats the cookie with the encoded data

};