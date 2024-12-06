export function Name() { return "GMMK3 QMK Keyboard"; }
export function Version() { return "1.1.9"; }
export function VendorId() { return 0x504B; }
export function ProductId() { return 0x320F; }
export function Publisher() { return "WhirlwindFX"; }
export function Documentation(){ return "qmk/srgbmods-qmk-firmware"; }
export function DeviceType() { return "keyboard"; }
export function ConflictingProcesses() { return ["VIA.exe"]; }
export function Size() { return [23, 10]; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 8.0;}
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

//Plugin Version: Built for Protocol V1.0.5

let vKeyNames = [];
let vKeyPositions = [];
let vKeys = [];

//p65 ansi Needs testing
const vKeysANSIp65 = [
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, //14
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, //14
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, //14
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, //14
    55, 56, 57,             58,             59, 60, 61, 62, 63, //9

    64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 
    74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
    84
];

const vKeyNamesANSIp65 = [
    "~", "1",  "2", "3", "4", "5",  "6", "7", "8", "9", "0",  "-",   "+",  "Backspace", //14
    "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", //14
    "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter", "Page Up",                                 //14
    "Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift", "Up Arrow", "End",                   //14
    "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Left Arrow",  "Down Arrow", "Right Arrow",        //9
    "sled1", "sled2", "sled3", "sled4", "sled5", "sled6", "sled7", "sled8", "sled9", "sled10",                          //10
    "sled11", "sled12", "sled13", "sled14", "sled15", "sled16", "sled17", "sled18", "sled19", "sled20",                 //10
    "Logo"                                                                                                                                                                                                                      //1     
];
const vKeyPositionsANSIp65 = [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], //14
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], //14
    [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], //14
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], //14
    [1, 5], [2, 5], [3, 5],                         [7, 5],                          [11, 5], [12, 5], [13, 5], [14 ,5], [15, 5], //9

    [22, 0], [22, 1], [22, 2], [22, 3], [22, 4], [22, 5], [22, 6], [22, 7], [22, 8], [22, 9], //10
    [0, 0],   [0, 1],  [0, 2],  [0, 3],  [0, 4],  [0, 5],  [0, 6],  [0, 7],  [0, 8],  [0, 9], //10
    [20, 0] //1 (duh)           
];
//end p65 ansi

//p65 iso Needs testing
const vKeysISOp65 = [
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, //14
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, //14
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, //14
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, //14
    55, 56, 57,             58,             59, 60, 61, 62, 63, //9

    64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 
    74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
    84
];

const vKeyNamesISOp65 = [
    "~", "1",  "2", "3", "4", "5",  "6", "7", "8", "9", "0",  "-",   "+",  "Backspace", //14
    "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", //14
    "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter", "Page Up",                                 //14
    "Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift", "Up Arrow", "End",                   //14
    "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Left Arrow",  "Down Arrow", "Right Arrow",        //9
    "sled1", "sled2", "sled3", "sled4", "sled5", "sled6", "sled7", "sled8", "sled9", "sled10",                          //10
    "sled11", "sled12", "sled13", "sled14", "sled15", "sled16", "sled17", "sled18", "sled19", "sled20",                 //10
    "Logo"                                                                                                                                                                                                                      //1     
];
const vKeyPositionsISOp65 = [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], //14
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], //14
    [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], //14
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], //14
    [1, 5], [2, 5], [3, 5],                         [7, 5],                          [11, 5], [12, 5], [13, 5], [14 ,5], [15, 5], //9

    [22, 0], [22, 1], [22, 2], [22, 3], [22, 4], [22, 5], [22, 6], [22, 7], [22, 8], [22, 9], //10
    [0, 0],   [0, 1],  [0, 2],  [0, 3],  [0, 4],  [0, 5],  [0, 6],  [0, 7],  [0, 8],  [0, 9], //10
    [20, 0] //1 (duh)           
];
//end p65 iso

//p75 ansi thanks to OuroborosWurm for development and testing - Signed off 12-5-2024 - Naitoshedo
const vKeysANSIp75 = [
     0,      1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 100,            //14
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,             //15
    28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,             //15
    43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,                 //14
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,                 //14
    71, 72, 73,             74,             75, 76, 77, 78, 79,             //9
    80, 81, 82, 83, 84, 85, 86, 87, 88, 89,                                                 //10
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99,                                                 //10
];

