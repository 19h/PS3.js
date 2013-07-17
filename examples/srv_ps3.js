require("../lib/ps3.js");

// Hook echtzeit

var http = require("http"),
        echtzeit = require('echtzeit'),
        srv = http.Server(),
	eau = new echtzeit.NodeAdapter({mount: '/srv'});
	eau.attach(srv),
        srv.listen(9532);

util = require("util");

log = function () {
        return process.stdout.write( "\r" + util.format.apply(this, arguments));
}

lp = +new Date;

fs = require('fs');

live = true;
        record = false;

if ( live ) {
        _zp_ = [];

        setInterval(function () {
                eau.getClient().publish('/srv', {
                        data: rdata
                });
                log(+new Date - lp);
                lp = +new Date;
                record && _zp_.push(rdata);
        }, 10);
        
        record && setInterval(function () {
                fs.writeFile("rdata", JSON.stringify(_zp_), function(err) {}); 
        }, 10000);
} else {
        fs.readFile('rdata', 'utf8', function (err,data) {
                data = JSON.parse(data);
                i = 0;
                setInterval(function () {
                        eau.getClient().publish('/srv', {
                                data: data[i++]
                        });
                        log(+new Date - lp);
                        lp = +new Date;
                }, 10)
        });
}

// Provide HTTP access

var http = require('http'),
        url = require('url'),
        path = require('path'),
        fs = require('fs');
var mimeTypes = {
        "html": "text/html",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "png": "image/png",
        "js": "text/javascript",
        "css": "text/css"
};

http.createServer(function (req, res) {
        var uri = url.parse(req.url).pathname;
        uri == "/" && (uri = "/ps3client.html");
        var filename = path.join(process.cwd(), uri);
        fs.exists(filename, function (e) {
                var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
                if (!e || mimeType == void 0) {
                        res.writeHead(200, {
                                'Content-Type': 'text/plain'
                        });
                        return res.end('404 Not Found\n');
                }
                res.writeHead(200, {
                        'Content-Type': mimeType
                });

                fs.createReadStream(filename).pipe(res);

        }); //end path.exists
}).listen(80);
