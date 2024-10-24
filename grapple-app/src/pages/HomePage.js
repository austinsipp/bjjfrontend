import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react'
import { Link } from "react-router-dom";


//pages and components
import { CurrentUser } from '../contexts/CurrentUser';
import LoginForm from './LoginForm';
import Logout from './Logout';
import AddUser from './AddUser';
import MatchOptions from './MatchOptions';



function HomePage() {
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)
    
    /*
    This matches the navbar, not only do we want the navbar to only display the right links to the user,
    we want only certain routes to even be available to each user based on their role. Admins have access
    to the add user tab. We wouldnt want a non-admin to be able to get to that tab by simply typing it in 
    their address bar, so it wasnt enough to simply display only the right links in the navbar, we also
    needed to replicate that logic here, to make only certain routes available to regular users
    */
    const roleSwitchRoutes = () => {
        if (currentUser.roles.includes('Admin')) {
            return <Routes>
                {/*<Route
                    path='/'
                    element={<Navigate to='/schedule' />}
                />
                <Route
                    path='/schedule'
                    element={<Schedule />}
                />}{/*}
                <Route
                    path='/ptoRequest'
                    element={<PTORequest />}
                />*/}
                <Route
                    path='/match'
                    element={<MatchOptions />}
                />
                <Route
                    path='/adduser'
                    element={<AddUser currentUser={currentUser}/>}
                />
                <Route
                    path='/logout'
                    element={<Logout />}
                />
            </Routes>
        } else if (currentUser.roles.includes('Gym Owner')){
            return <Routes>
                {/*<Route
                    path='/'
                    element={<Navigate to='/schedule' />}
                />
                <Route
                    path='/schedule'
                    element={<Schedule />}
                />*/}
                <Route
                    path='/match'
                    element={<MatchOptions />}
                />
                <Route
                    path='/adduser'
                    element={<AddUser currentUser={currentUser}/>}
                />
                <Route
                    path='/logout'
                    element={<Logout />}
                />
            </Routes>
        } else if (currentUser.roles.includes('Parent')) {
            return <Routes>
                {/*<Route
                    path='/'
                    element={<Navigate to='/schedule' />}
                />
                <Route
                    path='/schedule'
                    element={<Schedule />}
                />*/}
                <Route
                    path='/match'
                    element={<MatchOptions />}
                />
                <Route
                    path='/adduser'
                    element={<AddUser currentUser={currentUser}/>}
                />
                <Route
                    path='/logout'
                    element={<Logout />}
                />
            </Routes>
        } else if (currentUser.roles.includes('Professor')) {
            return <Routes>
                {/*<Route
                    path='/'
                    element={<Navigate to='/schedule' />}
                />
                <Route
                    path='/schedule'
                    element={<Schedule />}
                />*/}
                <Route
                    path='/match'
                    element={<MatchOptions />}
                />
                <Route
                    path='/logout'
                    element={<Logout />}
                />
            </Routes>
        }
    }

    const roleSwitch = () => {
        if (currentUser.roles.includes('Admin')) {
            return <div className="navbar">
            <Link to='/match'>
                <h1>Start a Match</h1>
            </Link>
            <Link to='/adduser'>
                <h1>Add User</h1>
            </Link>
            <Link to='/logout'>
                <h1>Logout from {currentUser.username}</h1>
            </Link>
        </div>
        } else if (currentUser.roles.includes('Gym Owner')){
            return <div className="navbar">
            <Link to='/match'>
                <h1>Start a Match</h1>
            </Link>
            <Link to='/adduser'>
                <h1>Add User</h1>
            </Link>
            <Link to='/logout'>
                <h1>Logout from {currentUser.username}</h1>
            </Link>
        </div>
        }  else if (currentUser.roles.includes('Parent')){
            return <div className="navbar">
            <Link to='/match'>
                <h1>Start a Match</h1>
            </Link>
            <Link to='/adduser'>
                <h1>Add User</h1>
            </Link>
            <Link to='/logout'>
                <h1>Logout from {currentUser.username}</h1>
            </Link>
        </div>
        } else {
            return <div className="navbar">
            <Link to='/match'>
                <h1>Start a Match</h1>
            </Link>
            <Link to='/logout'>
                <h1>Logout from {currentUser.username}</h1>
            </Link>
            </div>
        }
    }

    return (
        <div className="App">
            
            {currentUser ?
                <BrowserRouter>
                    {/*<Navbar firstName={currentUser.first_name}/>*/}
                    <div className="pages">

                        {roleSwitchRoutes()}
                        {roleSwitch()}

                    </div>
                </BrowserRouter>
                :
                <LoginForm />
            }
        </div>
    );
}

export default HomePage;