const vKeyNamesANSIp75 = [
    "Esc", "F1",  "F2", "F3", "F4", "F5",  "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Logo",                                //14
    "~", "1",  "2", "3", "4", "5",  "6", "7", "8", "9", "0",  "-",   "+",  "Backspace", "Delete",                       //15
    "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Page Up",                                    //15
    "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter", "Page Down",                                 //14
    "Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift", "Up Arrow", "End",                   //14
    "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Left Arrow",  "Down Arrow", "Right Arrow",        //9
    "sled1", "sled2", "sled3", "sled4", "sled5", "sled6", "sled7", "sled8", "sled9", "sled10",                          //10
    "sled11", "sled12", "sled13", "sled14", "sled15", "sled16", "sled17", "sled18", "sled19", "sled20",                 //10                                                                                                                                                                                                                      //1     
];
const vKeyPositionsANSIp75 = [
    [1, 0],         [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], //14
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1], //15
    [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2], //15
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3],          [15, 3], //14
    [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4],          [15, 4], //14
    [1, 5], [2, 5], [3, 5],                         [7, 5],                          [11, 5], [12, 5], [13, 5], [14 ,5], [15, 5], //9

    [0, 0],   [0, 1],  [0, 2],  [0, 3],  [0, 4],  [0, 5],  [0, 6],  [0, 7],  [0, 8],  [0, 9], //10
    [16, 9], [16, 8], [16, 7], [16, 6], [16, 5], [16, 4], [16, 3], [16, 2], [16, 1], [16, 0], //10         
];
//end p75 ansi thanks to OuroborosWurm for development and testing - Signed off 12-5-2024 - Naitoshedo

//p75 iso Needs testing
const vKeysISOp75 = [
     0,      1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 100,            //14
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,             //15
    28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,             //15
    43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,                 //14
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,                 //14
    71, 72, 73,             74,             75, 76, 77, 78, 79,             //9
    80, 81, 82, 83, 84, 85, 86, 87, 88, 89,                                                 //10
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99,                                                 //10
];

const vKeyNamesISOp75 = [
    "Esc", "F1",  "F2", "F3", "F4", "F5",  "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Logo",                                //14
    "~", "1",  "2", "3", "4", "5",  "6", "7", "8", "9", "0",  "-",   "+",  "Backspace", "Delete",                       //15
    "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Page Up",                                    //15
    "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter", "Page Down",                                 //14
    "Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift", "Up Arrow", "End",                   //14
    "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Left Arrow",  "Down Arrow", "Right Arrow",        //9
    "sled1", "sled2", "sled3", "sled4", "sled5", "sled6", "sled7", "sled8", "sled9", "sled10",                          //10
    "sled11", "sled12", "sled13", "sled14", "sled15", "sled16", "sled17", "sled18", "sled19", "sled20",                 //10                                                                                                                                                                                                                      //1     
];
const vKeyPositionsISOp75 = [
    [1, 0],         [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], //14
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1], //15
    [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2], //15
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3],          [15, 3], //14
    [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4],          [15, 4], //14
    [1, 5], [2, 5], [3, 5],                         [7, 5],                          [11, 5], [12, 5], [13, 5], [14 ,5], [15, 5], //9

    [0, 0],   [0, 1],  [0, 2],  [0, 3],  [0, 4],  [0, 5],  [0, 6],  [0, 7],  [0, 8],  [0, 9], //10
    [16, 9], [16, 8], [16, 7], [16, 6], [16, 5], [16, 4], [16, 3], [16, 2], [16, 1], [16, 0], //10         
];
//end p75 iso

//p100 ansi thanks to dillrellis for development and testing - Signed off 12-5-2024 - Naitoshedo
const vKeysANSIp100 = [
    0,      1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12,  13, 14, 15, //16
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,  30, 31, 32,    33, 34, 35, 36, //21
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,  51, 52, 53,    54, 55, 56, 57, //21
    58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,     70,                 71, 72, 73, //16
    74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,         85,           86,   87, 88, 89, 90, //17
    91, 92, 93,             94,             95, 96, 97, 98,  99, 100, 101,  102,    103, //13
    // Left and right side lights
    104, 105, 106, 107, 108, 109, 110, 111, 112, 113, //10
    123, 122, 121, 120, 119, 118, 117, 116, 115, 114, //10
    // Logo
    124 //1 (duh)
];

