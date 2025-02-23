import { /*BrowserRouter, Routes, Route,*/ Link } from 'react-router-dom';


/*this is simply a nested menu so as to not 
crowd the main menu, it is really intended 
to be like a miscellaneous since most time 
will be spent only doing the couple of options 
on the main menu when using the app*/
const ManageAccountData = () => {

    return (
        <div className=/*"manage-account-container"*/"navbar-submenu">
            <h1>Manage Your Account/Data</h1>
            <Link to='/manageaccountdata/manageyourdata'>
                Manage Your Data
            </Link>
            <Link to='/manageaccountdata/changepassword'>
                Change Your Password
            </Link>
        </div>
    );
}


export default ManageAccountData;