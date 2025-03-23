import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import { CurrentUser } from '../contexts/CurrentUser';
import AddPlayer from './AddPlayer';


/*allows user to set the options for the match before 
navigating to the match page. We really want these 
settings before we even get there so we can just focus 
on the stat taking portion once we get to the match page*/
const MatchOptions = () => {
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)
    const [leftPlayerID, setLeftPlayerID] = useState('');/*the id of the player on the left in the match*/
    const [rightPlayerID, setRightPlayerID] = useState('');/*the id of the player on the right in the match*/
    const [retrievingPlayers, setRetrievingPlayers] = useState(true);/*starts as true and then once it becomes false it basically stays that way. Allows the page to display loading until we have received the list of players for the dropdown*/
    const [existingPlayers, setExistingPlayers] = useState([])/*the list of players that the user has created in the database. Currently players can only take stats for players that they have created, so we need to get this from the server*/
    const [trigger, setTrigger] = useState(false);/*is used simply to trigger a useEffect function that refreshes the player list. Once a player is created we want to run the useEffect function again and so the use effect function is subscribed to this variable in order to trigger whenever this variable changes*/
    const [matchType, setMatchType] = useState('practice');/*type of match. I have options here because users might want to record how cut-throat they are being for the match*/
    const [ruleSet, setRuleSet] = useState('GrappleStats Control');/*user can show what ruleset they are using, if any. Eventually this should feed the amount of points you get for different actions in the match, but currently it doesnt affect the points, just records so that the users can know what rule set they were using during the match*/






    const createOfficialMatchClick = (event) => {
        createMatch(event, matchType, ruleSet)
    }

    const createMatch = async (event, matchType, ruleSet) => {
        event.preventDefault()
        console.log("match options:",{ ruleSet, matchType, leftPlayerID, rightPlayerID })
        const response = await fetch('http://localhost:5000/matches/add', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ ruleSet, matchType, leftPlayerID, rightPlayerID }), /*send all the match options in order to create a match*/ 
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        //get the json response
        const json = await response.json()
        if (response.ok) {
            console.log('API response:', json)
            sessionStorage.setItem('MatchID', JSON.stringify(json))/*we are about to redirect to the stat taking page, so we need to store this in the browser so it is available after we redirect*/
            /*After the API call if it is successful, navigate to the stat taking page*/
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
            setLeftPlayerID(json[0].player_id)
            setRightPlayerID(json[0].player_id)
            setMatchType('official')
            setRuleSet('IBJJF')
            /*console.log("example player id:",json[0].player_id)*//*this will error out if the user hasnt created any players yet, so make sure there are players before using this for testing*/
            setRetrievingPlayers(false)/*only set this to false after successfully receiving the response and setting the existing player list*/

        } else {
            console.log('There was an error retrieving players. Please try again.')
        }
    }

    useEffect(() => {
        getPlayerList();
    }, [trigger]);

    const roleSwitch = () => {/*this only allows certain types of users, as defined by their role, to be able to do this*/
        if (currentUser.roles.includes('Admin') || currentUser.roles.includes('Official') || currentUser.roles.includes('Parent')) {
            return <div className="matchInputs">
                <form id="inputForm">
                    <label for="leftPlayerName">Player Name:</label>
                    <select type="text" id="leftPlayerName" required onChange={(e) => {
                        setLeftPlayerID(e.target.value)
                    }}>
                        {existingPlayers.map((element) => {/*turns the list of existing players the user has already created in the database into a dropdwon list*/
                            return <option value={element.player_id.toString()}>{element.player_name + ' ' + element.player_school}</option>
                        })
                        }
                    </select>
                    <br></br>
                    <label for="rightPlayerName">Opponent Name:</label>
                    <select type="text" id="rightPlayerName" required onChange={(e) => {
                        setRightPlayerID(e.target.value)
                    }}>
                        {existingPlayers.map((element) => {/*turns the list of existing players the user has already created in the database into a dropdwon list*/
                            return <option value={element.player_id.toString()}>{element.player_name + ' ' + element.player_school}</option>
                        })
                        }
                    </select>
                </form>
                {<AddPlayer passdownFunction={refreshPlayerList} />/*need to passdown the refreshPlayerList function because when a player is added, which only happens in this child component, we want the dropdown list to update to include the new player*/}
                <div className="navbarmatchtype">
                <form id="inputForm">
                    <label for="matchTypeField">Match Type:</label>
                    <select type="text" id="matchTypeField" required onChange={(e) => {
                        setMatchType(e.target.value)
                    }}>{/*this field allows the user to input how competitive they 
                    are being. On the stats page they will eventually be able to 
                    filter out friendly matches and include only ones they are 
                    being a certain level of competitive, if they want to look at it that way*/}
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