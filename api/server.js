var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema

// everyone is in a singular general room

// A "filter" is like a room, but it's just a filter of all messages. Nobody talks to a room, they all talk to #general.
// Filters just filter the noise.
// private rooms cost money and behave the exact same way as the general room

// if a user is logged in, their messages are displayed, otherwise not //?

// depth is the length of the display, this is calculated by the app because we have no clue



var schema = buildSchema(`
    type Query {
      depth: Int
      filters: Filter []
      blocked: User []
    },
    type Filter {
      filterName: String
      users: User []
    },
    type User {
      name: String
      id: Guid
      messages: Message []
      filters: Filter []
      blocked: User []
    },
    type Message {
      id: Guid
      text: String
      data: Byte []
      encoding: String
      userId: Guid
    }
`);

// 
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
  }
]

// TODO filters

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
