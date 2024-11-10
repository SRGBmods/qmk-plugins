export function Name() { return "Drop SHIFT v2 QMK Keyboard"; }
export function Version() { return "1.1.9"; }
export function VendorId() { return 0x359b; }
export function ProductId() { return 0x000c; }
export function Publisher() { return "Angrychair"; }
export function Documentation(){ return "qmk/srgbmods-qmk-firmware"; }
export function Size() { return [25, 10]; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 8.0;}
/*global
shutdownMode:readonly
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
*/
export function ControllableParameters() {
	return [
		{"property":"shutdownMode", "group":"lighting", "label":"Shutdown Mode", "type":"combobox", "values":["SignalRGB", "Hardware"], "default":"SignalRGB"},
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"#000000"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"#009bde"},
	];
}

//Plugin Version: Built for Protocol V1.0.5

const vKeys = [
//	   0   1     2    3   4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24	
	 99, 100,      101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120,      121, // 23
	       0,        1,   2,   3,   4,        5,   6,   7,   8,   9,       10,  11,  12,       13,       14,  15,  16,  17,      // 18
	158,  18,  19,       20,  21,  22,  23,  24,       25,  26,  27,  28,       29,  30,  31,            32,  33,  34,  35, 122, // 20
	157,  36,       37,  38,  39,       40,  41,  42,  43,       44,  45,  46,  47,  48,       49,       50,  51,  52,  53, 123, // 20
	156,  54,       55,  56,       57,  58,  59,  60,       61,  62,  63,  64,	65,       66,            67,  68,  69,  70, 124, // 19
	155,  71,            72,  73,  74,  75,       76,  77,  78,  79,  80,  81,       82,       83,       84,  85,  86,  87, 125, // 19
	      88,       89,  90,                      91,                 92,       93,       94,  95,  96,       97,  98,           // 11
    154, 153, 152, 151, 150, 149, 148, 147, 146, 145, 144, 143, 142, 141, 140, 139, 138, 137, 136, 135, 134, 133, 132, 131, 130, // 25
];

const vKeyNames = [
    "LED099",     "LED100",           "LED101",   "LED102", "LED103", "LED104", "LED105", "LED106", "LED107", "LED108", "LED109", "LED110", "LED111", "LED112", "LED113", "LED114", "LED115",     "LED116",      "LED117", "LED118", "LED119",  "LED120",              "LED121", // 23
	                 "Esc",               "F1",       "F2",     "F3",     "F4",               "F5",     "F6",     "F7",     "F8",     "F9",              "F10",    "F11",    "F12",                  "Del",                  "Home",    "End", "Page Up", "Page Down",           // 18
	"LED158",          "`",      "1",                  "2",      "3",      "4",      "5",      "6",                "7",      "8",      "9",      "0",      "-",      "+",        "Backspace",	                          "NumLock",  "Num /",   "Num *",     "PrtSc", "LED124", // 20
	"LED157",        "Tab",                "Q",        "W",      "E",                "R",      "T",      "Y",      "U",                "I",      "O",      "P",      "[",      "]",                   "\\",	                "Num 7",  "Num 8",   "Num 9",     "Num -", "LED125", // 20
	"LED156",   "CapsLock",                "A",        "S",                "D",      "F",      "G",      "H",                "J",      "K",      "L",      ";",      "'",		     "Enter",                               "Num 4",  "Num 5",   "Num 6",     "Num +", "LED126", // 19
	"LED155", "Left Shift",                            "Z",      "X",      "C",      "V",                "B",      "N",      "M",      ",",      ".",      "/",      "Right Shift",             "Up Arrow",                 "Num 1",  "Num 2",   "Num 3", "Num Enter", "LED127", // 19
	           "Left Ctrl",         "Left Win", "Left Alt",                                          "Space",                            "Right Alt",               "FN",       "Left Arrow", "Down Arrow", "Right Arrow",            "Num 0",    "Num.",                        // 11
	"LED154",     "LED153", "LED152", "LED151",   "LED150", "LED149", "LED148", "LED147", "LED146", "LED145", "LED144", "LED143", "LED142", "LED141", "LED140", "LED139", "LED138", "LED137",     "LED136",      "LED135", "LED134", "LED133",  "LED132",    "LED131", "LED130", // 25
];

const vKeyPositions = [
	[0, 0], [1, 0],         [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0], [22, 0],          [24, 0], // 23
	        [1, 1],         [3, 1], [4, 1], [5, 1], [6, 1],         [8, 1], [9, 1], [10, 1], [11, 1], [12, 1],          [14, 1], [15, 1], [16, 1],          [18, 1],          [20, 1], [21, 1], [22, 1], [23, 1],          // 18
	[0, 2], [1, 2], [2, 2],         [4, 2], [5, 2], [6, 2], [7, 2], [8, 2],         [10, 2], [11, 2], [12, 2], [13, 2],          [15, 2], [16, 2], [17, 2],                   [20, 2], [21, 2], [22, 2], [23, 2], [24, 2], // 20
	[0, 3], [1, 3],         [3, 3], [4, 3], [5, 3],         [7, 3], [8, 3], [9, 3], [10, 3],          [12, 3], [13, 3], [14, 3], [15, 3], [16, 3],          [18, 3],          [20, 3], [21, 3], [22, 3], [23, 3], [24, 3], // 20
	[0, 4], [1, 4],         [3, 4], [4, 4],         [6, 4], [7, 4], [8, 4], [9, 4],          [11, 4], [12, 4], [13, 4], [14, 4], [15, 4],          [17, 4],                   [20, 4], [21, 4], [22, 4], [23, 4], [24, 4], // 19
	[0, 5], [1, 5],                 [4, 5], [5, 5], [6, 5], [7, 5],         [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5],          [16, 4],          [18, 5],          [20, 5], [21, 5], [22, 5], [23, 5], [24, 5], // 19
	        [1, 6],         [3, 6], [4, 6],                                 [9, 6],                            [13, 6],          [15, 6],          [17, 6], [18, 6], [19, 6],          [21, 6], [22, 6],                   // 11
	[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7], [20, 7], [21, 7], [22, 7], [23, 7], [24, 7]  // 25
];

let LEDCount = 0;
let IsViaKeyboard = false;
const MainlineQMKFirmware = 1;
const VIAFirmware = 2;
const PluginProtocolVersion = "1.0.5";

export function LedNames() {
	return vKeyNames;
}

export function LedPositions() {
	return vKeyPositions;
}

export function vKeysArrayCount() {
	device.log('vKeys ' + vKeys.length);
	device.log('vKeyNames ' + vKeyNames.length);
	device.log('vKeyPositions ' + vKeyPositions.length);
}

export function Initialize() {
	requestFirmwareType();
	requestQMKVersion();
	requestSignalRGBProtocolVersion();
	requestUniqueIdentifier();
	requestTotalLeds();
	effectEnable();

}

export function Render() {
	sendColors();
}

export function Shutdown(SystemSuspending) {

	if(SystemSuspending) {
		sendColors("#000000"); // Go Dark on System Sleep/Shutdown
	} else {
		if (shutdownMode === "SignalRGB") {
			sendColors(shutdownColor);
		} else {
			effectDisable();
		}
	}
	//vKeysArrayCount(); // For debugging array counts

}

function commandHandler() {
	const readCounts = [];

	do {
		const returnpacket = device.read([0x00], 32, 10);
		processCommands(returnpacket);

		readCounts.push(device.getLastReadSize());

		// Extra Read to throw away empty packets from Via
		// Via always sends a second packet with the same Command Id.
		if(IsViaKeyboard) {
			device.read([0x00], 32, 10);
		}
	}
	while(device.getLastReadSize() > 0);

}

function processCommands(data) {
	switch(data[1]) {
	case 0x21:
		returnQMKVersion(data);
		break;
	case 0x22:
		returnSignalRGBProtocolVersion(data);
		break;
	case 0x23:
		returnUniqueIdentifier(data);
		break;
	case 0x24:
		sendColors();
		break;
	case 0x27:
		returnTotalLeds(data);
		break;
	case 0x28:
		returnFirmwareType(data);
		break;
	}
}

function requestQMKVersion() //Check the version of QMK Firmware that the keyboard is running
{
	device.write([0x00, 0x21], 32);
	device.pause(30);
	commandHandler();
}

function returnQMKVersion(data) {
	const QMKVersionByte1 = data[2];
	const QMKVersionByte2 = data[3];
	const QMKVersionByte3 = data[4];
	device.log("QMK Version: " + QMKVersionByte1 + "." + QMKVersionByte2 + "." + QMKVersionByte3);
	device.log("QMK SRGB Plugin Version: "+ Version());
	device.pause(30);
}

function requestSignalRGBProtocolVersion() //Grab the version of the SignalRGB Protocol the keyboard is running
{
	device.write([0x00, 0x22], 32);
	device.pause(30);
	commandHandler();
}

