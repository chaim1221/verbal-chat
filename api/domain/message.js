
var Message = function NormalMessage(data) {
  this.id = data.id;
  this.text = data.text;
  this.data = data.data;
  this.encoding = data.encoding;
  this.userId = data.userId;

  return data;
}

module.exports = Message;
