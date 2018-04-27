const Express = require('express')
const app = Express();
const Nunjucks = require('nunjucks')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 


var Config = require('./config');



Nunjucks.configure('views', {
    autoescape: true,
    express: app
});

io.on('connection', function(socket)
{
    console.log('a user connected');
    io.emit('chat message', "a user connected");
    socket.on('disconnect', function()
    {
        console.log('user disconnected');
    });
});



app.post('/sigfox',function(req,res)
{   
    var message = ""
    console.log(req.body)
    if(req.body)
    {
        for( key in req.body)
        {
            message += "<br/>["+key+"] => "+  req.body[key];  
        }
        io.emit('chat message', "sigfox:"+message);
    }
    else
    {
        io.emit('chat message', "sigfox: no data");
    }
    res.sendStatus(200);  
})


app.get('/', function (req, res) 
{
        res.render('index.html');
})

app.use('/static',Express.static('static'))

http.listen(Config.port, function () 
{
    console.log('listening on port ' + Config.port)
})
