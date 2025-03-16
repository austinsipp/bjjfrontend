/*get match id from session storage*/

const match_id = sessionStorage.getItem('MatchID');


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
var leftAggressionPts = 0;
var rightAggressionPts = 0;




function clearPress() {
    document.getElementById("leftDomination").style.background = "linear-gradient(45deg, #00ddeb, #007bff)";
    document.getElementById("leftAdvantage").style.background = "linear-gradient(45deg, #00ddeb, #007bff)";
    document.getElementById("neutralPosition").style.background = "linear-gradient(45deg, #ffffff, #d0d0d0)";
    document.getElementById("rightDomination").style.background = "linear-gradient(45deg, #ff2e63, #ff007a)";
    document.getElementById("rightAdvantage").style.background = "linear-gradient(45deg, #ff2e63, #ff007a)";
    const dropdowns = document.querySelectorAll('.dropdown-list');
    dropdowns.forEach(function (dropdown) {
        dropdown.style.display = 'none';
    });

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
            document.getElementById("leftDomination").style.background = "linear-gradient(45deg, #006B70, #003D80)";
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
            document.getElementById("leftAdvantage").style.background = "linear-gradient(45deg, #006B70, #003D80)";
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
        case 'leftAggression':
            leftAggressionpts++;
            event_list.push({
                event_type: 'aggression',
                event_desc: '',
                match_time: matchSec,
                points_awarded: 0,
                player: 'left'
            })
            break
        case 'rightDom':
            clearPress();
            rightDom = true;
            leftDom = false;
            rightAdv = false;
            leftAdv = false;
            document.getElementById("rightDomination").style.background = "linear-gradient(45deg, #80162F, #80003A)";
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
            document.getElementById("rightAdvantage").style.background = "linear-gradient(45deg, #80162F, #80003A)";
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
        case 'rightAggression':
            leftAggressionpts++;
            event_list.push({
                event_type: 'aggression',
                event_desc: '',
                match_time: matchSec,
                points_awarded: 0,
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
            document.getElementById("neutralPosition").style.background = "linear-gradient(45deg, #B3B3B3, #8F8F8F)";
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
    window.addEventListener('click', onClickOutsideDropdown, { capture: true/*, once: true*/ })
    /*the once: true flag automatically removes the event listener after the first execution. 
    This is good because I don't want it to persist because the capture flag on this one stops 
    all other actions in a sense. The capture flag is important here because the default 
    behavior is that when something is clicked, the element (in our problematic cases this 
    would be a button) the event on that element gets executed and then it propagates to the 
    window (where I am adding this event listener). But this isnt what I want, because I want 
    the window event listener to execute first and then stop the propagation to the element's 
    actions. This is what the capture flag does, force it to execute first, and in the function 
    I have stop propagation, so it doesnt get to the element action*/

}

function clearFilter() {
    userInput.value = ''
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        item.style.display = 'block'
    }
}

function onClickOutsideDropdown(event) {
    console.log("button pressed", buttonPressed)
    console.log(event.target)

    let stopProp = true

    clearFilter()
    switch (buttonPressed) {
        case 'leftDom':
            if (event.target.closest('#left-dom-dropdown')) {
                dropdownList.style.display = 'none';
                stopProp = false
            }
            break
        case 'leftAdv':
            if (event.target.closest('#left-adv-dropdown')) {
                dropdownList.style.display = 'none';
                stopProp = false
            }
            break
        case 'leftSub':
            if (event.target.closest('#left-sub-dropdown')) {
                dropdownList.style.display = 'none';
                stopProp = false
            }
            break
        case 'rightDom':
            if (event.target.closest('#right-dom-dropdown')) {
                dropdownList.style.display = 'none';
                stopProp = false
            }
            break
        case 'rightAdv':
            if (event.target.closest('#right-adv-dropdown')) {
                dropdownList.style.display = 'none';
                stopProp = false
            }
            break
        case 'rightSub':
            if (event.target.closest('#right-sub-dropdown')) {
                dropdownList.style.display = 'none';
                stopProp = false
            }
            break


    }
    console.log("stopping Propagation:", stopProp)
    if (stopProp) {
        event.stopPropagation()/*this is to stop the propagation of the event from the window event 
        listener to the button pressed. If I don't have this and someone clicks on a button outside 
        of a visible dropdown, then that button's action will execute, but I don't want that. If 
        they click outside of the dropdown then I want the dropdown to disappear. The event listener 
        only runs once and is automatically removed to basically reset back to normal when no dropdown 
        is visible*/
    }

    /*if (!event.target.closest('.dropdown-container')) {
        dropdownList.style.display = 'none';
    }*/
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
    window.removeEventListener('click', onClickOutsideDropdown, { capture: true/*, once: true*/ })
    event_list.push({ ...current_event, event_desc: item }) /*add the name of the position or submission to the current event object and then push it to the events list*/
}

const submitResults = async () => {
    console.log("json body:", { match_id, event_list })
    const response = await fetch('http://localhost:5000/matchdata/add', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ match_id, event_list }), //make the object json 
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    const json = await response.json()
    if (response.ok) {
        console.log(json)
        window.location.href = json.redirectTo
    } else {
        /*setMessageDisplayed('There was an error, please try again!')*/
        console.log(json)
    }
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