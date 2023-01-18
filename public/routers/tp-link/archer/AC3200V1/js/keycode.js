var KeyLButton = 0x1; //mouse left
var KeyRButton = 0x2; //mouse right
var KeyCancel = 0x3; //CANCLE
var KeyMButton = 0x4; //mouse middle
var KeyBack = 0x8; //BACKSPACE
var KeyTab = 0x9; //TAB
var KeyClear = 0xC; //CLEAR
var KeyReturn = 0xD; //ENTER
var KeyShift = 0x10; //SHIFT
var KeyControl = 0x11; //CTRL
var KeyMenu = 0x12; //MENU
var KeyPause = 0x13; //PAUSE
var KeyCapital = 0x14; //CAPSLOCK
var KeyEscape = 0x1B; //ESC
var KeySpace = 0x20; //SPACEBAR 
var KeyPageUp = 0x21; //PAGE UP 
var KeyPageDown = 0x22; //PAGE DOWN 
var KeyEnd = 0x23; //END 
var KeyHome = 0x24; //HOME 
var KeyLeft = 0x25; //LEFT ARROW 
var KeyUp = 0x26; //UP ARROW 
var KeyRight = 0x27; //RIGHT ARROW 
var KeyDown = 0x28; //DOWN ARROW 
var KeySelect = 0x29; //SELECT 
var KeyPrint = 0x2A; //PRINT SCREEN 
var KeyExecute = 0x2B; //EXECUTE 
var KeySnapshot = 0x2C; //SNAPSHOT 
var KeyInsert = 0x2D; //INSERT 
var KeyDelete = 0x2E; //DELETE 
var KeyHelp = 0x2F; //HELP 
var KeyNumlock = 0x90; //NUM LOCK 

var KeyA = 65; //A
var KeyB = 66; //B
var KeyC = 67; //C 
var KeyD = 68; //D 
var KeyE = 69; //E 
var KeyF = 70; //F 
var KeyG = 71; //G 
var KeyH = 72; //H 
var KeyI = 73; //I 
var KeyJ = 74; //J 
var KeyK = 75; //K 
var KeyL = 76; //L 
var KeyM = 77; //M 
var KeyN = 78; //N 
var KeyO = 79; //O 
var KeyP = 80; //P 
var KeyQ = 81; //Q 
var KeyR = 82; //R 
var KeyS = 83; //S 
var KeyT = 84; //T 
var KeyU = 85; //U 
var KeyV = 86; //V 
var KeyW = 87; //W 
var KeyX = 88; //X 
var KeyY = 89; //Y 
var KeyZ = 90; //Z 

var Key0 = 48; //0
var Key1 = 49; //1
var Key2 = 50; //2
var Key3 = 51; //3
var Key4 = 52; //4
var Key5 = 53; //5
var Key6 = 54; //6
var Key7 = 55; //7
var Key8 = 56; //8
var Key9 = 57; //9

var keyPlus = 0xBB; //+
var keyMinus = 0xBD; //-

//numeric keypad

var KeyNumpad0 = 0x60; //0
var KeyNumpad1 = 0x61; //1
var KeyNumpad2 = 0x62; //2
var KeyNumpad3 = 0x63; //3
var KeyNumpad4 = 0x64; //4
var KeyNumpad5 = 0x65; //5
var KeyNumpad6 = 0x66; //6
var KeyNumpad7 = 0x67; //7
var KeyNumpad8 = 0x68; //8
var KeyNumpad9 = 0x69; //9
var KeyMultiply = 0x6A; //MULTIPLICATION SIGN (*)
var KeyAdd = 0x6B; //PLUS SIGN (+)
var KeySeparator = 0x6C; //ENTER
var KeySubtract = 0x6D; //MINUS SIGN (-)
var KeyDecimal = 0x6E; //DECIMAL POINT (.)
var KeyDivide = 0x6F; //DIVISION SIGN (/)

//function key

var KeyF1 = 0x70; //F1
var KeyF2 = 0x71; //F2
var KeyF3 = 0x72; //F3
var KeyF4 = 0x73; //F4
var KeyF5 = 0x74; //F5
var KeyF6 = 0x75; //F6
var KeyF7 = 0x76; //F7
var KeyF8 = 0x77; //F8
var KeyF9 = 0x78; //F9
var KeyF10 = 0x79; //F10
var KeyF11 = 0x7A; //F11
var KeyF12 = 0x7B; //F12
var KeyF13 = 0x7C; //F13
var KeyF14 = 0x7D; //F14
var KeyF15 = 0x7E; //F15
var KeyF16 = 0x7F; //F16
$.extend({
    code2key: function(event) {
        var code = event.keyCode;
        if (code >= 48 && code <= 57) {
            if (event.shiftKey) {
                switch (code - 48) {
                    case 1:
                        return '!';
                        break;
                    case 2:
                        return '@';
                        break;
                    case 3:
                        return '#';
                        break;
                    case 4:
                        return '$';
                        break;
                    case 5:
                        return '%';
                        break;
                    case 6:
                        return '^';
                        break;
                    case 7:
                        return '&';
                        break;
                    case 8:
                        return '*';
                        break;
                    case 9:
                        return '(';
                        break;
                    case 0:
                        return ')';
                        break;
                }
            } else {
                return code - 48;
            }
        } else if (code >= 0x60 && code <= 0x69) {
            return code - 0x60;
        } else if (code >= 65 && code <= 90) {
            return String.fromCharCode(code);
        } else if (code == 0xBD) {
            if (event.shiftKey) {
                return '_';
            } else {
                return '-';
            }
        } else if (code == 0xBB) {
            if (event.shiftKey) {
                return '+';
            } else {
                return '=';
            }
        } else if (code == 0xd) {
            return 'enter';
        } else if (code == 0x8) {
            return 'back';
        }
        return '';
    },
});
