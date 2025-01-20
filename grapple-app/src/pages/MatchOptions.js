import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react'
import { Link } from "react-router-dom";

import { CurrentUser } from '../contexts/CurrentUser';



const MatchOptions = () => {
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)
    const [leftPlayerName, setLeftPlayerName] = useState('');
    const [rightPlayerName, setRightPlayerName] = useState('');

    const createOfficialMatchClick = (event) => {
        createMatch(event, 'official')
    }

    const createMatch = async (event, matchType) => {
        event.preventDefault()
        console.log({matchType, leftPlayerName, rightPlayerName})
        const response = await fetch('http://localhost:5000/matches/add', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({matchType, leftPlayerName, rightPlayerName}), //make the object json 
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        //get the json response
        const json = await response.json()
        if (response.ok) {
            console.log('API response:', json)
            debugger
            sessionStorage.setItem('MatchID', JSON.stringify(json))
            /*After the API call, navigate to the stat taking page*/
            window.location.href = event.target.href;  // Use the href attribute of the clicked link
            console.log('API response:', json)
        } else {
            console.log('There was an error creating a new match. Please try again.')
        }


    }

    const roleSwitch = () => {
        if (currentUser.roles.includes('Admin') || currentUser.roles.includes('Official')) {
            return <div className="matchInputs">
                <form id="inputForm">
                    <label for="leftPlayerName">Player Name:</label>
                    <input type="text" id="leftPlayerName" required onChange={(e) => {
                    setLeftPlayerName(e.target.value)
                }}></input>
                    <br></br>
                    <label for="rightPlayerName">Opponent Name:</label>
                    <input type="text" id="rightPlayerName" required onChange={(e) => {
                    setRightPlayerName(e.target.value)
                }}></input>
                </form>
                <div className="navbarmatchtype">
                    <a href="/officialmatch.html" onClick={createOfficialMatchClick}>Official Match</a>
                    <a href="/competitivematch.html">Competitive Match</a>
                    <a href="/practicematch.html">Practice Match</a>
                </div>
            </div>
        } else {
            return <div className="navbarmatchtype">
                <a href="/competitivematch.html">Competitive Match</a>
                <a href="/practicematch.html">Practice Match</a>
            </div>
        }
    }



    return <div className="pages">

        {roleSwitch()}

    </div>

}

export default MatchOptions;