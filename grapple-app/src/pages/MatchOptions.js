import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import { CurrentUser } from '../contexts/CurrentUser';
import AddPlayer from './AddPlayer';



const MatchOptions = () => {
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)
    const [leftPlayerName, setLeftPlayerName] = useState('');
    const [rightPlayerName, setRightPlayerName] = useState('');
    const [retrievingPlayers, setRetrievingPlayers] = useState(true);
    const [existingPlayers, setExistingPlayers] = useState([])
    const [trigger, setTrigger] = useState(false);






    const createOfficialMatchClick = (event) => {
        createMatch(event, 'official')
    }

    const createMatch = async (event, matchType) => {
        event.preventDefault()
        console.log({ matchType, leftPlayerName, rightPlayerName })
        const response = await fetch('http://localhost:5000/matches/add', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ matchType, leftPlayerName, rightPlayerName }), //make the object json 
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        //get the json response
        const json = await response.json()
        if (response.ok) {
            console.log('API response:', json)
            sessionStorage.setItem('MatchID', JSON.stringify(json))
            /*After the API call, navigate to the stat taking page*/
            window.location.href = event.target.href;  // Use the href attribute of the clicked link
            console.log('API response:', json)
        } else {
            console.log('There was an error creating a new match. Please try again.')
        }


    }

    const refreshPlayerList = () => {
        // Toggle the trigger to force re-run of useEffect
        setTrigger(!trigger);
      };



    

    const getPlayerList = async () => {
        const response = await fetch('http://localhost:5000/players/retrievePlayers', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        //get the json response
        const json = await response.json()
        if (response.ok) {
            console.log('API response:', json)
            setExistingPlayers(json)
            setRetrievingPlayers(false)

        } else {
            console.log('There was an error retrieving players. Please try again.')
        }
    }

    useEffect(() => {
        getPlayerList();
    }, [trigger]);

    const roleSwitch = () => {
        if (currentUser.roles.includes('Admin') || currentUser.roles.includes('Official') || currentUser.roles.includes('Parent')) {
            return <div className="matchInputs">
                <form id="inputForm">
                    <label for="leftPlayerName">Player Name:</label>
                    <select type="text" id="leftPlayerName" required onChange={(e) => {
                        setLeftPlayerName(e.target.value)
                    }}>
                        {existingPlayers.map((element) => {
                            return <option value={element.player_name + ' ' + element.player_school}>{element.player_name + ' ' + element.player_school}</option>
                        })
                        }
                    </select>
                    <br></br>
                    <label for="rightPlayerName">Opponent Name:</label>
                    <select type="text" id="rightPlayerName" required onChange={(e) => {
                        setRightPlayerName(e.target.value)
                    }}>
                        {existingPlayers.map((element) => {
                            return <option value={element.player_name + ' ' + element.player_school}>{element.player_name + ' ' + element.player_school}</option>
                        })
                        }
                    </select>
                </form>
                {<AddPlayer passdownFunction={refreshPlayerList} />}
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
        {retrievingPlayers ? <div>Loading...</div>
            : <div>
                {roleSwitch()}
            </div>
        }
    </div>

}

export default MatchOptions;