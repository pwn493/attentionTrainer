$(document).ready(function() {
    var maxTimeInSeconds;
    var focusTimer;
    
    var initTimer = function(seconds) {
        maxTimeInSeconds = seconds;
        focusTimer = new FocusTimer(maxTimeInSeconds, function() {adjust(); alert("done!");});
        return 0;
    };
    
    var adjust = function() {
       if (focusTimer.getLastRunComplete()) {
            if (confirm("Did you focus the whole time?")) {
                maxTimeInSeconds += 30;
            } else {
                maxTimeInSeconds -= 30;
            }
       } else {
            maxTimeInSeconds -= 30;
       }
       
       initTimer(maxTimeInSeconds);
    };

    initTimer(300);
    var intervalId;
    
    $('.start').click(function () {
       focusTimer.start();
       intervalId = setInterval(function () { $('.container .timer').html(focusTimer.getSecondsLeft()); }, 500);
    });
    
    $('.stop').click(function () {
       focusTimer.finish();
       window.clearInterval(intervalId);
       adjust();
    });
});