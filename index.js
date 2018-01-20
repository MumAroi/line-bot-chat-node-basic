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
    sendReplayText({
        // to: sender,
        replyToken: replyToken,
        messages: [
          {
            type: 'text',
            text: 'ทักมาแบบนี้ หิวสินะ'
          }
        ]
      });
  }else if(text === 'หิว' || text === 'sticker'){
    sendReplayText({
      replyToken: replyToken,
      messages: [
        {
          type: 'sticker',
          "packageId": "2",
          "stickerId": "19"
        }
      ]
    });
  }else if(text === 'carousel' || text === 'สินค้า' || text === 'รายการ' || text === 'lists'){
    sendReplayText({
      // to: sender,
      replyToken: replyToken,
      messages: [
        {
          "type": "template",
          "altText": "this is a carousel template",
          "template": {
              "type": "carousel",
              "columns": [
                  {
                    "thumbnailImageUrl": "https://news.thaiware.com/upload_misc/news/2017_04/728x409/10042_1704041151391r.jpg",
                    "imageBackgroundColor": "#FFFFFF",
                    "title": "แมวน้อยสดใส",
                    "text": "ชื้อฉันไปสิ",
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=111"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=111"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "https://news.thaiware.com/upload_misc/news/2017_04/728x409/10042_1704041151391r.jpg"
                        }
                    ]
                  },
                  {
                    "thumbnailImageUrl": "https://daily.rabbitstatic.com/wp-content/uploads/2017/01/750x560xF-Cat.jpg.pagespeed.ic.msAFaxglTb.jpg",
                    "imageBackgroundColor": "#000000",
                    "title": "แมวน้อยหน้าดุ",
                    "text": "มีอะไรเราะ!!!",
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=222"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=222"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "https://daily.rabbitstatic.com/wp-content/uploads/2017/01/750x560xF-Cat.jpg.pagespeed.ic.msAFaxglTb.jpg"
                        }
                    ]
                  }
              ],
              "imageAspectRatio": "rectangle",
              "imageSize": "cover"
          }
        }
      ]
    });
  }else if(text === 'img-lists'){
    sendReplayText({
      // to: sender,
      replyToken: replyToken,
      messages: [
        {
          "type": "template",
          "altText": "this is a image carousel template",
          "template": {
              "type": "image_carousel",
              "columns": [
                  {
                    "imageUrl": "https://news.thaiware.com/upload_misc/news/2017_04/728x409/10042_1704041151391r.jpg",
                    "action": {
                      "type": "postback",
                      "label": "Buy",
                      "data": "action=buy&itemid=111"
                    }
                  },
                  {
                    "imageUrl": "https://daily.rabbitstatic.com/wp-content/uploads/2017/01/750x560xF-Cat.jpg.pagespeed.ic.msAFaxglTb.jpg",
                    "action": {
                      "type": "message",
                      "label": "Yes",
                      "text": "yes"
                    }
                  },
                  {
                    "imageUrl": "http://1.bp.blogspot.com/-HNLH6E_ZMFM/U8ZU-yh482I/AAAAAAAAbhA/er5rHnsMmJg/s1600/%E0%B9%81%E0%B8%A1%E0%B8%A7%E0%B9%86.jpg",
                    "action": {
                      "type": "uri",
                      "label": "View detail",
                      "uri": "http://1.bp.blogspot.com/-HNLH6E_ZMFM/U8ZU-yh482I/AAAAAAAAbhA/er5rHnsMmJg/s1600/%E0%B9%81%E0%B8%A1%E0%B8%A7%E0%B9%86.jpg"
                    }
                  }
              ]
          }
        }
      ]
    });
  }
  res.sendStatus(200);
});

function sendReplayText (message) {
  // let data = {
  //   // to: sender,
  //   replyToken: replyToken,
  //   messages: [
  //     {
  //       type: 'text',
  //       text: 'สวัสดีค่ะ เราเป็นผู้ช่วยปรึกษาด้านความรัก สำหรับหมามิ้น 💞'
  //     }
  //   ]
  // }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer qwopvM24A0lBTUPEc/YKTUkZackCbGoCLBILGrz/yyJQ2n9eKMN8QIF0Jc5TBDjf7sGSSQeLFxpwrwu96k5MMuYtV/pmGs2Y6jsOipJQCoYbHg18kYRg0KZ+mYs7GSMV9LxohZLvPr0FQHZ7cEcM7QdB04t89/1O/w1cDnyilFU='
    },
    url: 'https://api.line.me/v2/bot/message/reply',
    method: 'POST',
    body: message,
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