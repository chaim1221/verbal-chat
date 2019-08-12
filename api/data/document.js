const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function mongoClient (action, schema, table, data) {
  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db(schema);
    const collection = db.collection(table);
    switch (action) {
      case 'insert':
        collection.insertOne(data, (err, result) => {
          if (err) { callback(new Error('Error in documentStorage: ' + err)); }
          callback(result);
        });
        break;
      case 'find':
        collection.find(
          { "$text": { "$search": data } },
          { "score": { "$meta": "textScore" } }
        ).sort(
          { "score": { "$meta": "textScore" } }
        );
        break;
      case 'findById':
        collection.find( { _id: data } );
        break;
      case 'update':
        collection.update(
          { _id: data.id },
          data // TODO: this is probably a _really_ bad idea; just trying to pump this out for now
        );
        break;
      case 'delete':
        collection.delete( { _id: data } );
        break;
      default:
        callback(new Error('Action not specified or not implemented in documentStorage'));
    }
  });
}

function Document (schema, table) {
    this.schema = schema;
    this.table = table;
}
Document.prototype =  {
  insert: function (schema, table, data) {
    return mongoClient('insert', schema, table, data);
  },
  find: function (schema, table, data) {
    return mongoClient('find', schema, table, data);
  },
  findById: function (schema, table, id) {
    return mongoClient('findById', schema, table, id);
  },
  update: function (schema, table, data) {
    return mongoClient('update', schema, table, data);
  },
  delete: function (schema, table, id) {
    return mongoClient('delete', schema, table, id);
  }
}

exports.Document = Document; // ?