const vKeyNamesANSIp100 = [
    "Esc",     "F1", "F2", "F3", "F4",   "F5", "F6", "F7", "F8",    "F9", "F10", "F11", "F12",  "PrtSc", "ScrollLock", "Pause", //16
    "`", "1",  "2", "3", "4", "5",  "6", "7", "8", "9", "0",  "-",   "+",  "Backspace", "Insert", "Home", "PgUp", "NumLock", "Num /", "Num *", "Num -",              //21
    "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Del", "End", "PgDwn",              "Num 7", "Num 8", "Num 9", "Num +",              //21
    "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'",  "Enter",    "Num 4", "Num 5", "Num 6",                       //16
    "Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift", "Up Arrow", "Num 1", "Num 2", "Num 3", "Num Enter", //18
    "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Menu", "Right Ctrl", "Left Arrow",  "Down Arrow", "Right Arrow",   "Num 0", "Num .",       //13

    "Left LED 1", "Left LED 2", "Left LED 3", "Left LED 4", "Left LED 5", "Left LED 6", "Left LED 7", "Left LED 8", "Left LED 9", "Left LED 10", //10
    "Right LED 1", "Right LED 2", "Right LED 3", "Right LED 4", "Right LED 5", "Right LED 6", "Right LED 7 ", "Right LED 8", "Right LED 9", "Right LED 10", //10
    "Logo" //1 (duh)
];

const vKeyPositionsANSIp100 = [
    [1, 0],         [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], //16
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1], [16, 1], [17, 1], [18, 1], [19, 1], [20, 1], [21, 1], //21
    [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2], [16, 2], [17, 2], [18, 2], [19, 2], [20, 2], [21, 2],//21
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],          [14, 3],                            [18, 3], [19, 3], [20, 3], //16
    [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],                   [14, 4],          [16, 4],          [18, 4], [19, 4], [20, 4], [21, 4], //16
    [1, 5], [2, 5], [3, 5],                         [7, 5],                          [11, 5], [12, 5], [13, 5], [14 ,5], [15, 5], [16, 5], [17, 5], [18, 5],          [20, 5],

    [0, 0],   [0, 1],  [0, 2],  [0, 3],  [0, 4],  [0, 5],  [0, 6],  [0, 7],  [0, 8],  [0, 9], //10
    [22, 0], [22, 1], [22, 2], [22, 3], [22, 4], [22, 5], [22, 6], [22, 7], [22, 8], [22, 9], //10
    [20, 0] //1 (duh)
];
//end p100 ansi thanks to dillrellis for development and testing - Signed off 12-5-2024 - Naitoshedo

//p100 iso thanks to pulsarbilly for development and testing - Signed off 12-5-2024 - Naitoshedo
const vKeysISOp100 = [
     0,      1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,  13, 14, 15, //16
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,  30, 31, 32,    33, 34, 35, 36, //21
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,  51, 52, 53,    54, 55, 56, 57, //21
    58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,     70,                 71, 72, 73, //16
    74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,     86,      87,        88, 89, 90, 91, //18
    92, 93, 94,             95,             96, 97, 98, 99, 100, 101, 102, 103,    104, //13
    // Left and right side lights
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, //10
    115, 116, 117, 118, 119, 120, 121, 122, 123, 124, //10
    // Logo
    125 //1 (duh)
];

const vKeyNamesISOp100 = [
    "Esc",     "F1", "F2", "F3", "F4",   "F5", "F6", "F7", "F8",    "F9", "F10", "F11", "F12",  "PrtSc", "ScrollLock", "Pause", //16
    "`", "1",  "2", "3", "4", "5",  "6", "7", "8", "9", "0",  "-",   "+",  "Backspace", "Insert", "Home", "PgUp", "NumLock", "Num /", "Num *", "Num -",              //21
    "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "Enter", "Del", "End", "PgDwn",              "Num 7", "Num 8", "Num 9", "Num +",              //21
    "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'",  "#",    "Num 4", "Num 5", "Num 6",                       //16
    "Left Shift", "\|", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift", "Up Arrow", "Num 1", "Num 2", "Num 3", "Num Enter", //18
    "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Menu", "Right Ctrl", "Left Arrow",  "Down Arrow", "Right Arrow",   "Num 0", "Num .",       //13

    "Right LED 1", "Right LED 2", "Right LED 3", "Right LED 4", "Right LED 5", "Right LED 6", "Right LED 7 ", "Right LED 8", "Right LED 9", "Right LED 10", //10
    "Left LED 1", "Left LED 2", "Left LED 3", "Left LED 4", "Left LED 5", "Left LED 6", "Left LED 7", "Left LED 8", "Left LED 9", "Left LED 10", //10
    "Logo" //1 (duh)
];

