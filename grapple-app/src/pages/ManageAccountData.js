import { /*BrowserRouter, Routes, Route,*/ Link } from 'react-router-dom';


/*this is simply a nested menu so as to not 
crowd the main menu, it is really intended 
to be like a miscellaneous since most time 
will be spent only doing the couple of options 
on the main menu when using the app. I imagine 
the future will have more than two options here.
For instance,  at the very least once we have 
paying users, there will be a link here for 
managing their payment plans and such*/
const ManageAccountData = () => {

    return (
        <div className="navbar-submenu">
            <h1>Manage Your Account/Data</h1>
            <Link to='/manageaccountdata/manageyourdata'>{/*these nested paths are only linked here in this component*/}
                Manage Your Data
            </Link>
            <Link to='/manageaccountdata/changepassword'>
                Change Your Password
            </Link>
        </div>
    );
}


export default ManageAccountData;