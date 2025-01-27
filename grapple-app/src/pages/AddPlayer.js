import { useContext, useState } from 'react'

import { CurrentUser } from '../contexts/CurrentUser';

const AddPlayer = (passdownFunctionReceived) => {
    const { passdownFunction } = passdownFunctionReceived
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)
    
    const [addPlayerClick, setAddPlayerClick] = useState(false);
    const [addedPlayer, setAddedPlayer] = useState({ player_name: '', player_school: '', player_belt: ''})/*declare state variable to store user input from the form*/
    const [addPlayerSubmitted, setAddPlayerSubmitted] = useState(false);
    const [addPlayerSuccess, setAddPlayerSuccess] = useState(false);
    const [addPlayerErrorMessage, setAddPlayerErrorMessage] = useState('')

    const onSubmitClick = async () => {
        setAddPlayerSubmitted(true)
        setAddPlayerClick(false)
        const response = await fetch('http://localhost:5000/players/add', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(addedPlayer), //make the object json 
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
            setAddPlayerErrorMessage(json.error)
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