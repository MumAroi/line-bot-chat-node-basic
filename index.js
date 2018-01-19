var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

// app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text;
  var sender = req.body.events[0].source.userId;
  var replyToken = req.body.events[0].replyToken;
  console.log(text, sender, replyToken);
  console.log(typeof sender, typeof text);
  // console.log(req.body.events[0])
  if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
    // sendText(sender, text)
    sendText(replyToken, text);
  }
  res.sendStatus(200);
});

function sendText (replyToken, text) {
  let data = {
    // to: sender,
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีค่ะ เราเป็นผู้ช่วยปรึกษาด้านความรัก สำหรับหมามิ้น 💞'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer qwopvM24A0lBTUPEc/YKTUkZackCbGoCLBILGrz/yyJQ2n9eKMN8QIF0Jc5TBDjf7sGSSQeLFxpwrwu96k5MMuYtV/pmGs2Y6jsOipJQCoYbHg18kYRg0KZ+mYs7GSMV9LxohZLvPr0FQHZ7cEcM7QdB04t89/1O/w1cDnyilFU='
    },
    url: 'https://api.line.me/v2/bot/message/reply',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error');
    if (res) console.log('success');
    if (body) console.log(body);
  });
};

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'));
});