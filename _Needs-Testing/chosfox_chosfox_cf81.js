export function Name() { return "CHOSFOX CHOSFOX CF81 QMK Keyboard"; }
export function Version() { return "1.1.6"; }
export function VendorId() { return 0xFFFE; }
export function ProductId() { return 0x0012; }
export function Publisher() { return "Polyhaze (@Polyhaze) / Dylan Perks (@Perksey)"; }
export function Documentation(){ return "qmk/srgbmods-qmk-firmware"; }
export function Size() { return [36, 12]; }
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

//Plugin Version: Built for Protocol V1.0.4

const vKeys = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104
];

const vKeyNames = [
	"Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Del", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Bksp", "Home", "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "PageUp", "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", ":", "Enter", "PageDn", "Shift", ":", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Shift", "Up", "Ctrl", "Win", "Alt", "Space", "Alt", "Fn", "Ctrl", "Left", "Down", "Right", "Light 1", "Light 2", "Light 3", "Light 4", "Light 5", "Light 6", "Light 7", "Light 8", "Light 9", "Light 10", "Light 11", "Light 12", "Light 13", "Light 14", "Light 15", "Light 16", "Light 17", "Light 18", "Light 19", "Light 20", "Light 21", "Light 22"
];

const vKeyPositions = [
	[0, 0], [4, 0], [9, 0], [14, 0], [19, 0], [23, 0], [27, 0], [32, 0], [34, 0], [2, 0], [6, 0], [10, 0], [15, 0], [20, 0], [0, 5], [4, 5], [8, 5], [13, 5], [17, 5], [21, 5], [25, 5], [31, 5], [33, 5], [35, 5], [3, 5], [7, 5], [12, 5], [16, 5], [30, 5], [0, 10], [4, 10], [8, 10], [13, 10], [17, 10], [21, 10], [25, 10], [31, 10], [33, 10], [35, 10], [3, 10], [7, 10], [12, 10], [16, 10], [30, 10], [0, 4], [8, 4], [13, 4], [17, 4], [21, 4], [25, 4], [31, 4], [33, 4], [35, 4], [3, 4], [7, 4], [12, 4], [16, 4], [20, 4], [30, 4], [0, 9], [4, 9], [8, 9], [11, 9], [17, 9], [23, 9], [29, 9], [33, 9], [1, 9], [6, 9], [12, 9], [18, 9], [22, 9], [26, 9], [0, 2], [5, 2], [11, 2], [28, 2], [3, 2], [7, 2], [12, 2], [20, 2], [24, 2], [30, 2], [0, 0], [0, 3], [0, 6], [0, 8], [0, 10], [0, 1], [0, 4], [0, 7], [0, 9], [0, 11], [0, 2], [30, 0], [30, 3], [30, 6], [30, 8], [30, 10], [30, 1], [30, 4], [30, 7], [30, 9], [30, 11], [30, 2]
];

let LEDCount = 0;
let IsViaKeyboard = false;
const MainlineQMKFirmware = 1;
const VIAFirmware = 2;
const PluginProtocolVersion = "1.0.4";

export function LedNames()
{
	return vKeyNames;
}

export function LedPositions()
{
	return vKeyPositions;
}

export function vKeysArrayCount()
{
	device.log('vKeys ' + vKeys.length);
	device.log('vKeyNames ' + vKeyNames.length);
	device.log('vKeyPositions ' + vKeyPositions.length);
}

export function Initialize()
{
	requestFirmwareType();
	requestQMKVersion();
	requestSignalRGBProtocolVersion();
	requestUniqueIdentifier();
	requestTotalLeds();
	effectEnable();

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

	vKeysArrayCount(); // For debugging array counts

}

function commandHandler()
{
	const readCounts = [];

	do
	{
		const returnpacket = device.read([0x00], 32, 10);
		processCommands(returnpacket);

		readCounts.push(device.getLastReadSize());

		// Extra Read to throw away empty packets from Via
		// Via always sends a second packet with the same Command Id.
		if(IsViaKeyboard)
		{
			device.read([0x00], 32, 10);
		}
	}
	while(device.getLastReadSize() > 0);

}

function processCommands(data)
{
	switch(data[1])
	{
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

function returnQMKVersion(data)
{
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

function returnSignalRGBProtocolVersion(data)
{
	const ProtocolVersionByte1 = data[2];
	const ProtocolVersionByte2 = data[3];
	const ProtocolVersionByte3 = data[4];

	const SignalRGBProtocolVersion = ProtocolVersionByte1 + "." + ProtocolVersionByte2 + "." + ProtocolVersionByte3;
	device.log(`SignalRGB Protocol Version: ${SignalRGBProtocolVersion}`);


	if(PluginProtocolVersion !== SignalRGBProtocolVersion)
	{
		device.notify(
			"Unsupported Protocol Version: ",
			`This plugin is intended for SignalRGB Protocol version ${PluginProtocolVersion}. This device is version: ${SignalRGBProtocolVersion}`,
			1,
			"Documentation"
		);
	}

	device.pause(30);
}

function requestUniqueIdentifier() //Grab the unique identifier for this keyboard model
{
	if(device.write([0x00, 0x23], 32) === -1)
	{
		device.notify(
			"Unsupported Firmware: ",
			`This device is not running SignalRGB-compatible firmware. Click the Open Troubleshooting Docs button to learn more.`,
			1,
			"Documentation"
		);
	}

	device.pause(30);
	commandHandler();
}


function returnUniqueIdentifier(data)
{
	const UniqueIdentifierByte1 = data[2];
	const UniqueIdentifierByte2 = data[3];
	const UniqueIdentifierByte3 = data[4];

	if(!(UniqueIdentifierByte1 === 0 && UniqueIdentifierByte2 === 0 && UniqueIdentifierByte3 === 0))
	{
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

function returnTotalLeds(data)
{
	LEDCount = data[2];
	device.log("Device Total LED Count: " + LEDCount);
	device.pause(30);
}

function requestFirmwareType()
{
	device.write([0x00, 0x28], 32);
	device.pause(30);
	commandHandler();
}

function returnFirmwareType(data)
{
	const FirmwareTypeByte = data[2];

	if(!(FirmwareTypeByte === MainlineQMKFirmware || FirmwareTypeByte === VIAFirmware))
	{
		device.notify(
			"Unsupported Firmware: ",
			"Click Show Console, and then click on troubleshooting for your keyboard to find out more.",
			1,
			"Documentation"
		);
	}

	if(FirmwareTypeByte === MainlineQMKFirmware)
	{
		IsViaKeyboard = false;
		device.log("Firmware Type: Mainline");
	}

	if(FirmwareTypeByte === VIAFirmware)
	{
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

export function Image()
{
	return "https://avatars.githubusercontent.com/u/98346428";
}
