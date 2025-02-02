import { /*BrowserRouter, Routes, Route,*/ Link } from 'react-router-dom';


/*this is simply a nested menu so as to not 
crowd the main menu, it is really intended 
to be like a miscellaneous since most time 
will be spent only doing the couple of options 
on the main menu when using the app*/
const ManageAccountData = () => {

    return (
        <div>
            <Link to='/manageaccountdata/manageyourdata'>
                <h1>Manage Your Data</h1>
            </Link>
            <Link to='/manageaccountdata/changepassword'>
                <h1>Change your Password</h1>
            </Link>
        </div>
    );
}


export default ManageAccountData;