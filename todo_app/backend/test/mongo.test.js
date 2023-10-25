const {MongoClient} = require('mongodb');
require("dotenv").config()

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async() => {
    connection = await MongoClient.connect(globalThis.process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.process.env.MONGO_DB_NAME);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const tasks = db.collection('tasks');

    const mockTask = {_id: 'some-user-id', taskName: 'test'};
    await tasks.insertOne(mockTask);

    const insertedTask = await tasks.findOne({_id: 'some-user-id'});
    expect(insertedTask).toEqual(mockTask);
  });
});