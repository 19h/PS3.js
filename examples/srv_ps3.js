require("../lib/ps3.js");

// Hook Faye

var faye = require('faye'),
	eau = new faye.NodeAdapter({mount: '/faye'});
	eau.listen(9532);

util = require("util");

log = function () {
        return process.stdout.write( "\r" + util.format.apply(this, arguments));
}

lp = +new Date;

setInterval(function () {
        eau.getClient().publish('/faye', {
                data: rdata
        });
        log(+new Date - lp);
        lp = +new Date;
}, 50)

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

                var fileStream = fs.createReadStream(filename);
                fileStream.pipe(res);

        }); //end path.exists
}).listen(80);