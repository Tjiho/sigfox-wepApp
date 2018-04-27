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
    io.emit('logs', "New user is connected");
    socket.on('disconnect', function()
    {
        console.log('user disconnected');
    });
});



app.post('/sigfox',function(req,res)
{   
    var message = ""
    if(req.body)
    {
        for( key in req.body)
        {
            message += "<div>["+key+"] => "+  req.body[key] +"</div>";  
        }
        io.emit('logs', "<h3>sigfox:</h3>"+message);
    }
    else
    {
        io.emit('logs', "sigfox: no data");
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
