import { createContext, useState, useEffect } from "react";


export const CurrentUser = createContext()

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)/*define a state variable to store the current user info*/

    /*useEffect runs this function, hitting the authentication/profile route to check if the session
    from the browser cookie represents a valid session/user, and if it does, passes that user's
    information down to the provider children components*/
    useEffect( ()=> {
        const getLoggedInUser = async () => {
            console.log('getting current user first notice')
            let response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/profile`, {
                credentials: 'include'/*this flag is to send the session cookie as well to be checked for validity*/
            })
            console.log('getting current user')
            console.log(await response)
            let user = await response.json()
            console.log("current user is being set as",user)
            
            setCurrentUser(user)
        }
        getLoggedInUser()
    },[])
    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider