import { useContext, useState } from "react"
//import { redirect } from "react-router"
import { useNavigate } from 'react-router-dom'
import { CurrentUser } from "../contexts/CurrentUser"

function Logout() {

    const { currentUser, setCurrentUser } = useContext(CurrentUser)

    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate();

    /*
    the mechanism by which the user logs out is that this route is hit, and
    the record in the sessions table in the backend get flagged as no longer
    an active session. This makes all the other areas where the credentials
    are being checked show as invalid. This is how the log out works. If we 
    didn't have this backed Sessions table tracking whether there was a
    valid session, the only way for a user to log out would be to wait for 
    their cookie to expire, which is not ideal.
    */
    async function handleSubmit(e) {
        e.preventDefault()
        console.log("logging out of ",currentUser)
        const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }//,
            //body: JSON.stringify(credentials)
        })
        const data = await response.json()
        if (response.status === 200) {
            setCurrentUser(null)/*set sthe current user to null, but really the invalid session from the backend is what stops the user from being able to do anything*/
            //redirect('/')
            navigate('/')/*on logout, navigate back to /. This makes it so that if a user logs right back in, they are at the / path, rather than where they left off, which is what I want for now*/

            /*useEffect(() => {
              navigate('/');  // Redirects to the homepage
            }, [navigate]);*/
        } else {
            setErrorMessage(data.message)/*there really shouldnt ever be an error logging out, only got here during testing once and never again, havent had issues*/
        }

    }

    return (
        <div>
            <h1>Are you sure you want to Logout?</h1>
            {errorMessage !== null
                ? (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )
                : null
            }
            <form onSubmit={handleSubmit}>
                <input className="btn btn-primary" type="submit" value="Logout" />
            </form>
        </div>
    )
}

export default Logout