import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react'
import { Link } from "react-router-dom";


//pages and components
import { CurrentUser } from '../contexts/CurrentUser';
import LoginForm from './LoginForm';
import Logout from './Logout';
import AddUser from './AddUser';
import MatchOptions from './MatchOptions';
import ManageAccountData from './ManageAccountData';
import ManageData from './ManageData';
import ChangePassword from './ChangePassword';
import ViewStats from './ViewStats';
import logo from '../grapplestatsLogo.png';




function HomePage() {
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)

    /*
    This matches the navbar, not only do we want the navbar to only display the right links to the user,
    we want only certain routes to even be available to each user based on their role. Admins have access
    to the extra tabs. We wouldnt want a non-admin to be able to get to that tab by simply typing it in 
    their address bar, so it wasnt enough to simply display only the right links in the navbar, we also
    needed to replicate that logic here, to make only certain routes available to regular users
    */
    const roleSwitchRoutes = () => {
        if (currentUser.roles.includes('Admin')) {/*admins can do everything*/
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
                    element={<AddUser currentUser={currentUser} />}
                />
                <Route
                    path='/manageaccountdata'
                    element={<ManageAccountData />}
                />
                <Route
                    path='/manageaccountdata/manageyourdata'
                    element={<ManageData />}
                />
                <Route
                    path='/stats'
                    element={<ViewStats />}
                />
                <Route
                    path='/manageaccountdata/changepassword'
                    element={<ChangePassword />}
                />
                <Route
                    path='/logout'
                    element={<Logout />}
                />
            </Routes>
        } else if (currentUser.roles.includes('Gym Owner')) {/*gym owners have access to all tabs currently, but when they go to add user tab they can't create all user types*/
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
                    element={<AddUser currentUser={currentUser} />}
                />
                <Route
                    path='/manageaccountdata'
                    element={<ManageAccountData />}
                />
                <Route
                    path='/manageaccountdata/manageyourdata'
                    element={<ManageData />}
                />
                <Route
                    path='/stats'
                    element={<ViewStats />}
                />
                <Route
                    path='/manageaccountdata/changepassword'
                    element={<ChangePassword />}
                />
                <Route
                    path='/logout'
                    element={<Logout />}
                />
            </Routes>
        } else if (currentUser.roles.includes('Parent')) {/*parents have access to all tabs currently, but when they go to add user tab they can't create all user types*/
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
                    element={<AddUser currentUser={currentUser} />}
                />
                <Route
                    path='/manageaccountdata'
                    element={<ManageAccountData />}
                />
                <Route
                    path='/manageaccountdata/manageyourdata'/*quick note, you can only define your routes once, so even nested paths must be listed here, even if the link won't be shown on this particular component*/
                    element={<ManageData />}
                />
                <Route
                    path='/stats'
                    element={<ViewStats />}
                />
                <Route
                    path='/manageaccountdata/changepassword'
                    element={<ChangePassword />}
                />
                <Route
                    path='/logout'
                    element={<Logout />}
                />
            </Routes>
        } else if (currentUser.roles.includes('Professor')) {
            /*professor accounts are intended to be accounts that can 
            take stats for a gym owner, usually the fellow blackbelts 
            at the gym who help out with classes, thus they wouldnt 
            be able to create users, the gym owner must create all 
            the users, and the professor just takes stats with the users 
            the gym owner created*/
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
        if (currentUser.roles.includes('Admin')) {/*logic here mirrors the above, only showing links to the user according to their role*/
            return <div className="navbar">
                <Link to='/match'>
                    <h1>Start a Match</h1>
                </Link>
                <Link to='/adduser'>
                    <h1>Add User</h1>
                </Link>
                <Link to='/manageaccountdata'>{/*notice the routes above have paths further into this manageaccountdata route. I am not linking to them here, because I want those to be part of a submenu, which is in the ManageData component*/}
                    <h1>Manage Your Account/Data</h1>
                </Link>
                <Link to='/stats'>
                    <h1>View Stats</h1>
                </Link>
                <Link to='/logout'>
                    <h1>Logout from {currentUser.username}</h1>
                </Link>
            </div>
        } else if (currentUser.roles.includes('Gym Owner')) {/*matches above logic for gym owner*/
            return <div className="navbar">
                <Link to='/match'>
                    <h1>Start a Match</h1>
                </Link>
                <Link to='/adduser'>
                    <h1>Add User</h1>
                </Link>
                <Link to='/manageaccountdata'>
                    <h1>Manage Your Account/Data</h1>
                </Link>
                <Link to='/stats'>
                    <h1>View Stats</h1>
                </Link>
                <Link to='/logout'>
                    <h1>Logout from {currentUser.username}</h1>
                </Link>
            </div>
        } else if (currentUser.roles.includes('Parent')) {/*matches above logic for parent*/
            return <div className="navbar">
                <Link to='/match'>
                    <h1>Start a Match</h1>
                </Link>
                <Link to='/adduser'>
                    <h1>Add User</h1>
                </Link>
                <Link to='/manageaccountdata'>
                    <h1>Manage Your Account/Data</h1>
                </Link>
                <Link to='/stats'>
                    <h1>View Stats</h1>
                </Link>
                <Link to='/logout'>
                    <h1>Logout from {currentUser.username}</h1>
                </Link>
            </div>
        } else {/*this should be for a professor account, all they can do is take stats*/
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

            {currentUser ?/*checks for a current user. Must be a valid cookie session and also match a valid session in the backend, which got created upon login and is invalidated upon logout*/
                <BrowserRouter>
                    {/*<Navbar firstName={currentUser.first_name}/>*/}
                    <div className="pages">
                        <div className="main-container">{/*this is the main container and currently is divided into 3, the logo at the top, which is fixed and never moves, the content, and the navbar at the bottom which is fixed and never moves*/}
                            <div className="logo-container">
                                <img src={logo} alt="GrappleApp Logo" className="logo" />
                            </div>
                            <div className="content">
                                {roleSwitchRoutes()}
                            </div>


                            {roleSwitch()}
                        </div>
                    </div>
                </BrowserRouter>
                :
                <LoginForm />/*display the login form if there is no current user in the cookie session that matches a valid session stored in the backend*/
            }
        </div>
    );
}

export default HomePage;