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
    res.sendStatus(200)
})

app.listen(app.get('port'), function(){
    console.log('run at port :', app.get('port'));
});