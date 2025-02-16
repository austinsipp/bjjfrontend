import { useContext, useState, useEffect } from 'react'

import PositionPieChart from './PositionPieChart'
import SubmissionPieChart from './SubmissionPieChart'
import { CurrentUser } from '../contexts/CurrentUser';

const ViewStats = () => {
    
    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([{}])
    const [existingPlayers, setExistingPlayers] = useState([])

    const getPlayerList = async () => {
        const response = await fetch('http://localhost:5000/players/retrievePlayers', {
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
            console.log('API response:', json)
            setExistingPlayers(json)

        } else {
            console.log('There was an error retrieving players. Please try again.')
        }
    }
    
    

    const getData = async () => {
        setLoading(true)
        await getPlayerList()
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
            console.log("made it here")
            console.log("returned data is",json)
            console.log("position data is:",json.positionPieChart[0])
            console.log("submission data is:",json.submissionPieChart[0])
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
        <div>
        <PositionPieChart data_for_viz={data.positionPieChart[0]} data_for_filter={existingPlayers}/>
        <SubmissionPieChart data_for_viz={data.submissionPieChart[0]} data_for_filter={existingPlayers}/>
        </div>
        }
    </div>
}


export default ViewStats;