function returnSignalRGBProtocolVersion(data) {
	const ProtocolVersionByte1 = data[2];
	const ProtocolVersionByte2 = data[3];
	const ProtocolVersionByte3 = data[4];

	const SignalRGBProtocolVersion = ProtocolVersionByte1 + "." + ProtocolVersionByte2 + "." + ProtocolVersionByte3;
	device.log(`SignalRGB Protocol Version: ${SignalRGBProtocolVersion}`);


	if(PluginProtocolVersion !== SignalRGBProtocolVersion) {
		device.notify("Unsupported Protocol Version", `This plugin is intended for SignalRGB Protocol version ${PluginProtocolVersion}. This device is version: ${SignalRGBProtocolVersion}`, 2, "Documentation");
	}

	device.pause(30);
}

function requestUniqueIdentifier() //Grab the unique identifier for this keyboard model
{
	if(device.write([0x00, 0x23], 32) === -1) {
		device.notify("Unsupported Firmware", "This device is not running SignalRGB-compatible firmware. Click the Documentation button to learn more.", 3, "Documentation");
	}

	device.pause(30);
	commandHandler();
}


function returnUniqueIdentifier(data) {
	const UniqueIdentifierByte1 = data[2];
	const UniqueIdentifierByte2 = data[3];
	const UniqueIdentifierByte3 = data[4];

	if(!(UniqueIdentifierByte1 === 0 && UniqueIdentifierByte2 === 0 && UniqueIdentifierByte3 === 0)) {
		device.log("Unique Device Identifier: " + UniqueIdentifierByte1 + UniqueIdentifierByte2 + UniqueIdentifierByte3);
	}

	device.pause(30);
}

function requestTotalLeds() //Calculate total number of LEDs
{
	device.write([0x00, 0x27], 32);
	device.pause(30);
	commandHandler();
}

function returnTotalLeds(data) {
	LEDCount = data[2];
	device.log("Device Total LED Count: " + LEDCount);
	device.pause(30);
}

function requestFirmwareType() {
	device.write([0x00, 0x28], 32);
	device.pause(30);
	commandHandler();
}

function returnFirmwareType(data) {
	const FirmwareTypeByte = data[2];

	if(!(FirmwareTypeByte === MainlineQMKFirmware || FirmwareTypeByte === VIAFirmware)) {
		device.notify("Unsupported Firmware", "Click the Documentation button to learn more.", 3, "Documentation");
	}

	if(FirmwareTypeByte === MainlineQMKFirmware) {
		IsViaKeyboard = false;
		device.log("Firmware Type: Mainline");
	}

	if(FirmwareTypeByte === VIAFirmware) {
		IsViaKeyboard = true;
		device.log("Firmware Type: VIA");
	}

	device.pause(30);
}

function effectEnable() //Enable the SignalRGB Effect Mode
{
	device.write([0x00, 0x25], 32);
	device.pause(30);
}

function effectDisable() //Revert to Hardware Mode
{
	device.write([0x00, 0x26], 32);
	device.pause(30);
}

function createSolidColorArray(color) {
	const rgbdata = new Array(vKeys.length * 3).fill(0);

	for(let iIdx = 0; iIdx < vKeys.length; iIdx++) {
		const iLedIdx = vKeys[iIdx] * 3;
		rgbdata[iLedIdx] = color[0];
		rgbdata[iLedIdx+1] = color[1];
		rgbdata[iLedIdx+2] = color[2];
	}

	return rgbdata;
}

function grabColors(overrideColor) {
	if(overrideColor) {
		return createSolidColorArray(hexToRgb(overrideColor));
	} else if (LightingMode === "Forced") {
		return createSolidColorArray(hexToRgb(forcedColor));
	}

	const rgbdata = new Array(vKeys.length * 3).fill(0);

	for(let iIdx = 0; iIdx < vKeys.length; iIdx++) {
		const iPxX = vKeyPositions[iIdx][0];
		const iPxY = vKeyPositions[iIdx][1];
		const color = device.color(iPxX, iPxY);

		const iLedIdx = vKeys[iIdx] * 3;
		rgbdata[iLedIdx] = color[0];
		rgbdata[iLedIdx+1] = color[1];
		rgbdata[iLedIdx+2] = color[2];
	}

	return rgbdata;
}

function sendColors(overrideColor) {
	const rgbdata = grabColors(overrideColor);

	const LedsPerPacket = 9;
	let BytesSent = 0;
	let BytesLeft = rgbdata.length;

	while(BytesLeft > 0) {
		const BytesToSend = Math.min(LedsPerPacket * 3, BytesLeft);
		StreamLightingData(Math.floor(BytesSent / 3), rgbdata.splice(0, BytesToSend));

		BytesLeft -= BytesToSend;
		BytesSent += BytesToSend;
	}
}

function StreamLightingData(StartLedIdx, RGBData) {
	const packet = [0x00, 0x24, StartLedIdx, Math.floor(RGBData.length / 3)].concat(RGBData);
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