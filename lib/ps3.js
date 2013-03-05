var HID = require('node-hid');

try {
	hid = new HID.HID(1356, 616);
} catch (e) {
	throw "No controller is connected.";
}

rdata = [];

/*

	P1[ [ Device <===> HID ] <==> PS3.js ] <==> P2[ rdata ].
	Thus, P1_timing > P2_timing.

*/

hid.gotData = function (err, data) {
	rdata = data;

	//WindRL = rdata[41]; // 2: left wind, 1: right wind
	//WindBF = rdata[43]; // 1: front wind, 2: back wind

	return this.read(this.gotData.bind(this));
}

hid.read(hid.gotData.bind(hid));