const vKeyPositionsISOp100 = [
    [1, 0],         [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], //16
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1], [16, 1], [17, 1], [18, 1], [19, 1], [20, 1], [21, 1], //21
    [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2], [16, 2], [17, 2], [18, 2], [19, 2], [20, 2], [21, 2],//21
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],          [14, 3],                            [18, 3], [19, 3], [20, 3], //16
    [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],          [14, 4],          [16, 4],          [18, 4], [19, 4], [20, 4], [21, 4], //16
    [1, 5], [2, 5], [3, 5],                         [7, 5],                          [11, 5], [12, 5], [13, 5], [14 ,5], [15, 5], [16, 5], [17, 5], [18, 5],          [20, 5],

    [16, 1], [16, 1], [16, 1], [16, 2], [16, 2], [16, 2], [16, 3], [16, 3], [16, 3], [16, 4], //10
     [0, 1],  [0, 1],  [0, 1],  [0, 2],  [0, 2],  [0, 2],  [0, 2],  [0, 3],  [0, 3],  [0, 3], //10
    [20, 0] //1 (duh)
];
//end p100 iso thanks to pulsarbilly for development and testing - Signed off 12-5-2024 - Naitoshedo

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

    device.log('vKeysANSIp65 ' + vKeysANSIp65.length);
    device.log('vKeyNamesANSIp65 ' + vKeyNamesANSIp65.length);
    device.log('vKeyPositionsANSIp65 ' + vKeyPositionsANSIp65.length);

    device.log('vKeysISOp65 ' + vKeysISOp65.length);
    device.log('vKeyNamesISOp65 ' + vKeyNamesISOp65.length);
    device.log('vKeyPositionsISOp65 ' + vKeyPositionsISOp65.length);

    //device.log('vKeysANSIp75 ' + vKeysANSIp75.length);
    //device.log('vKeyNamesANSIp75 ' + vKeyNamesANSIp75.length);
    //device.log('vKeyPositionsANSIp75 ' + vKeyPositionsANSIp75.length);

    device.log('vKeysISOp75 ' + vKeysISOp75.length);
    device.log('vKeyNamesISOp75 ' + vKeyNamesISOp75.length);
    device.log('vKeyPositionsISOp75 ' + vKeyPositionsISOp75.length);

    //device.log('vKeysANSIp100 ' + vKeysANSIp100.length);
    //device.log('vKeyNamesANSIp100 ' + vKeyNamesANSIp100.length);
    //device.log('vKeyPositionsANSIp100 ' + vKeyPositionsANSIp100.length);

    //device.log('vKeysISOp100 ' + vKeysISOp100.length);
    //device.log('vKeyNamesISOp100 ' + vKeyNamesISOp100.length);
    //device.log('vKeyPositionsISOp100 ' + vKeyPositionsISOp100.length);
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

    if(UniqueIdentifierByte3 === 11)
    {
        device.setControllableLeds(vKeyNamesANSIp65, vKeyPositionsANSIp65);
        vKeys = vKeysANSIp65;
        vKeyNames = vKeyNamesANSIp65;
        vKeyPositions = vKeyPositionsANSIp65;
    }
    if(UniqueIdentifierByte3 === 12)
    {
        device.setControllableLeds(vKeyNamesISOp65, vKeyPositionsISOp65);
        vKeys = vKeysISOp75;
        vKeyNames = vKeyNamesISOp75;
        vKeyPositions = vKeyPositionsISOp75;
    }
    if(UniqueIdentifierByte3 === 13)
    {
        device.setControllableLeds(vKeyNamesANSIp75, vKeyPositionsANSIp75);
        vKeys = vKeysANSIp75;
        vKeyNames = vKeyNamesANSIp75;
        vKeyPositions = vKeyPositionsANSIp75;
        device.setSize([17,10]);
    }
    if(UniqueIdentifierByte3 === 14)
    {
        device.setControllableLeds(vKeyNamesISOp75, vKeyPositionsISOp75);
        vKeys = vKeysISOp75;
        vKeyNames = vKeyNamesISOp75;
        vKeyPositions = vKeyPositionsISOp75;
        device.setSize([17,10]);
    }
    if(UniqueIdentifierByte3 === 15)
    {
        device.setControllableLeds(vKeyNamesANSIp100, vKeyPositionsANSIp100);
        vKeys = vKeysANSIp100;
        vKeyNames = vKeyNamesANSIp100;
        vKeyPositions = vKeyPositionsANSIp100;
        device.setSize([23,10]);
    }
    if(UniqueIdentifierByte3 === 16)
    {
        device.setControllableLeds(vKeyNamesISOp100, vKeyPositionsISOp100);
        vKeys = vKeysISOp100;
        vKeyNames = vKeyNamesISOp100;
        vKeyPositions = vKeyPositionsISOp100;
        device.setSize([23,10]);
    }

    device.log("Unique Device Identifier: " + UniqueIdentifierByte1 + UniqueIdentifierByte2 + UniqueIdentifierByte3);
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

export function Image() {
    return "";
}