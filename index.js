let express    = require('express');
let bodyParser = require('body-parser');
let cors       = require('cors');
let app        = express();

// fix for Cross-origin resource sharing 
app.use(cors());

// set port listen 
app.set('port',(process.env.PORT||3000));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());


app.use('/', function(req, res, next){
    res.send('hello');
});

app.post('/webhook', (req, res, next) => {
    // console.log(req);
    var text = req.body.events[0].message.text
    var sender = req.body.events[0].source.userId
    var replyToken = req.body.events[0].replyToken
    console.log('this data');
    console.log(text, sender, replyToken);
    
    if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
        sendText(sender, text)
    }

    res.sendStatus(200)
})

function sendText (sender, text) {
    let data = {
      to: sender,
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
        'Authorization': 'Bearer key Api'
      },
      url: 'https://api.line.me/v2/bot/message/push',
      method: 'POST',
      body: data,
      json: true
    }, function (err, res, body) {
      if (err) console.log('error')
      if (res) console.log('success')
      if (body) console.log(body)
    });
}

app.listen(app.get('port'), function(){
    console.log('run at port :', app.get('port'));
});