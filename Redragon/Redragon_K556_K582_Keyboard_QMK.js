export function Name() { return "Redragon K556 Keyboard"; }
export function VendorId() { return 0x0C45; }
export function ProductId() { return 0x5004; }
export function Publisher() { return "WhirlwindFX"; }
export function Documentation(){ return "qmk/redragon-k556-k582"; }
export function Size() { return [21, 6]; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 8.0;}
/* global
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
*/
export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
	];
}

const vKeys =
[
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,		    13, 14, 15,
	16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,  29,    30, 31, 32,  		33, 34, 35, 36,
	37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,  50,    51, 52, 53,  		54, 55, 56, 57,
	58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,  71,			   		72, 73, 74,
	75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,     87,       88,	   		89, 90, 91, 92,
	93, 94, 95, 96, 97, 98, 99,   100,     				101, 102, 103,	104, 105
];
const vKeyNames =
[
	"Esc",     "F1", "F2", "F3", "F4",   "F5", "F6", "F7", "F8",    "F9", "F10", "F11", "F12",  "Print Screen", "Scroll Lock", "Pause Break",
	"`", "1",  "2", "3", "4", "5",  "6", "7", "8", "9", "0",  "-",   "+",  "Backspace",        "Insert",        "Home",     "Page Up", "NumLock", "Num /", "Num *", "Num -",
	"Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\",                        "Del",         "End",   "Page Down",   "Num 7", "Num 8", "Num 9", "Num +",
	"CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ISO_#", "Enter",                                                           "Num 4", "Num 5", "Num 6",
	"Left Shift", "ISO_<", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift",                           "Up Arrow",                  "Num 1", "Num 2", "Num 3", "Num Enter",
	"Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Menu", "Right Ctrl",  "Left Arrow",  "Down Arrow", "Right Arrow",   "Num 0", "Num ."
];

const vKeyPositions =
[
	[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0],       [11, 0], [12, 0],  [13, 0],  [14, 0], [15, 0], [16, 0],
	[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1],  [13, 1],  [14, 1], [15, 1], [16, 1],  [17, 1], [18, 1], [19, 1], [20, 1],
	[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],  [13, 2],  [14, 2], [15, 2], [16, 2],  [17, 2], [18, 2], [19, 2], [20, 2],
	[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],  [13, 3],                          [17, 3], [18, 3], [19, 3],
	[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],                   		 [15, 4],         [17, 4], [18, 4], [19, 4], [20, 4],
	[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5],      [8, 5],              					     [14, 5], [15, 5], [16, 5],  [17, 5], [18, 5]
];

let LEDCount = 0;

export function LedNames() {
	return vKeyNames;
}

export function LedPositions() {
	return vKeyPositions;
}

export function Initialize() {
	ClearReadBuffer();
	checkFirmwareType();
	versionQMK();
	versionSignalRGBProtocol();
	uniqueIdentifier();
	effectEnable();
	totalLEDs();
}

export function Render() {
	sendColors();
}

export function Shutdown() {
	effectDisable();
}

function checkFirmwareType() {
	const packet = [];
	packet[0] = 0x00;
	packet[1] = 0x28;

	device.write(packet, 32);

	const returnpacket = device.read(packet, 32);
	const FirmwareTypeByte = returnpacket[2];

	if(FirmwareTypeByte !== 3) {
		device.notify("Unsupported Firmware: ", "Click Show Console, and then click on troubleshooting for your keyboard to find out more.", 1, "Documentation");
	}

	device.log("Firmware Type: " + FirmwareTypeByte);
	device.pause(30);
}

function ClearReadBuffer(timeout = 10) //Clear Read buffer to get correct values out of our read functions
{
	let count = 0;
	const readCounts = [];

	while(device.getLastReadSize() > 0) {
		device.read([0x00], 32, timeout);
		count++;
		readCounts.push(device.getLastReadSize());
	}
}

