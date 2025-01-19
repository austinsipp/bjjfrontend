/*This section is about scoring only*/

var ptsPerSecAdv = 1;
var ptsPerSecDom = 2;
var ptsPerSweep = 40;
var ptsPerSub = 240;
var victoryAtPts = 360


var event_list = []
var current_event



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
            let victor = 'right'
            let victorPoints = rightPoints
            let loserPoints = leftPoints
            if (leftPoints > rightPoints) {
                victor = 'left'
                victorPoints = leftPoints
                loserPoints = rightPoints
            }
            event_list.push({
                event_type: 'victory',
                event_desc: '',
                match_time: matchSec,
                player: victor,
                winningScore: victorPoints,
                losingScore: loserPoints
            })
            console.log(event_list)
        }
    }, 100);
}


/*This section is about managing the dropdowns and text inputs available to the user for various positions and sweeps*/


let dropdownList
let buttonPressed
let userInput
let items
let dropdownBtn



function onButtonPress(buttonName) {
    switch (buttonName) {
        case 'leftDom':
            clearPress();
            rightDom = false;
            leftDom = true;
            rightAdv = false;
            leftAdv = false;
            document.getElementById("leftDomination").style.background = "#4696FF";
            current_event = {
                event_type: 'dom position reached',
                event_desc: '',
                match_time: matchSec,
                points_awarded: 0,
                player: 'left'
            }
            dropdownList = document.getElementById('left-dom-dropdown-list')
            userInput = document.getElementById('left-dom-dropdown-input')
            dropdownBtn = document.getElementById('leftDomination')
            buttonPressed = buttonName
            break
        case 'leftAdv':
            clearPress();
            rightDom = false;
            leftDom = false;
            rightAdv = false;
            leftAdv = true;
            document.getElementById("leftAdvantage").style.background = "#4696FF";
            current_event = {
                event_type: 'adv position reached',
                event_desc: '',
                match_time: matchSec,
                points_awarded: 0,
                player: 'left'
            }
            dropdownList = document.getElementById('left-adv-dropdown-list')
            userInput = document.getElementById('left-adv-dropdown-input')
            dropdownBtn = document.getElementById('leftAdvantage')
            buttonPressed = buttonName
            break
        case 'leftSub':
            rightDom = false;
            leftDom = false;
            rightAdv = false;
            leftAdv = false;
            pause = true;
            resetButtonText()
            clearPress();
            document.getElementById('leftScore').innerHTML = leftPoints.toFixed(1);
            current_event = {
                event_type: 'submission',
                event_desc: '',
                match_time: matchSec,
                points_awarded: ptsPerSub,
                player: 'left'
            }
            dropdownList = document.getElementById('left-sub-dropdown-list')
            userInput = document.getElementById('left-sub-dropdown-input')
            dropdownBtn = document.getElementById('leftSubmission')
            buttonPressed = buttonName
            break
        case 'leftSweep':
            leftSweepCount++;
            leftPoints = leftPoints + ptsPerSweep;
            rightDom = false;
            leftDom = false;
            rightAdv = false;
            leftAdv = false;
            resetButtonText()
            clearPress();
            document.getElementById('leftScore').innerHTML = leftPoints.toFixed(1);
            event_list.push({
                event_type: 'sweep',
                event_desc: '',
                match_time: matchSec,
                points_awarded: ptsPerSweep,
                player: 'left'
            })
            break
        case 'rightDom':
            clearPress();
            rightDom = true;
            leftDom = false;
            rightAdv = false;
            leftAdv = false;
            document.getElementById("rightDomination").style.background = "#4696FF";
            current_event = {
                event_type: 'dom position reached',
                event_desc: '',
                match_time: matchSec,
                points_awarded: 0,
                player: 'right'
            }
            dropdownList = document.getElementById('right-dom-dropdown-list')
            userInput = document.getElementById('right-dom-dropdown-input')
            dropdownBtn = document.getElementById('rightDomination')
            buttonPressed = buttonName
            break
        case 'rightAdv':
            clearPress();
            rightDom = false;
            leftDom = false;
            rightAdv = true;
            leftAdv = false;
            document.getElementById("rightAdvantage").style.background = "#4696FF";
            current_event = {
                event_type: 'adv position reached',
                event_desc: '',
                match_time: matchSec,
                points_awarded: 0,
                player: 'right'
            }
            dropdownList = document.getElementById('right-adv-dropdown-list')
            userInput = document.getElementById('right-adv-dropdown-input')
            dropdownBtn = document.getElementById('rightAdvantage')
            buttonPressed = buttonName
            break
        case 'rightSub':
            rightDom = false;
            leftDom = false;
            rightAdv = false;
            leftAdv = false;
            pause = true;
            resetButtonText()
            clearPress();
            current_event = {
                event_type: 'submission',
                event_desc: '',
                match_time: matchSec,
                points_awarded: ptsPerSub,
                player: 'right'
            }
            dropdownList = document.getElementById('right-sub-dropdown-list')
            userInput = document.getElementById('right-sub-dropdown-input')
            dropdownBtn = document.getElementById('rightSubmission')
            buttonPressed = buttonName
            break
        case 'rightSweep':
            rightSweepCount++;
            rightPoints = rightPoints + ptsPerSweep;
            rightDom = false;
            leftDom = false;
            rightAdv = false;
            leftAdv = false;
            resetButtonText()
            clearPress();
            document.getElementById('rightScore').innerHTML = rightPoints.toFixed(1);
            event_list.push({
                event_type: 'sweep',
                event_desc: '',
                match_time: matchSec,
                points_awarded: ptsPerSweep,
                player: 'right'
            })
            break
        case 'pause':
            pause = true;
            event_list.push({
                event_type: 'pause',
                event_desc: '',
                match_time: matchSec,
                points_awarded: 0
            })
            break
        case 'start':
            pause = false;
            event_list.push({
                event_type: 'start match',
                event_desc: '',
                match_time: matchSec,
                points_awarded: 0
            })
            break
        case 'neutral':
            clearPress();
            rightDom = false;
            leftDom = false;
            rightAdv = false;
            leftAdv = false;
            resetButtonText()
            document.getElementById("neutralPosition").style.background = "#4696FF";
            event_list.push({
                event_type: 'neutral position reached',
                event_desc: '',
                match_time: matchSec,
                points_awarded: 0
            })
            break
    }
    if (['leftDom', 'leftAdv', 'leftSub', 'rightDom', 'rightAdv', 'rightSub'].includes(buttonName)) {
        items = dropdownList.getElementsByClassName('dropdown-item')
        toggleDropdown()
    }
}

