export function Name() { return "Halo96 V2 Keyboard"; }
export function Version() { return "1.0.0"; }
export function VendorId() { return 0x19F5; }
export function ProductId() { return 0x3302; }
export function Publisher() { return "NuPhy"; }
export function Documentation(){ return "qmk/srgbmods-qmk-firmware"; }
export function Size() { return [19, 6]; }
export function DefaultPosition() { return [10, 100]; }
export function DefaultScale() { return 8.0; }
/* global
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

//Plugin Version: Built for Protocol V1.0.4

const vKeys =     [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
    46,47,48,49,50,51,52,53,54,55,56,57,58,59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
    74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98
];

const vKeyNames =     [
    "KC_ESC", "KC_BRID", "KC_BRIU", "MAC_TASK", "MAC_SEARCH", "MAC_VOICE", "MAC_CONSOLE", "KC_MPRV", "KC_MPLY", "KC_MNXT", "KC_MUTE", "KC_VOLD", "KC_VOLU", "MAC_PRTA", "KC_DEL", "KC_HOME","KC_END","KC_PGUP","KC_PGDN",
    "KC_GRV", "KC_1", "KC_2", "KC_3", "KC_4", "KC_5", "KC_6", "KC_7", "KC_8", "KC_9", "KC_0", "KC_MINS", "KC_EQL", "KC_BSPC","KC_NUM","KC_PSLS","KC_PAST","KC_PMNS",
    "KC_TAB", "KC_Q", "KC_W", "KC_E", "KC_R", "KC_T", "KC_Y", "KC_U", "KC_I", "KC_O", "KC_P", "KC_LBRC", "KC_RBRC", "KC_BSLS", "KC_P7","KC_P8","KC_P9","KC_PPLS",
    "KC_CAPS", "KC_A", "KC_S", "KC_D", "KC_F", "KC_G", "KC_H", "KC_J", "KC_K", "KC_L", "KC_SCLN", "KC_QUOT", "KC_ENT","KC_P4","KC_P5","KC_P6",
    "KC_LSFT", "KC_Z", "KC_X", "KC_C", "KC_V", "KC_B", "KC_N", "KC_M", "KC_COMM", "KC_DOT", "KC_SLSH", "KC_RSFT", "KC_UP", "KC_P1","KC_P2","KC_P3","KC_PENT",
    "KC_LCTL", "KC_LALT", "KC_LGUI", "KC_SPC", "KC_RGUI", "Fn", "KC_LEFT", "KC_DOWN", "KC_RGHT","KC_P0","KC_PDOT",
];

const vKeyPositions =     [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0],[16, 0],[17, 0],[18, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [15, 1], [16, 1],[17, 1],[18, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [15, 2], [16, 2],[17, 2],[18, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [13, 3], [15, 3], [16, 3], [17, 3],
    [0, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],[11, 4], [13, 4], [14, 4], [15, 4], [16, 4], [17, 4],[18, 4],
    [0, 5], [1, 5], [2, 5], [6, 5], [9, 5], [10, 5],[13, 5],[14, 5],[15, 5],[16, 5],[17, 5]
];

let LEDCount = 0;
let IsViaKeyboard = true;
const MainlineQMKFirmware = 1;
const VIAFirmware = 2;
const PluginProtocolVersion = "1.0.5";

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
}

export function Render() 
{
    sendColors();
}

let shutdown_flag = 0;
export function Shutdown(SystemSuspending) {

	if(SystemSuspending) {
		sendColors("#000000"); // Go Dark on System Sleep/Shutdown
	} else {
		if (shutdownMode === "SignalRGB") {
            shutdown_flag = true;
			sendColors(shutdownColor);
		} else {
			effectDisable();
            shutdown_flag = false;
		}
	}

	vKeysArrayCount(); // For debugging array counts

}

function ClearReadBuffer(timeout = 10)
{
    let count = 0;
    let readCounts = [];
    device.flush();

    while(device.getLastReadSize() > 0){
        device.read([0x00], 83, timeout);
        count++;
        readCounts.push(device.getLastReadSize());
    }
    //device.log(`Read Count ${count}: ${readCounts} Bytes`)
}

function checkFirmwareType()
{
    let packet = [];
    packet[0] = 0x00;
    packet[1] = 0x28;

    device.write(packet, 83);

    let returnpacket = device.read(packet,83);
    let FirmwareTypeByte = returnpacket[2];

    if(FirmwareTypeByte !== 1 || FirmwareTypeByte !== 2)
    {
        device.notify("Unsupported Firmware: ", "Click Show Console, and then click on troubleshooting for your keyboard to find out more.", 0)
    }

    device.log("Firmware Type: " + FirmwareTypeByte);
    device.pause(30);
}

function versionQMK() //Check the version of QMK Firmware that the keyboard is running
{
    var packet = [];
    packet[0] = 0x00;
    packet[1] = 0x21;

    device.write(packet, 83);
    packet = device.read(packet,83);
    let QMKVersionByte1 = packet[2];
    let QMKVersionByte2 = packet[3];
    let QMKVersionByte3 = packet[4];
    device.log("QMK Version: " + QMKVersionByte1 + "." + QMKVersionByte2 + "." + QMKVersionByte3);
    device.pause(30);
}

function versionSignalRGBProtocol() //Grab the version of the SignalRGB Protocol the keyboard is running
{
    var packet = [];
    packet[0] = 0x00;
    packet[1] = 0x22;

    device.write(packet, 83);
    packet = device.read(packet,83);
    let ProtocolVersionByte1 = packet[2];
    let ProtocolVersionByte2 = packet[3];
    let ProtocolVersionByte3 = packet[4];
    device.log("SignalRGB Protocol Version: " + ProtocolVersionByte1 + "." + ProtocolVersionByte2 + "." + ProtocolVersionByte3);
    device.pause(30);
}

function uniqueIdentifier() //Grab the unique identifier for this keyboard model
{
    var packet = [];
    packet[0] = 0x00;
    packet[1] = 0x23;

    device.write(packet, 83);
    packet = device.read(packet,83);
    let UniqueIdentifierByte1 = packet[2];
    let UniqueIdentifierByte2 = packet[3];
    let UniqueIdentifierByte3 = packet[4];
    device.log("Unique Device Identifier: " + UniqueIdentifierByte1 + UniqueIdentifierByte2 + UniqueIdentifierByte3);
    device.pause(30);
}

function effectEnable() //Enable the SignalRGB Effect Mode
{
    let packet = [];
    packet[0] = 0x00;
    packet[1] = 0x25;

    device.write(packet,83);
    device.pause(30);
    shutdown_flag = false;
}

function effectDisable() //Revert to Hardware Mode
{
    let packet = [];
    packet[0] = 0x00;
    packet[1] = 0x26;

    device.write(packet,83);  
}
//
function grabColors(shutdown = shutdown_flag)
{
	let rgbdata = [];

	for(let iIdx = 0; iIdx < vKeys.length; iIdx++)
	{
		let iPxX = vKeyPositions[iIdx][0];
		let iPxY = vKeyPositions[iIdx][1];
		let color;
          
		if(shutdown)
		{
			color = hexToRgb(shutdownColor);
		}
		else if (LightingMode === "Forced")
		{
			color = hexToRgb(forcedColor);
		}
		else
		{
			color = device.color(iPxX, iPxY);
		}

		let iLedIdx = vKeys[iIdx] * 3;
		rgbdata[iLedIdx] = color[0];
		rgbdata[iLedIdx+1] = color[1];
		rgbdata[iLedIdx+2] = color[2];
	}

	return rgbdata;
}

function sendColors()
{
	let rgbdata = grabColors();

    for(var index = 0; index < 11; index++) //This will need rounded up to closest value for your board.
    {
        
        let packet = [];
        let offset = index * 9;

        packet[0] = 0x00;
        packet[1] = 0x24;
        packet[2] = offset;
        packet[3] = 0x09;
    
        packet = packet.concat(rgbdata.splice(0, 27));
        device.write(packet, 64);

    }

}


function hexToRgb(hex) 
{
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	let colors = [];
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
	return "";
}