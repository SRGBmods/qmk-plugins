export function Name() { return "Hoksi Technology DURGOD Hades (QMK) QMK Keyboard"; }
export function Version() { return "1.1.6"; }
export function VendorId() { return 0xD60D; }
export function ProductId() { return 0x4AD4; }
export function Publisher() { return "Polyhaze (@Polyhaze) / Dylan Perks (@Perksey)"; }
export function Documentation(){ return "qmk/srgbmods-qmk-firmware"; }
export function Size() { return [60, 6]; }
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
        {"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"#000000"},
        {"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
        {"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"#009bde"},
    ];
}

//Plugin Version: Built for Protocol V1.0.4

const vKeys = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68
];

const vKeyNames = [
   "Esc", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Delete", "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "Home", "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "#", "Enter", "PgUp", "Shift", "\\", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Shift", "Up", "PgDn", "Ctrl", "Win", "Alt", "K45", "Fn1", "Fn2", "Ctrl", "Left", "Down", "Right"
];

const vKeyPositions = [
    [0, 0], [8, 0], [17, 0], [26, 0], [34, 0], [42, 0], [49, 0], [55, 0], [1, 0], [9, 0], [18, 0], [27, 0], [35, 0], [46, 0], [56, 0], [3, 3], [13, 3], [21, 3], [30, 3], [37, 3], [45, 3], [53, 3], [58, 3], [6, 3], [14, 3], [22, 3], [31, 3], [38, 3], [56, 3], [5, 1], [15, 1], [24, 1], [32, 1], [40, 1], [47, 1], [54, 1], [59, 1], [7, 1], [16, 1], [25, 1], [33, 1], [41, 1], [48, 5], [56, 1], [2, 4], [10, 4], [19, 4], [28, 4], [36, 4], [44, 4], [51, 4], [57, 4], [4, 4], [11, 4], [20, 4], [29, 4], [39, 4], [50, 4], [56, 4], [2, 2], [12, 2], [23, 2], [52, 2], [18, 2], [27, 2], [35, 2], [43, 2], [50, 2], [56, 2]
];

let LEDCount = 0;
let IsViaKeyboard = false;
const MainlineQMKFirmware = 1;
const VIAFirmware = 2;
const PluginProtocolVersion = "1.0.4";

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

    vKeysArrayCount(); // For debugging array counts

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
        device.notify("Unsupported Protocol Version: ", `This plugin is intended for SignalRGB Protocol version ${PluginProtocolVersion}. This device is version: ${SignalRGBProtocolVersion}`, 1, "Documentation");
    }

    device.pause(30);
}

function requestUniqueIdentifier() //Grab the unique identifier for this keyboard model
{
    if(device.write([0x00, 0x23], 32) === -1) {
        device.notify("Unsupported Firmware: ", `This device is not running SignalRGB-compatible firmware. Click the Open Troubleshooting Docs button to learn more.`, 1, "Documentation");
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
        device.notify("Unsupported Firmware: ", "Click Show Console, and then click on troubleshooting for your keyboard to find out more.", 1, "Documentation");
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

export function Image() {
    return "";
}
