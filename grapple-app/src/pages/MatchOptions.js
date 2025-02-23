import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import { CurrentUser } from '../contexts/CurrentUser';
import AddPlayer from './AddPlayer';



const MatchOptions = () => {
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)
    const [leftPlayerID, setLeftPlayerID] = useState('');
    const [rightPlayerID, setRightPlayerID] = useState('');
    const [retrievingPlayers, setRetrievingPlayers] = useState(true);
    const [existingPlayers, setExistingPlayers] = useState([])
    const [trigger, setTrigger] = useState(false);
    const [matchType, setMatchType] = useState('practice');
    const [ruleSet, setRuleSet] = useState('GrappleStats Control');






    const createOfficialMatchClick = (event) => {
        createMatch(event, matchType, ruleSet)
    }

    const createMatch = async (event, matchType, ruleSet) => {
        event.preventDefault()
        console.log("match options:",{ ruleSet, matchType, leftPlayerID, rightPlayerID })
        const response = await fetch('http://localhost:5000/matches/add', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ ruleSet, matchType, leftPlayerID, rightPlayerID }), //make the object json 
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
            window.location.href = './officialmatch.html';  
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
        if (response.ok ) {
            console.log('API response:', json)
            console.log('API response length:', json.length)
            setExistingPlayers(json)
            /*console.log("example player id:",json[0].player_id)*//*this will error out if the user hasnt created any players yet, so make sure there are players before using this for testing*/
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
                        setLeftPlayerID(e.target.value)
                    }}>
                        {existingPlayers.map((element) => {
                            return <option value={element.player_id.toString()}>{element.player_name + ' ' + element.player_school}</option>
                        })
                        }
                    </select>
                    <br></br>
                    <label for="rightPlayerName">Opponent Name:</label>
                    <select type="text" id="rightPlayerName" required onChange={(e) => {
                        setRightPlayerID(e.target.value)
                    }}>
                        {existingPlayers.map((element) => {
                            return <option value={element.player_id.toString()}>{element.player_name + ' ' + element.player_school}</option>
                        })
                        }
                    </select>
                </form>
                {<AddPlayer passdownFunction={refreshPlayerList} />}
                <div className="navbarmatchtype">
                <form id="inputForm">
                    <label for="matchTypeField">Match Type:</label>
                    <select type="text" id="matchTypeField" required onChange={(e) => {
                        setMatchType(e.target.value)
                    }}>
                        <option value="official">Official Match</option>
                        <option value="practice">Practice Match</option>
                        <option value="competitive">Competitive Match</option>
                    </select>
                </form>
                <form id="inputForm">
                    <label for="ruleSetField">Rule Set:</label>
                    <select type="text" id="ruleSetField" required onChange={(e) => {
                        setRuleSet(e.target.value)
                    }}>
                        <option value="IBJJF">IBJJF</option>
                        <option value="ADCC">ADCC</option>
                        <option value="GrappleStats Control">GrappleStats Control</option>
                    </select>
                </form>
                <button id="matchCreateSubmit" onClick={createOfficialMatchClick}>Create Match</button>
                </div>
            </div>
        } else {
            return <div className="navbarmatchtype">
                <div>This is still under construction!</div>
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