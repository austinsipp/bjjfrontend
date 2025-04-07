import { useState, useEffect } from "react"


const Signup = () => {
    const [signupData, setSignupData] = useState({
        email: '',
        confirm: '',
        password: ''
    })/*need 3 fields to sign up, your email, a password, and confirmation you typed your email properly*/

    const [errorMessage, setErrorMessage] = useState("no error")/*store the error message if there is one or "no error" until there is one*/

    useEffect(() => {checkMatch()} ,[signupData])/*checks whether the new passwords match every time anything changes in the form*/
    
    const checkMatch = () => {/*just checks whether emails were typed correctly twice*/
        if (signupData.email === signupData.confirm) {
            setErrorMessage("no error")
        } else {
            setErrorMessage("Passwords must match")
        }
    }

    const onSubmitEmailPress = async (event) => {
        event.preventDefault()/*prevents the page reload when a submit button is clicked*/
        checkMatch()/*check that the passwords match one final time*/
        if (errorMessage === "no error") {/*only submit if the final check is passed*/
            
            console.log(signupData)
            const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/signup`, {
                /*credentials: 'include',*//*no credentials for a new signup*/
                method: 'POST',
                body: JSON.stringify(signupData), 
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
                <label htmlFor="email">Please enter your email address:</label>
                <input type="text" id="email" required onChange={(e) => {
                    setSignupData({ ...signupData, email: e.target.value })
                }} />
                <label htmlFor="confirmEmail">Confirm Email:</label>
                <input type="text" id="confirmEmail" required onChange={(e) => {
                    setSignupData({ ...signupData, confirm: e.target.value })
                    checkMatch()
                }} />
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" required onChange={(e) => {
                     setSignupData({ ...signupData, password: e.target.value })
                     checkMatch()
                    
                }} />
                <button id="changePasswordSubmit" onClick={onSubmitEmailPress}>Create Account</button>
            </form>
            {errorMessage !== "no error" ?
                <div>Email addresses must be valid and must match before submitting</div>
                :
                <></>
            }
        </div>

    )
}

export default Signup;