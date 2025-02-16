import { useContext, useState, useEffect } from 'react'

import PositionPieChart from './PositionPieChart'
import SubmissionPieChart from './SubmissionPieChart'
import { CurrentUser } from '../contexts/CurrentUser';

const ViewStats = () => {

    const { currentUser } = useContext(CurrentUser)
    console.log("current user is ", currentUser)

    const [loading, setLoading] = useState(true);
    const [positionPieFilteredData, setPositionPieFilteredData] = useState([{}])
    const [submissionPieFilteredData, setSubmissionPieFilteredData] = useState([{}])
    const [positionPieUnfilteredData, setPositionPieUnfilteredData] = useState([{}])
    const [submissionPieUnfilteredData, setSubmissionPieUnfilteredData] = useState([{}])
    const [existingPlayers, setExistingPlayers] = useState([])
    const [selectedPlayer, setSelectedPlayer] = useState('All');

    /*let positionPieOriginalData = [{}]
    let submissionPieOriginalData = [{}]*/

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
            setPositionPieFilteredData(json.positionPieChart[0]);
            setSubmissionPieFilteredData(json.submissionPieChart[0]);
            setPositionPieUnfilteredData(json.positionPieChart[0]);
            setSubmissionPieUnfilteredData(json.submissionPieChart[0]);
            /*positionPieOriginalData = json.positionPieChart[0];*/
            /*console.log("positionPieOriginalData 1",positionPieOriginalData)*/
            /*submissionPieOriginalData = json.submissionPieChart[0];*/
            setLoading(false)

        } else {
            /*setMessageDisplayed('There was an error, please try again!')*/
            console.log(json)
        }

    }

    useEffect(() => {
        getData();
    }, []);

    const handleFilterChange = (event) => {
        setSelectedPlayer(event.target.value);
        /*console.log("positionPieOriginalData 2",positionPieOriginalData)*/
        setPositionPieFilteredData(event.target.value === 'All' ? positionPieUnfilteredData : positionPieUnfilteredData.filter(d => d.player_id === Number(event.target.value)));
        setSubmissionPieFilteredData(event.target.value === 'All' ? submissionPieUnfilteredData : submissionPieUnfilteredData.filter(d => d.player_id === Number(event.target.value)));
    };


    return <div className="dashboard">
        {loading ?
            <div>Loading...</div>
            :
            <div>
                <select onChange={handleFilterChange} value={selectedPlayer}>
                    <option value="All">All Players</option>
                    <option value="15">Austin</option>
                    <option value="16">Lucy</option>
                </select>
                <PositionPieChart data_for_viz={positionPieFilteredData}  />
                <SubmissionPieChart data_for_viz={submissionPieFilteredData} />
            </div>
        }
    </div>
}


export default ViewStats;