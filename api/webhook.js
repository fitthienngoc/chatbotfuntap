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
module.exports = (req, res) => {
  const { body } = req
  const { entry } = body
  if (entry && entry.length > 0) {
    entry.map(
      (e) => {
        let mess = e.messaging
        if(mess && mess.length > 0 ){
          mess.map(
            (e2) => {
              console.log(e2);
              // console.log(e2.sender.id);
              // let uID = e2.sender.id ? e2.sender.id : false
              // let { text } = e2.message ? e2.message : false
              // (uID && text) ?
              // sendMessage(uID, "Tui là bot đây: " + text) &
              //   res.status(200).send("OK")
              //   :
              //   console.log("not found text or uid")
              //   &
              //   res.status(200).send("not found text or uid")
            }
          )
        }
        
      }
    )
  }
}

// app.post('/api/webhook', function (req, res) {
//   console.log('xxx', req);
//   console.log('xxx@@@', res);
//   //   const {body} = req
//   //   const {entry} = body
//   //   const {messaging} = entry
//   // console.log(JSON.stringify(body));
//   // console.log({req});
//   // console.log({res});

//   // if(body)
//   // const {entry} = 
//   // let entries = req.body.entry;
//   // for (let entry of entries) {
//   //   let messaging = entry.messaging;
//   //   for (let message of messaging) {
//   //     let senderId = message.sender.id;
//   //     if (message.message) {
//   //       // If user send text
//   //       if (message.message.text) {
//   //         let text = message.message.text;
//   //         sendMessage(senderId, "Tui là bot đây: " + text)
//   //       }
//   //     }
//   //   }
//   // }

//   // res.status(200).send("OK");
// });


// Gửi thông tin tới REST API để trả lời
const sendMessage =  (senderId, message) => {
    request(
      {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
          access_token: "EAAsHu2amnGsBACaZAIUs2iHQ4WU8XX6Y3R4PsDnPj8YfKmY5tNK4zumZCprU2CbS7bjAZAtkIF2ZAvFS99vZCTbW3UeWnDpf50M5egBRnPUsOSvXYMIRZClEvdIk4ZC0hEo6QVQFwQ1H90OkvLQDfuEqMZAB36fVxtsPtbVZCAZACsZBQ5310fUzGpN",
        },
        method: 'POST',
        json: {
          recipient: {
            id: senderId
          },
          message: {
            text: message
          },
        }
      })
      console.log("s");
  
}

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1");

server.listen(app.get('port'), app.get('ip'), function () {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});