function versionQMK() //Check the version of QMK Firmware that the keyboard is running
{
	const packet = [];
	packet[0] = 0x00;
	packet[1] = 0x21;

	device.write(packet, 32);

	const returnpacket = device.read(packet, 32);
	const QMKVersionByte1 = returnpacket[2];
	const QMKVersionByte2 = returnpacket[3];
	const QMKVersionByte3 = returnpacket[4];
	device.log("QMK Version: " + QMKVersionByte1 + "." + QMKVersionByte2 + "." + QMKVersionByte3);
	device.pause(30);
}

function versionSignalRGBProtocol() //Grab the version of the SignalRGB Protocol the keyboard is running
{
	const packet = [];
	packet[0] = 0x00;
	packet[1] = 0x22;

	device.write(packet, 32);

	const returnpacket = device.read(packet, 32);
	const ProtocolVersionByte1 = returnpacket[2];
	const ProtocolVersionByte2 = returnpacket[3];
	const ProtocolVersionByte3 = returnpacket[4];
	device.log("SignalRGB Protocol Version: " + ProtocolVersionByte1 + "." + ProtocolVersionByte2 + "." + ProtocolVersionByte3);
	device.pause(30);
}

function uniqueIdentifier() //Grab the unique identifier for this keyboard model
{
	const packet = [];
	packet[0] = 0x00;
	packet[1] = 0x23;

	device.write(packet, 32);

	const returnpacket = device.read(packet, 32);
	const UniqueIdentifierByte1 = returnpacket[2];
	const UniqueIdentifierByte2 = returnpacket[3];
	const UniqueIdentifierByte3 = returnpacket[4];
	device.log("Unique Device Identifier: " + UniqueIdentifierByte1 + UniqueIdentifierByte2 + UniqueIdentifierByte3);
	device.pause(30);
}

function totalLEDs() //Calculate total number of LEDs
{
	const packet = [];
	packet[0] = 0x00;
	packet[1] = 0x27;

	device.write(packet, 32);

	const returnpacket = device.read(packet, 33);
	LEDCount = returnpacket[2];
	device.log("Device Total LED Count: " + LEDCount);
}

function effectEnable() //Enable the SignalRGB Effect Mode
{
	const packet = [];
	packet[0] = 0x00;
	packet[1] = 0x25;

	device.write(packet, 32);
	device.pause(30);
}

function effectDisable() //Revert to Hardware Mode
{
	const packet = [];
	packet[0] = 0x00;
	packet[1] = 0x26;

	device.write(packet, 32);
}

function grabColors(shutdown = false) {
	const rgbdata = [];

	for(let iIdx = 0; iIdx < vKeys.length; iIdx++) {
		const iPxX = vKeyPositions[iIdx][0];
		const iPxY = vKeyPositions[iIdx][1];
		let color;

		if(shutdown) {
			color = hexToRgb(shutdownColor);
		} else if (LightingMode === "Forced") {
			color = hexToRgb(forcedColor);
		} else {
			color = device.color(iPxX, iPxY);
		}

		const iLedIdx = vKeys[iIdx] * 3;
		rgbdata[iLedIdx] = color[0];
		rgbdata[iLedIdx+1] = color[1];
		rgbdata[iLedIdx+2] = color[2];
	}

	return rgbdata;
}

function sendColors() {
	const rgbdata = grabColors();
	const totalpackets = Math.floor(LEDCount/9);
	const finalpacketoffset = (totalpackets*9);
	const finalpacketledstosend = (LEDCount - finalpacketoffset);

	for(let index = 0; index < totalpackets; index++) {
		const packet = [];
		const offset = index * 9;
		packet[0] = 0x00;
		packet[1] = 0x24;


		packet[2] = offset;
		packet[3] = 0x09;
		packet.push(...rgbdata.splice(0, 27));
		device.write(packet, 33);
	}

	const packet = [];
	packet[0] = 0x00;
	packet[1] = 0x24;

	packet[2] = finalpacketoffset;
	packet[3] = finalpacketledstosend;
	packet.push(...rgbdata.splice(0, finalpacketledstosend*3));
	device.write(packet, 33);
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	const colors = [];
	colors[0] = parseInt(result[1], 16);
	colors[1] = parseInt(result[2], 16);
	colors[2] = parseInt(result[3], 16);

	return colors;
}

export function Validate(endpoint) {
	return endpoint.interface === 1;
}

export function Image() {
	return "";
}