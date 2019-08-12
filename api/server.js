const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');


// GraphQL schema
// everyone is in a singular general room, unless DM; see not-implemented.js for ideas
// https://github.com/graphql-dotnet/graphql-dotnet/issues/940
var schema = buildSchema(`
    type Query {
      filters: [String]
    },
    type User {
      id: String
      name: String
      blocked: [String]
    },
    type Message {
      id: String
      text: String
      data: [Byte]
      encoding: String
      userId: String
    },
    type DirectMessage {
      id: String
      text: String
      data: [Byte]
      encoding: String
      userId: String
      recipientUserId: String
      notificationReceived: Boolean
    }
`);

// TODO move into fakes
// _id ?
var messages = [
  {
    id: '8aaa803f-746d-4f3e-8069-28372b0db0d1',
    text: 'hey is anyone here',
    data: undefined, // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
    encoding: "text/plain",
    userId: '5f650a5c-d739-4d87-a829-b60fbc697e27'
  },
  {
    id: '698390fc-e961-4bc1-af2d-be496f3cfa13',
    text: 'yes me',
    data: undefined, 
    encoding: "text/plain",
    userId: 'a4a66668-fe70-4a00-a171-6c1dcf8fdb37'
  },
  {
    id: 'c7ccbc9e-d1a0-449c-be60-be26968fc55f',
    text: 'this app is awesome',
    data: undefined, // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
    encoding: "text/plain",
    userId: '5f650a5c-d739-4d87-a829-b60fbc697e27'
  },
  {
    id: 'a7f19329-fd67-40fa-ba83-4907cc3494f7',
    text: 'this is a really negative comment about what was just said',
    data: undefined, // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
    encoding: "text/plain",
    userId: '9cc1a558-0065-4fe8-9377-3cad2df92a74'
  }
]

var users = [
  {
    id: 'a4a66668-fe70-4a00-a171-6c1dcf8fdb37',
    name: 'Shirley Temple',
    email: 'grenadine@sprite.com',
    password: 'curlytop',
    blocked: [ '9cc1a558-0065-4fe8-9377-3cad2df92a74' ]
  },
  {
    id: '5f650a5c-d739-4d87-a829-b60fbc697e27',
    name: 'Roy Rogers',
    email: 'grenadine@coke.com',
    password: 'silverspurs',
    blocked: []
  },
  {
    id: '9cc1a558-0065-4fe8-9377-3cad2df92a74',
    name: 'Negative Nancy',
    email: 'idontdonice@gmail.com',
    password: 'glasshalfempty',
    blocked: []
  }
]

var getUsers = function(args) {
  return users.map((user) => { return { id: user.id, name: user.name } });
}

var getMessages = function(args) {
  return messages;
}

// Root resolver
var root = {
    depth: () => 10,

};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
