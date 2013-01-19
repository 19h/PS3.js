require("./ps3.js");

setInterval(function () {
	eau.getClient().publish('/', {
		data: [rdata[41], rdata[43]]
	});
}, 100)

// rdata is always current

// Hook Faye

var faye = require('faye'),
	eau = new faye.NodeAdapter({mount: '/'});
	eau.listen(9532);

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