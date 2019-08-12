
var User = function UserProfile(data) {
  this.id = data.id;
  this.name = data.name;
  this.blocked = data.blocked;
  this.email = data.email;
  this.password = data.password;
  this.active = data.active;

  return data;
}

module.exports = User;
