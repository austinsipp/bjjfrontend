import { useContext, useState } from 'react'

import { CurrentUser } from '../contexts/CurrentUser';


/*Add player is intended for parent users who are recording stats. 
They need a way to reference certain players to record stats for them. 
The backend will store for each user the players that they have created 
so that the user can put them in a match and record stats.
This is as opposed to creating full blown student user accounts who an admin or 
gym owner might be able to create.I haven't decided yet if I even want 
to separate users and players. I want any paying user to be able to 
record match stats for any player theyve created. It gets a bit hairier 
with gym-owner or admins, because I want them to be able to create 
players that other users can record stats for, whereas parents 
must create every player they want to reference themselves*/

const AddPlayer = (passdownFunctionReceived) => {
    /*passed down function is the refreshPlayerList function, which 
    updates the dropdown list. Once a player is added, I want the 
    dropdown to refresh immediately, which is why we need it in this component as well*/
    const { passdownFunction } = passdownFunctionReceived
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)
    
    const [addPlayerClick, setAddPlayerClick] = useState(false);/*initially, the form is not visible, because the user might not need to add a player. addPlayerClick controls whether the form is displayed*/
    const [addedPlayer, setAddedPlayer] = useState({ player_name: '', player_school: '', player_belt: ''})/*store user input from the form*/
    const [addPlayerSubmitted, setAddPlayerSubmitted] = useState(false);/*flags whether a new player has been submitted. If it has, we want the form to disappear*/
    const [addPlayerSuccess, setAddPlayerSuccess] = useState(false);/*flags whether the submitted form has received a successful response from the API. When True it will let the user know that their player was successfully created in the backend*/
    const [addPlayerErrorMessage, setAddPlayerErrorMessage] = useState('')/*gives the user the erro message from the server if there is one*/

    const onSubmitClick = async () => {
        setAddPlayerSubmitted(true)
        setAddPlayerClick(false)
        const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/players/add`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(addedPlayer), 
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )

        //get the json response
        const json = await response.json()
        if (response.ok) {
            console.log(json)
            passdownFunction()
            setAddPlayerSuccess(true)
            setAddPlayerErrorMessage('')
            
        } else {
            /*setMessageDisplayed('There was an error, please try again!')*/
            console.log(json)
            setAddPlayerErrorMessage(json.error)/*the server defines a handful of errors with helpful messages but even if it isn't a designed message the backend will still pass what it has to display to the user. Eventually we don't want this because lay-users don't need anything but the pre-set messages*/
            setAddPlayerSuccess(false)
        }
        
    }


    const handleFormSubmitted = () => {
        if (addPlayerSubmitted && !addPlayerSuccess && addPlayerErrorMessage === '') {/*new player submitted but request not returned yet*/ 
            return <div>Processing...</div>
        } else if (addPlayerSubmitted && addPlayerSuccess) {/*new player submitted and aded successfully*/
            return <div>Player added!</div>
        } else if (addPlayerSubmitted && !addPlayerSuccess && addPlayerErrorMessage !== '') {/*Display error Message*/
            return <div>Request unsuccessful, try again! ERROR: {JSON.stringify(addPlayerErrorMessage)}</div>
        }
    }




    const addPlayerForm = () => {
        if (!addPlayerClick) {
            return <div className="addPlayer">
            <button id="userAddPlayer" onClick={(e) => { setAddPlayerClick(true) }}>Add Player</button>
        </div>
        } else if (addPlayerClick) {
            return <div className="addPlayerClicked">
            <form id="inputForm">
                <label for="newPlayerName">Player Name:</label>
                <input type="text" id="newPlayerName" required onChange={(e) => {
                    setAddedPlayer({...addedPlayer, player_name: e.target.value})
                }}></input>
                <label for="newPlayerSchool">School:</label>
                <input type="text" id="newPlayerSchool" required onChange={(e) => {
                    setAddedPlayer({...addedPlayer, player_school: e.target.value})
                }}></input>
                <label for="newPlayerBelt">Belt:</label>
                <input type="text" id="newPlayerBelt" required onChange={(e) => {
                    setAddedPlayer({...addedPlayer, player_belt: e.target.value})
                }}></input>
            </form>
            <button id="userAddPlayerSubmit" onClick={onSubmitClick}>Submit</button>
        </div>
        } 
        

    }

    return <div className="addPlayer">

        {addPlayerForm()}
        {handleFormSubmitted()}

    </div>
}


export default AddPlayer;