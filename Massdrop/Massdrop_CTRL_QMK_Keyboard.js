export function Name() { return "Massdrop CTRL QMK Keyboard"; }
export function Version() { return "1.1.2"; }
export function VendorId() { return 0x04d8; }
export function ProductId() { return 0xEED2; }
export function Publisher() { return "WhirlwindFX"; }
export function Documentation() { return "qmk/drop-ctrl"; }
export function DeviceType() { return "keyboard"; }
export function Size() { return [19, 8]; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 8.0;}
/* global
shutdownMode:readonly
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
*/
export function ControllableParameters()
{
	return [
		{"property":"shutdownMode", "group":"lighting", "label":"Shutdown Mode", "type":"combobox", "values":["SignalRGB", "Hardware"], "default":"SignalRGB"},
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"#009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"#009bde"},
	];
}

//Plugin Version: Built for Protocol V1.0.6

const vKeys =
[
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,		   13, 14, 15,
	16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,    30, 31, 32,
	33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,    47, 48, 49,
	50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
	62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,              74,
	75, 76, 77,         78,         79, 80, 81, 82,     83, 84, 85,
	86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118
];
const vKeyNames =
[
	"Esc",     "F1", "F2", "F3", "F4",   "F5", "F6", "F7", "F8",    "F9", "F10", "F11", "F12",  "Print Screen", "Scroll Lock", "Pause Break",
	"`", "1",  "2", "3", "4", "5",  "6", "7", "8", "9", "0",  "-",   "+",  "Backspace",        "Insert",        "Home",     "Page Up",
	"Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\",                       "Del",         "End",   "Page Down",
	"CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter",
	"Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift",                   "Up Arrow",
	"Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Menu", "Right Ctrl",  "Left Arrow",  "Down Arrow", "Right Arrow",
	"UnderGlow1", "UnderGlow2", "UnderGlow3", "UnderGlow4", "UnderGlow5", "UnderGlow6", "UnderGlow7", "UnderGlow8", "UnderGlow9", "UnderGlow10", "UnderGlow11", "UnderGlow12", "Underglow13",
	"UnderGlow14", "UnderGlow15", "UnderGlow16", "UnderGlow17", "UnderGlow18", "Underglow19", "Underglow20", "Underglow21", "Underglow22", "Underglow23", "Underglow24", "Underglow25", "Underglow26", "Underglow27", "Underglow28", "Underglow29", "Underglow30", "Underglow31", "Underglow32",
];

const vKeyPositions =
[
	[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1],  		 [15, 0], [16, 1], [17, 1],
	[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2],  [15, 1], [16, 2], [17, 2],
	[1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3],  [15, 2], [16, 3], [17, 3],
	[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4],
	[1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], 		                 [16, 5],
	[1, 6], [2, 6], [3, 6],					[7, 6],				     [11, 6], [12, 6], [13, 6], [14, 6],  [15, 6], [16, 6], [17, 6],
	[18, 7], [16, 7], [14, 7], [12, 7], [11, 7], [10, 7], [9, 7], [7, 7], [6, 7], [5, 7], [4, 7], [2, 7], [0, 7], [0, 4], [0, 3], [0, 2], [0, 0], [2, 0], [4, 0], [5, 0], [6, 0], [7, 0], [9, 0], [10, 0], [11, 0], [12, 0], [14, 0], [16, 0], [18, 0], [18, 2], [18, 3], [18, 4],
];

let LEDCount = 0;
const FirmwareType = 2;

export function LedNames()
{
	return vKeyNames;
}

export function LedPositions()
{
	return vKeyPositions;
}

export function Initialize()
{
	ClearReadBuffer();
	checkFirmwareType();
	versionQMK();
	versionSignalRGBProtocol();
	uniqueIdentifier();
	effectEnable();
	totalLEDs();
}

export function Render()
{
	sendColors();
}

export function Shutdown(SystemSuspending)
{

	if(SystemSuspending)
	{
		sendColors("#000000"); // Go Dark on System Sleep/Shutdown
	}
	else
	{
		if (shutdownMode === "SignalRGB")
		{
			sendColors(shutdownColor);
		}
		else
		{
			effectDisable();
		}
	}
	//vKeysArrayCount(); // For debugging array counts

}

function checkFirmwareType()
{
	const packet = [];
	packet[0] = 0x00;
	packet[1] = 0x28;

	device.write(packet, 32);

	const returnpacket = device.read(packet, 32);
	const FirmwareTypeByte = returnpacket[2];

	if(FirmwareTypeByte !== 1 || FirmwareTypeByte !== 2)
	{
		device.notify("Unsupported Firmware", "Click the Documentation button to learn more.", 3, "Documentation");
	}

	device.log("Firmware Type: " + FirmwareTypeByte);
	device.pause(30);
}

function ClearReadBuffer(timeout = 10) //Clear Read buffer to get correct values out of our read functions
{
	let count = 0;
	const readCounts = [];

	while(device.getLastReadSize() > 0)
	{
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

function createSolidColorArray(color)
{
	const rgbdata = new Array(vKeys.length * 3).fill(0);

	for(let iIdx = 0; iIdx < vKeys.length; iIdx++)
	{
		const iLedIdx = vKeys[iIdx] * 3;
		rgbdata[iLedIdx] = color[0];
		rgbdata[iLedIdx+1] = color[1];
		rgbdata[iLedIdx+2] = color[2];
	}

	return rgbdata;
}

function grabColors(overrideColor)
{
	if(overrideColor)
	{
		return createSolidColorArray(hexToRgb(overrideColor));
	}
	else if (LightingMode === "Forced")
	{
		return createSolidColorArray(hexToRgb(forcedColor));
	}

	const rgbdata = new Array(vKeys.length * 3).fill(0);

	for(let iIdx = 0; iIdx < vKeys.length; iIdx++)
	{
		const iPxX = vKeyPositions[iIdx][0];
		const iPxY = vKeyPositions[iIdx][1];
		let color = device.color(iPxX, iPxY);

		const iLedIdx = vKeys[iIdx] * 3;
		rgbdata[iLedIdx] = color[0];
		rgbdata[iLedIdx+1] = color[1];
		rgbdata[iLedIdx+2] = color[2];
	}

	return rgbdata;
}

function sendColors(overrideColor)
{
	const rgbdata = grabColors(overrideColor);

	const LedsPerPacket = 9;
	let BytesSent = 0;
	let BytesLeft = rgbdata.length;

	while(BytesLeft > 0)
	{
		const BytesToSend = Math.min(LedsPerPacket * 3, BytesLeft);
		StreamLightingData(Math.floor(BytesSent / 3), rgbdata.splice(0, BytesToSend));

		BytesLeft -= BytesToSend;
		BytesSent += BytesToSend;
	}
}

function StreamLightingData(StartLedIdx, RGBData)
{
	const packet = [0x00, 0x24, StartLedIdx, Math.floor(RGBData.length / 3)].concat(RGBData);
	device.write(packet, 33);
}

function hexToRgb(hex)
{
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	const colors = [];
	colors[0] = parseInt(result[1], 16);
	colors[1] = parseInt(result[2], 16);
	colors[2] = parseInt(result[3], 16);

	return colors;
}

export function Validate(endpoint)
{
	return endpoint.interface === 1;
}

export function ImageUrl()
{
	return "https://marketplace.signalrgb.com/devices/brands/massdrop/keyboards/ctrl.png";
}