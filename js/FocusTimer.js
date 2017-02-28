function FocusTimer(maxTimeInSeconds, callback) {
    this.maxTime = maxTimeInSeconds;
    this.startTime;
    this.callback = callback;
    this.lastRunComplete = true;
    this.running = false;
}

FocusTimer.prototype.getLastRunComplete = function() {
    return !this.running && this.lastRunComplete;
}

FocusTimer.prototype.getSecondsLeft = function() {
    console.log("get seconds " + this.running);
    if (!this.running) {
        return this.maxTime;
    }
    
    return this.maxTime - Math.round((getNow() - this.startTime) / 1000);
}

FocusTimer.prototype.start = function () {
    this.startTime = getNow();
    this.running = true;
    setTimeout(function() { this.callback(); finish(); }, this.maxTime * 1000);
}

FocusTimer.prototype.finish = function () {
    this.lastRunComplete = this.getSecondsLeft() <= 0;
    this.running = false;
}

var getNow = function () {
    return (new Date()).getTime();
}

var getSeconds = function (dt) {
    return dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
}