const https = require('https');
const fs = require('fs');
const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const fakes = require('./fakes.js');

// GraphQL schema
// everyone is in a singular general room, unless DM; see not-implemented.js for ideas
// https://github.com/graphql-dotnet/graphql-dotnet/issues/940
// TODO: why must data be a string. should I separate this out?
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
      data: String
      encoding: String
      userId: String
    },
    type DirectMessage {
      id: String
      text: String
      data: String
      encoding: String
      userId: String
      recipientUserId: String
      notificationReceived: Boolean
    }
`);

var getUsers = function(args) {
  return fakes.users.map((user) => { return { id: user.id, name: user.name } });
}

var getMessages = function(args) {
  return fakes.messages;
}

// Root resolver
var root = {
    depth: () => 10
};

// Create an express server and a GraphQL endpoint
var options = {
    key: fs.readFileSync( './ssl/localhost.key' ),
    cert: fs.readFileSync( './ssl/localhost.cert' ),
    requestCert: false,
    rejectUnauthorized: false
};
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
//app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
var port = 4000; //process.env.PORT || 443;
var server = https.createServer( options, app );
server.listen(port, () => console.log('Express GraphQL Server Now Running On localhost:' + port + '/graphql'));
