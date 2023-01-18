function resetTimeouts() {
    timers.timeouts = new Array, timers.interval = new Array
}

function clearTimeouts() {
    for (var i = 0; i < timers.timeouts.length; i++) clearTimeout(timers.timeouts[i]);
    for (var i = 0; i < timers.interval.length; i++) clearInterval(timers.interval[i]);
    resetTimeouts()
}
timers = {}, resetTimeouts();
var oldSetTimeout = window.setTimeout,
    oldSetInterval = window.setInterval;
window.setTimeout = function(code, interval) {
    var timerId = oldSetTimeout(code, interval);
    return timers.timeouts.push(timerId), timerId
}, window.setInterval = function(code, interval) {
    var timerId = oldSetInterval(code, interval);
    return timers.interval.push(timerId), timerId
};
var oldParseInt = window.parseInt;
window.parseInt = function(str, radix) {
    return oldParseInt(str, void 0 == radix ? 10 : radix)
};