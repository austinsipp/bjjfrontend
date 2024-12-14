import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react'
import { Link } from "react-router-dom";

import { CurrentUser } from '../contexts/CurrentUser';



const MatchOptions = () => {
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)

    

    const roleSwitch = () => {
        if (currentUser.roles.includes('Admin') || currentUser.roles.includes('Official')) {
            return <div className="navbarmatchtype">
                <a href="/officialmatch.html">Official Match</a>
                <a href="/competitivematch.html">Competitive Match</a>
                <a href="/practicematch.html">Practice Match</a>
        </div>
        } else {
            return <div className="navbarmatchtype">
            <a href="/competitivematch.html">Competitive Match</a>
            <a href="/practicematch.html">Practice Match</a>
    </div>
        }
    }



    return <div className="pages">

        {roleSwitch()}

    </div>

}

export default MatchOptions;