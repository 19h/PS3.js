require("../lib/ps3.js");

util = this['util'] || require("util");

log = function () {
        return process.stdout.write( "\r" + util.format.apply(this, arguments));
}

// thumb matrix

// setInterval(function () {
//         rpacket = [
//                 rdata[6],
//                 rdata[7],
//                 rdata[8],
//                 rdata[9],
//         ];
//         log( rpacket.join("--")+"--")
// }, 20)

// projection: 255 x 255 => 1920 x 1080


setInterval(function () {
        ld = [ 1920, 1080 ]
        
        rpacket = [
                rdata[6] * ld[0], // x 1920
                rdata[7] * ld[1], // x 1080
                rdata[8] * ld[0], // x 1920
                rdata[9] * ld[1], // x 1080
        ].map(function (v) {
                return v / 255
        });

        console.log( rpacket )
}, 20)


// ====> V8 Bug!

/*data = msg.data.splice( 6, 4 ).map(function (v) {
        return v / 255
});*/