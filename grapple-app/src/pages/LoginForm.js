import { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { CurrentUser } from "../contexts/CurrentUser"

function LoginForm({fullPageSetter}) {

    const { setCurrentUser } = useContext(CurrentUser)

    /*const location = useLocation()

    const fullPageDisplay = ['/forgotpassword', '/signup'].includes(location.pathname)

    console.log("fullPageDisplay" ,fullPageDisplay)
    console.log("location" ,location)

    fullPageSetter(fullPageDisplay)*/

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })/*need a place to store these for submission to the server*/

    const [errorMessage, setErrorMessage] = useState(null)

    /*
    when user submits username and password, this route checks it against the database and creates a 
    cookie session, and a backend record in the session table. 
    */
    async function handleSubmit(e) {
        e.preventDefault()/*prevent a full page reload on a submit button click*/
        const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()
        if (response.status === 200) {
            setCurrentUser(data.user)/*once this is set in the context, then this component will disappear because the homepage will have a current user. This is only displayed when there is no current user*/
        } else {
            setErrorMessage(data.message)/*display error message if the server sends one*/
        }

    }

    return (

        <main className="loginPageParent">
            <div className="loginPage">
                <h1>Welcome to GrappleStats!</h1>
                {errorMessage !== null
                    ? (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )
                    : null
                }
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-6 form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                required
                                value={credentials.username}
                                onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                                className="form-control"
                                id="username"
                                name="username"
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                required
                                value={credentials.password}
                                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                className="form-control"
                                id="password"
                                name="password"
                            />
                        </div>
                    </div>
                    <input className="btn btn-primary logonButton" type="submit" value="Login" />
                </form>
                <Link to="/signup"><h3>Don't have an account? Sign up!</h3></Link>
                <Link to="/forgotpassword"><h3>Forgot Password</h3></Link>
            </div>
        </main>


    )
}

export default LoginForm