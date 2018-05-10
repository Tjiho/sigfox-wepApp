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

app.post("/lora",function(req,res)
{
	if(req.body)
	{
		let payload = req.body.payload_raw 
		let buff = new Buffer(payload, 'base64');
		let payload_txt = buff.toString('ascii');
		let res_object = JSON.parse(payload_txt);
		res_object["id"] = req.body["hardware_serial"]
		let message = ""	
		for( key in res_object)
		{
		    message += "<div>["+key+"] => "+  res_object[key] +"</div>";  
        }
        
		io.emit('logs', "<h3>Lora:</h3>"+message);
	}	

})

app.post('/http',function(req,res)
{   
    var message = ""
    console.log(req.headers)
    console.log(req.body)
    //console0log("----");
    if(req.body)
    {
        //console.log(req.headers)
	    for( key in req.body)
        {
            message += "<div>["+key+"] => "+  req.body[key] +"</div>";  
        }
        io.emit('logs', "<h3>HTTP:</h3>"+message);
        useArgs(req.body)
    }
    else
    {
        io.emit('logs', "sigfox: no data");
    }
    res.sendStatus(200);  
})


function useArgs(args)
{
    if(args['x'] && args["y"] && args['temperature'] && args['id'])
    {
        io.emit("info",args)
    }
}


app.get('/', function (req, res) 
{
        res.render('index.html');
})

app.use('/static',Express.static('static'))
app.use('/.well-known',Express.static('.well-known'))
http.listen(Config.port, function () 
{
    console.log('listening on port ' + Config.port)
})
