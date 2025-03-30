import { useContext, useState, useEffect, /*useRef*/ } from 'react'

import { CurrentUser } from '../contexts/CurrentUser';

const ChangePassword = () => {
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)

    const [pwChangeData, setpwChangeData] = useState({
        current: '',
        new: '',
        confirm: ''
    })/*need 3 fields to change your password, your current password, and matching new passwords*/


    const [errorMessage, setErrorMessage] = useState("no error")/*store the error message if there is one or "no error" until there is one*/

    const checkMatch = () => {/*just checks whether the new passwords were typed correctly twice*/
        if (pwChangeData.new === pwChangeData.confirm) {
            setErrorMessage("no error")
        } else {
            setErrorMessage("Passwords must match")
        }
    }

    useEffect(() => {checkMatch()} ,[pwChangeData])/*checks whether the new passwords match every time anything changes in the form*/

    const onSubmitClick = async (event) => {
        event.preventDefault()/*prevents the page reload when a submit button is clicked*/
        checkMatch()/*check that the passwords match one final time*/
        if (errorMessage === null) {/*only submit if the final check is passed*/
            
            console.log(pwChangeData)
            const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/changepassword`, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(pwChangeData), 
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
                console.log('Error:', json.error)/*backend has some helpful error messages and eventually we only want preset ones here, but it currently sends the error message no matter what it is*/
            }
        }
    }





    return (/*can implement password rules in the future here*/
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