/*This section is about scoring only*/

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






/*This section is about managing the dropdowns and text inputs available to the user for various positions and sweeps*/


let dropdownList
let buttonPressed
let userInput
let items
let dropdownBtn



function onButtonPress(buttonName) {
    switch (buttonName) {
        case 'leftDom':
            dropdownList = document.getElementById('left-dom-dropdown-list')
            userInput = document.getElementById('left-dom-dropdown-input')
            dropdownBtn = document.getElementById('leftDomination')
            buttonPressed = buttonName
            break
        case 'leftAdv':
            dropdownList = document.getElementById('left-adv-dropdown-list')
            userInput = document.getElementById('left-adv-dropdown-input')
            dropdownBtn = document.getElementById('leftAdvantage')
            buttonPressed = buttonName
            break
        case 'leftSub':
            dropdownList = document.getElementById('left-sub-dropdown-list')
            userInput = document.getElementById('left-sub-dropdown-input')
            dropdownBtn = document.getElementById('leftSubmission')
            buttonPressed = buttonName
            break
        case 'rightDom':
            dropdownList = document.getElementById('right-dom-dropdown-list')
            userInput = document.getElementById('right-dom-dropdown-input')
            dropdownBtn = document.getElementById('rightDomination')
            buttonPressed = buttonName
            break
        case 'rightAdv':
            dropdownList = document.getElementById('right-adv-dropdown-list')
            userInput = document.getElementById('right-adv-dropdown-input')
            dropdownBtn = document.getElementById('rightAdvantage')
            buttonPressed = buttonName
            break
        case 'rightSub':
            dropdownList = document.getElementById('right-sub-dropdown-list')
            userInput = document.getElementById('right-sub-dropdown-input')
            dropdownBtn = document.getElementById('rightSubmission')
            buttonPressed = buttonName
            break
    }
    items = dropdownList.getElementsByClassName('dropdown-item')
    toggleDropdown()
}

function toggleDropdown() {
    dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block'
    userInput.focus() // Automatically focus on the input field for immediate typing
    window.addEventListener('click', onClickOutsideDropdown)
}

function clearFilter() {
    userInput.value = ''
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        item.style.display = 'block'
    }
}

function onClickOutsideDropdown(event) {
    console.log(event.target)
    clearFilter()
    if (!event.target.closest('.dropdown-container')) {
        dropdownList.style.display = 'none';
    }
}


// Filter dropdown items based on input
function filterDropdown() {
    const filter = userInput.value.toLowerCase()
    let visibleItems = 0

    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const text = item.textContent || item.innerText;
        if (text.toLowerCase().includes(filter)) {
            item.style.display = ''
            visibleItems++
        } else {
            item.style.display = 'none'
        }
    }

    // Hide dropdown if no items match
    if (visibleItems === 0) {
        dropdownList.style.display = 'none';
    }


}

// Update button text when an item is selected
function selectItem(item) {
    dropdownBtn.textContent = item
    dropdownList.style.display = 'none' // Close the dropdown
    clearFilter()
    window.removeEventListener('click', onClickOutsideDropdown)
}



onLoad();