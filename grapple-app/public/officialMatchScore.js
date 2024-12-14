var ptsPerSecAdv = 1;
var ptsPerSecDom = 2;
var ptsPerSweep = 40;
var ptsPerSub = 240;
var victoryAtPts = 360






var matchSec = 0.0;
var leftDomSec = 0.0;
var rightDomSec = 0.0;
var leftAdvSec = 0.0;
var rightAdvSec = 0.0;
var leftPoints = 0;
var rightPoints = 0;
var pause = true;
var rightDom = false;
var leftDom = false;
var rightAdv = false;
var leftAdv = false;
var leftSweepCount = 0;
var rightSweepCount = 0;
var leftSubCount = 0;
var rightSubCount = 0;



function onPausePress() {
    pause = true;
}

function onNeutralPositionPress() {
    clearPress();
    rightDom = false;
    leftDom = false;
    rightAdv = false;
    leftAdv = false;
}

function onLeftDomPress() {
    clearPress();
    rightDom = false;
    leftDom = true;
    rightAdv = false;
    leftAdv = false;
    document.getElementById("leftDomination").style.background = "#4696FF";
}

function onRightDomPress() {
    clearPress();
    rightDom = true;
    leftDom = false;
    rightAdv = false;
    leftAdv = false;
    document.getElementById("rightDomination").style.background = "#4696FF";
}

function onLeftAdvPress() {
    clearPress();
    rightDom = false;
    leftDom = false;
    rightAdv = false;
    leftAdv = true;
    document.getElementById("leftAdvantage").style.background = "#4696FF";
}

function onRightAdvPress() {
    clearPress();
    rightDom = false;
    leftDom = false;
    rightAdv = true;
    leftAdv = false;
    document.getElementById("rightAdvantage").style.background = "#4696FF";
}

function onLeftSweepPress() {
    leftSweepCount++;
    leftPoints = leftPoints + ptsPerSweep;
    document.getElementById('leftScore').innerHTML = leftPoints.toFixed(1);
}

function onRightSweepPress() {
    rightSweepCount++;
    rightPoints = rightPoints + ptsPerSweep;
    document.getElementById('rightScore').innerHTML = rightPoints.toFixed(1);
}

function onLeftSubPress() {
    leftSubCount++;
    leftPoints = leftPoints + ptsPerSub;
    document.getElementById('leftScore').innerHTML = leftPoints.toFixed(1);
}

function onRightSubPress() {
    rightSubCount++;
    rightPoints = rightPoints + ptsPerSub;
    document.getElementById('rightScore').innerHTML = rightPoints.toFixed(1);
}

function onStartPress() {
    pause = false;
}

function onNeutralPress() {
    clearPress();
    rightDom = false;
    leftDom = false;
    rightAdv = false;
    leftAdv = false;
    document.getElementById("neutralPosition").style.background = "#4696FF";
}

function clearPress() {
    document.getElementById("leftDomination").style.background = "linear-gradient(to top left,rgba(70,150,255,0.3) -150%,#FFF)";
    document.getElementById("leftAdvantage").style.background = "linear-gradient(to top left,rgba(70,150,255,0.3) -150%,#FFF)";
    document.getElementById("neutralPosition").style.background = "linear-gradient(to top left,rgba(70,150,255,0.3) -150%,#FFF)";
    document.getElementById("rightDomination").style.background = "linear-gradient(to top left,rgba(70,150,255,0.3) -150%,#FFF)";
    document.getElementById("rightAdvantage").style.background = "linear-gradient(to top left,rgba(70,150,255,0.3) -150%,#FFF)";
}



function onLoad() {
    var timer = setInterval(function () {
        if (rightPoints < victoryAtPts && leftPoints < victoryAtPts) {
            minutes = Math.floor(matchSec / 60);
            seconds = (matchSec - minutes * 60).toFixed(1);
            if (matchSec >= 60) {
                time = String(minutes) + ':' + String(seconds).padStart(4, '0')
            } else {
                time = String(seconds)
            }
            document.getElementById('matchTimer').innerHTML = time;
            if (!pause) {
                matchSec = matchSec + 0.1

                if (rightAdv) {
                    rightAdvSec = rightAdvSec + 0.1;
                    rightPoints = rightPoints + ptsPerSecAdv / 10;
                    document.getElementById('rightScore').innerHTML = rightPoints.toFixed(1);
                };
                if (leftAdv) {
                    leftAdvSec = leftAdvSec + 0.1;
                    leftPoints = leftPoints + ptsPerSecAdv / 10;
                    document.getElementById('leftScore').innerHTML = leftPoints.toFixed(1);
                };
                if (rightDom) {
                    rightDomSec = rightDomSec + 0.1;
                    rightPoints = rightPoints + ptsPerSecDom / 10;
                    document.getElementById('rightScore').innerHTML = rightPoints.toFixed(1);
                };
                if (leftDom) {
                    leftDomSec = leftDomSec + 0.1;
                    leftPoints = leftPoints + ptsPerSecDom / 10;
                    document.getElementById('leftScore').innerHTML = leftPoints.toFixed(1);
                };
            };
        } else {
            clearInterval(timer)
        }
    }, 100);
}


let startButton = document.querySelector('#start').addEventListener('click', () => { onStartPress() })
let pauseButton = document.querySelector('#pause').addEventListener('click', () => { onPausePress() })
let rightDomButton = document.querySelector('#rightDomination').addEventListener('click', () => { onRightDomPress() })
let leftDomButton = document.querySelector('#leftDomination').addEventListener('click', () => { onLeftDomPress() })
let rightAdvButton = document.querySelector('#rightAdvantage').addEventListener('click', () => { onRightAdvPress() })
let leftAdvButton = document.querySelector('#leftAdvantage').addEventListener('click', () => { onLeftAdvPress() })
let leftSweepButton = document.querySelector('#leftSweep').addEventListener('click', () => { onLeftSweepPress() })
let rightSweepButton = document.querySelector('#rightSweep').addEventListener('click', () => { onRightSweepPress() })
let leftSubButton = document.querySelector('#leftSubmission').addEventListener('click', () => { onLeftSubPress() })
let rightSubButton = document.querySelector('#rightSubmission').addEventListener('click', () => { onRightSubPress() })
let neutralButton = document.querySelector('#neutralPosition').addEventListener('click', () => { onNeutralPress() })

onLoad();