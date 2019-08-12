
// NOT IMPLEMENTED; idea
// A "filter" is like a room, but it's just a filter of all messages. Nobody talks to a room, they all talk to #general.
// Filters just filter the noise.
// private rooms cost money and behave the exact same way as the general room (i.e., users can make filters)

// depth is the length of the display, this is calculated by the app because we have no clue
// User.blocked is a string of user ids

// TODO filters

// // GraphQL
// type Filter {
//   id: String
//   userId: String
//   name: String
//   users: [String]
// },

var filters = [
  {
    id: '91bb3b16-9437-44ba-82bf-2f5cba02cf27',
    name: "Default",
    users: getUsers(),
    userId: ''
  },
  {
    id: '6eb9a058-bee6-4699-b795-4ac4941db8c7',
    name: 'People I Like',
    users: [ 'a4a66668-fe70-4a00-a171-6c1dcf8fdb37' ],
    userId: '5f650a5c-d739-4d87-a829-b60fbc697e27'
  }
]