function toggleDropdown() {
    dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block'
    userInput.focus() // Automatically focus on the input field for immediate typing
    if (!buttonPressed.includes('Sub')) {/*we don't want them to be able to click away for submissions*/
        window.addEventListener('click', onClickOutsideDropdown)
    }
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

function resetButtonText() {
    document.getElementById('leftDomination').textContent = "Dom Position"
    document.getElementById('leftAdvantage').textContent = "Advantage"
    document.getElementById('leftSubmission').textContent = "Submission"
    document.getElementById('rightDomination').textContent = "Dom Position"
    document.getElementById('rightAdvantage').textContent = "Advantage"
    document.getElementById('rightSubmission').textContent = "Submission"
}

// Update button text when an item is selected
function selectItem(item) {
    resetButtonText()
    if (!buttonPressed.includes('Sub')) {/*for submissions we dont want to change the button text*/
        dropdownBtn.textContent = item
    }
    dropdownList.style.display = 'none' // Close the dropdown
    if (buttonPressed == 'leftSub') {
        leftSubCount++;
        leftPoints = leftPoints + ptsPerSub;
        document.getElementById('leftScore').innerHTML = leftPoints.toFixed(1);
    }
    if (buttonPressed == 'rightSub') {
        rightSubCount++;
        rightPoints = rightPoints + ptsPerSub;
        document.getElementById('rightScore').innerHTML = rightPoints.toFixed(1);
    }
    clearFilter()
    window.removeEventListener('click', onClickOutsideDropdown)
    event_list.push({ ...current_event, event_desc: item }) /*add the name of the position or submission to the current event object and then push it to the events list*/
}

function submitResults() {
    
}


let startButton = document.querySelector('#start').addEventListener('click', () => { onButtonPress('start') })
let pauseButton = document.querySelector('#pause').addEventListener('click', () => { onButtonPress('pause') })
let neutralButton = document.querySelector('#neutralPosition').addEventListener('click', () => { onButtonPress('neutral') })

let leftSweepButton = document.querySelector('#leftSweep').addEventListener('click', () => { onButtonPress('leftSweep') })
let rightSweepButton = document.querySelector('#rightSweep').addEventListener('click', () => { onButtonPress('rightSweep') })

let rightDomButton = document.querySelector('#rightDomination').addEventListener('click', () => { onButtonPress('rightDom') })
let leftDomButton = document.querySelector('#leftDomination').addEventListener('click', () => { onButtonPress('leftDom') })
let rightAdvButton = document.querySelector('#rightAdvantage').addEventListener('click', () => { onButtonPress('rightAdv') })
let leftAdvButton = document.querySelector('#leftAdvantage').addEventListener('click', () => { onButtonPress('leftAdv') })
let leftSubButton = document.querySelector('#leftSubmission').addEventListener('click', () => { onButtonPress('leftSub') })
let rightSubButton = document.querySelector('#rightSubmission').addEventListener('click', () => { onButtonPress('rightSub') })

let dropdowns = document.querySelectorAll('.dropdown-input');

// Loop through each input and add the event listener
dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('keyup', filterDropdown);
});

let submitButton = document.querySelector('#submit-button').addEventListener('click', () => { submitResults() })

onLoad();