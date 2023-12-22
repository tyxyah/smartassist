const { MongoClient } = require('mongodb');

async function removeManyDocuments(uri, dbName, collectionName, userId) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Use deleteMany to delete documents that match the user_id
    const result = await collection.deleteMany({ user_id: userId });

    console.log(`${result.deletedCount} documents deleted for user with ID: ${userId}`);
  } finally {
    await client.close();
  }
}

module.exports = removeManyDocuments;
