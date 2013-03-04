# PS3.js

An easy wrapper around [Node-HID](https://github.com/hanshuebner/node-hid) allowing easy access to data incoming from a PS3 Dualshock 3 Controller.

## Install from Repository

Clone with [git](http://git-scm.com):

    git clone https://github.com/KenanSulayman/PS3.js

Change into the directory:

    cd PS3.js

Configure and install the dependencies with [npm](http://github.com/isaacs/npm):

    npm install

Done, however, if you'd like to try out the tests, proceed with:

    npm install -dev

in order to install the Faye-package. (or `npm install faye', do what you fancy)

## Install from NPM

Just power up npm and you're ready to go:

    npm install ps3.js

Done, however, if you'd like to try out the tests, proceed with:

    npm install -dev

in order to install the Faye-package. (or `npm install faye`, do what you fancy).

## Specification

Currently, I was able to determine the following structure in the data of the DS3 Controller. However, the entries marked with "<<...>>" couldn't be identified correlating to a function of the controller.

    0: const 1.
    1: const 0.
    2: Select: 1, L3: 2, R3: 4, Play: 8, [Up: 16, Right: 32, Down: 64, Left: 128].
    3: 1, 2. (3). L2, R2.
    4: L2: 1, R2: 2, L1: 4, R1: 8, [Triangle: 16, Circle: 32, Cross: 64, Square: 128].
    5: PS: 1.
    6: <<?>>
    7: LStick: L->R [1-255]
    8: LStick: B->T [1-255]
    9: RStick: L->R [1-255]
    10: RStick: B->T [1-255]
    11: <<?>>
    12: <<?>>
    13: <<?>>
    14: <<?>>
    15: UpPressure: [1-255]
    16: RightPressure: [1-255]
    17: DownPressure: [1-255]
    18: LeftPressure: [1-255]
    19: L2Pressure: [1-255]
    20: R2Pressure: [1-255]
    21: L1Pressure: [1-255]
    22: R1Pressure: [1-255]
    23: TrianglePressure: [1-255]
    24: CirclePressure: [1-255]
    25: CrossPressure: [1-255]
    26: SquarePressure: [1-255]
    27: <<0?>>
    28: <<0?>>
    29: <<0?>>
    30: <<2?>>
    31: <<238?>>
    32: <<18?>>
    33: <<0?>>
    34: <<0?>>
    35: <<0?>>
    36: <<0?>>
    37: <<18?>>
    38: <<78?>>
    39: <<119?>>
    40: <<1?>>
    41: <<128?>>
    42: <<1?>>
    42: CircularAxis: WindLeft: 1, WindRight: 2.
    43: CircularAxis: Wind[L->R], Degrees. [360=>255]N.
    44: CircularAxis: WindBack:2, WindFront: 1.
    45: CiruclarAxis: Wind[B->F], Degrees. [360=>255]N.
    46: CircularAxis: Wind<<?>>:2, Wind<<?>>: 1.
    47: CiruclarAxis: Wind[<<?>>-><<?>>], Degrees. [360=>255]N.
    48: CircularAxis: Wind<<?>>:2, Wind<<?>>: 1.
    49: CiruclarAxis: Wind[<<?>>-><<?>>], Degrees. [360=>255]N.