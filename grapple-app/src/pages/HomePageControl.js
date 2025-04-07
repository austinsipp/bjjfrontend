import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";


//pages and components
import logo from '../grapplestatsLogo.png';
import { CurrentUser } from '../contexts/CurrentUser';
import LoginForm from './LoginForm';
import Logout from './Logout';
import AddUser from './AddUser';
import MatchOptions from './MatchOptions';
import ManageAccountData from './ManageAccountData';
import ManageData from './ManageData';
import ChangePassword from './ChangePassword';
import ViewStats from './ViewStats';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import HomePage from './HomePage.js';


/*had to make a homepage control in order to make the 
browser back button work properly. Previously the homepage 
was not the outcome of a route. I had no routes defined at 
url '/' and so when you got somewhere and then hit the back 
button, which goes to URL '/', there was an error. The only 
way it knew to show the homepage whne you first go to it is 
because the index page ultimately pointed to the homepage, 
but then the back button didn't work as intended. Now I have 
defined the homepage as route '/' and I needed this homepage 
control page to store all the routes. The default url '/' 
still serves the homepage and I still preserve all the security 
on these routes.*/

function HomePageControl() {
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
        if (currentUser!== null && currentUser.roles.includes('Admin')) {/*admins can do everything*/
            return <Routes>
                <Route
                    path='/'
                    element={<HomePage />}
                />
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
        } else if (currentUser!== null && currentUser.roles.includes('Gym Owner')) {/*gym owners have access to all tabs currently, but when they go to add user tab they can't create all user types*/
            return <Routes>
                <Route
                    path='/'
                    element={<HomePage />}
                />
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
        } else if (currentUser!== null && currentUser.roles.includes('Parent')) {/*parents have access to all tabs currently, but when they go to add user tab they can't create all user types*/
            return <Routes>
                <Route
                    path='/'
                    element={<HomePage />}
                />
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
        } else if (currentUser!== null && currentUser.roles.includes('Professor')) {
            /*professor accounts are intended to be accounts that can 
            take stats for a gym owner, usually the fellow blackbelts 
            at the gym who help out with classes, thus they wouldnt 
            be able to create users, the gym owner must create all 
            the users, and the professor just takes stats with the users 
            the gym owner created*/
            return <Routes>
                <Route
                    path='/'
                    element={<HomePage />}
                />
                <Route
                    path='/match'
                    element={<MatchOptions />}
                />
                <Route
                    path='/logout'
                    element={<Logout />}
                />
            </Routes>
        } else if (currentUser === null) {
            return <Routes>
                <Route
                    path='/'
                    element={<HomePage />}
                />
                <Route
                    path='/signup'
                    element={<Signup />}
                />
                <Route
                    path='/forgotpassword'
                    element={<ForgotPassword />}
                />
            </Routes>
        }
    }





    return (
        <div className="App">
            <BrowserRouter>
                {roleSwitchRoutes()}
            </BrowserRouter>
        </div>
    );
}

export default HomePageControl;