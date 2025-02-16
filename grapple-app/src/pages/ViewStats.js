import { useContext, useState, useEffect } from 'react'

import { CurrentUser } from '../contexts/CurrentUser';

const ViewStats = () => {
    
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([{}])
    

    const getData = async () => {
        setLoading(true)
        const response = await fetch('http://localhost:5000/stats', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )

        //get the json response
        const json = await response.json()
        if (response.ok) {
            console.log(json)
            setData(json)
            setLoading(false)
            
        } else {
            /*setMessageDisplayed('There was an error, please try again!')*/
            console.log(json)
        }
        
    }

    useEffect(() => {
        getData();
    }, []);


    return <div className="dashboard">
        {loading ? 
        <div>Loading...</div>
        :
        <div>{JSON.stringify(data)}</div>
        }
    </div>
}


export default ViewStats;