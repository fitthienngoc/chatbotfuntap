// # SimpleServer
// A simple chat bot server
var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var router = express();

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);
var request = require("request");


// Xử lý khi có người nhắn tin cho bot
app.post('/api/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i]
    sender = event.sender.id
    if (event.message && event.message.text) {
      text = event.message.text
      sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
    }
  }
  res.sendStatus(200)
})

const token = "EAAsHu2amnGsBACaZAIUs2iHQ4WU8XX6Y3R4PsDnPj8YfKmY5tNK4zumZCprU2CbS7bjAZAtkIF2ZAvFS99vZCTbW3UeWnDpf50M5egBRnPUsOSvXYMIRZClEvdIk4ZC0hEo6QVQFwQ1H90OkvLQDfuEqMZAB36fVxtsPtbVZCAZACsZBQ5310fUzGpN"
// Gửi thông tin tới REST API để trả lời
function sendTextMessage(sender, text) {
  messageData = {
    text: text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: token },
    method: 'POST',
    json: {
      recipient: { id: sender },
      message: messageData,
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1");

server.listen(app.get('port'), app.get('ip'), function () {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});