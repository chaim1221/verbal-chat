const https = require('https');
const fs = require('fs');
const express = require('express');
const express_graphql = require('express-graphql');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLBoolean
} = require("graphql");
const mongoose = require('mongoose');

// everyone is in a singular general room, unless DM; see not-implemented.js for ideas

// using Mongoose for now; TODO implement in ./data/mongoose.js and `require`
// TODO: how to use the domain definitions instead of these dynamic types!?
mongoose.connect("mongodb://localhost:27017/");
const userModel = mongoose.model("user", {
  id: String,
  name: String,
  blocked: [String]
});
const messageModel = mongoose.model("message", {
  id: String,
  text: String,
  data: String,
  encoding: String,
  userId: String
});
const directMessageModel = mongoose.model("directMessage", {
  id: String,
  text: String,
  data: String,
  encoding: String,
  userId: String,
  recipientUserId: String,
  notificationReceived: Boolean
});

// These are view models
const UserType = new GraphQLObjectType({ 
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    blocked: { type: GraphQLList }
  } 
});
const MessageType = new GraphQLObjectType({ 
  name: "Message",
  fields: {
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    data: { type: GraphQLString }, // byte
    encoding: { type: GraphQLString },
    userId: { type: GraphQLString },
    notificationReceived: { type: GraphQLBoolean }
  }
});
const DirectMessageType = new GraphQLObjectType({ 
  name: "DirectMessage",
  fields: {
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    data: { type: GraphQLString }, // byte
    encoding: { type: GraphQLString },
    userId: { type: GraphQLString },
    recipientUserId: { type: GraphQLString }
  }
});

// GraphQL
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
          name: { type: GraphQLString }
        },
        resolve: (root, args, context, info) => {
          return userModel.findById(args.id).exec();
        }
      },
      message: {
        type: GraphQLList(MessageType),
        // args: {
          // search for message by:
          // id: { type: GraphQLNonNull(GraphQLID) },
          // text: { type: GraphQLString },
          // userId: { type: GraphQLString }, // search for message by user
          // data: { type: }, // <~ for images/other (not for search; this is part of the model)
          // encoding: { } // <~ (???)
        // },
        resolve: (root, args, context, info) => {
          return messageModel.find().exec();
        }
      },
      directMessage: {
        type: GraphQLList(DirectMessageType),
        args: {
          userId: String,
          recipientUserId: String
        },
        resolve: (root, args, context, info) => {
          return directMessageModel.find(args).exec(); // halp
        }
      }
    }
  })
});

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
