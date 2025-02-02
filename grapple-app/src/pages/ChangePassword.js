import { useContext, useState, useEffect, /*useRef*/ } from 'react'

import { CurrentUser } from '../contexts/CurrentUser';

const ChangePassword = () => {
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)

    const [pwChangeData, setpwChangeData] = useState({
        current: '',
        new: '',
        confirm: ''
    })


    const [errorMessage, setErrorMessage] = useState("no error")

    const checkMatch = () => {
        if (pwChangeData.new === pwChangeData.confirm) {
            setErrorMessage("no error")
        } else {
            setErrorMessage("Passwords must match")
        }
    }

    useEffect(() => {checkMatch()} ,[pwChangeData])

    const onSubmitClick = async (event) => {
        event.preventDefault()
        checkMatch()
        if (errorMessage === null) {
            
            console.log(pwChangeData)
            const response = await fetch('http://localhost:5000/changepassword', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(pwChangeData), //make the object json 
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            //get the json response
            const json = await response.json()
            if (response.ok) {
                console.log('API response:', json)

            } else {
                console.log('Error:', json.error)
            }
        }
    }





    return (
        <div>
            <form id="inputForm">
                <label htmlFor="currentPassword">Current Password</label>
                <input type="text" id="currentPassword" required onChange={(e) => {
                    setpwChangeData({ ...pwChangeData, current: e.target.value })
                }} />
                <label htmlFor="newPassword">New Password</label>
                <input type="text" id="newPassword" required onChange={(e) => {
                    setpwChangeData({ ...pwChangeData, new: e.target.value })
                    checkMatch()
                }} />
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input type="text" id="confirmPassword" required onChange={(e) => {
                     setpwChangeData({ ...pwChangeData, confirm: e.target.value })
                     checkMatch()
                    
                }} />
                <button id="changePasswordSubmit" onClick={onSubmitClick}>Submit</button>
            </form>
            {errorMessage !== "no error" ?
                <div>Passwords must match before submitting</div>
                :
                <></>
            }
        </div>

    )
}

export default ChangePassword;