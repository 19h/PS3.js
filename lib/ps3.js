var HID = require('hid');

try {
	hid = new HID.HID(1356, 616);
} catch (e) {
	process.exit(console.log("No controller is connected."));
}

rdata = [];

/*

	P1[ [ Device <===> HID ] <==> PS3.js ] <==> P2[ rdata ].
	Thus, P1_timing > P2_timing.

*/

hid.gotData = function (err, data) {
	rdata = data;

	//WindRL = rdata[41];
	//WindBF = rdata[43];
	//console.log( ( WindRL == 2 ? "Nach links gebeugt " : "Nach rechts gebeugt " ) + ( WindBF == 1 ? "und nach vorne gebeugt!" : "und zu mir gebeugt!" ) )

	return this.read(this.gotData.bind(this));
}

hid.read(hid.gotData.bind(hid));