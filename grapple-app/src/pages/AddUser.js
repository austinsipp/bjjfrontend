import { useState } from 'react'

const AddUser = (currentUser) => {
    let currentUserDisagg = currentUser.currentUser/*currently the homepage passes this down to this component, but I probably should have it use useContext because that is what the other components do. When I first designed it I didnt realize the ability to useContext passes down to all components*/
    let [addedUser, setAddedUser] = useState({ first_name: '', last_name: '', roles: '', username: '', password: '', school_affiliation: '' })/*declare state variable to store user input from the form*/
    let [requestSent, setRequestSent] = useState(false)/*this flag is used to control whether the success/failure message gets displayed, i.e., whether the form has been submitted yet*/
    let [messageDisplayed, setMessageDisplayed] = useState('')/*this stores the message that gets displayed, will say success or error*/
    let admin = currentUserDisagg.roles == 'Admin'/*flags if the user is an admin. This gets used to display only what admins are allowed to do, which is everything*/
    let gymOwner = currentUserDisagg.roles == 'Gym Owner'/*flags if the user is a gym owner. This gets used to display only what gym owners are allowed to do, which eventually will be not everything*/
    let parent = currentUserDisagg.roles == 'Parent'/*flags if the user is a parent. This gets used to display only what parent are allowed to do, which is not everything*/
    console.log("admin flag: ", admin);
    console.log("gymOwner flag: ", gymOwner)
    console.log("parent flag: ", parent)
    console.log("user role is: ", currentUserDisagg.roles)


    /*
    Fetch the route to add the user with the addedUser info in the body
    */
    const onAddUserSubmit = async () => {
        console.log(addedUser)
        const response = await fetch('http://localhost:5000/users/add', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(addedUser), 
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )

        //get the json response
        const json = await response.json()
        if (response.ok) {
            setMessageDisplayed(`New ${addedUser.roles} added!`)/*shows success message if a success response was received from the server*/
            setRequestSent(true)
        } else {
            /*setMessageDisplayed('There was an error, please try again!')*/
            setMessageDisplayed(json.error)/*shows the user the error message. I have a few helpful messages for what should be common errors, but the backend might also pass any other errors. Eventually I want to only have preset messages here*/
            setRequestSent(true)
        }
    }





    return requestSent ?/*ternary operator, if the request has been sent (really in this case meaning 
                        that the request was sent and we have the response, whether success or failure)
                        then display the message, otherwise display the form. Instead of having this 
                        requestSent boolean, I couldve done if messageDisplayed ='', meaning there was 
                        no message because there has been no response yet, but decided to have this second 
                        variable to make it more clear*/
        <div>
            <p>{messageDisplayed}</p>
        </div>
        :
        admin || gymOwner || parent ?/*these are the parts of the form that admins, gym owners, and parents can all see*/
            <div className="addUserWithButton">
                <div className="addUserContainer">
                    <div className="input-group">
                        <label>First Name: </label>
                        <input type='text' onChange={(e) => {
                            setAddedUser({ ...addedUser, first_name: e.target.value })
                        }} />
                        <label>Last Name: </label>
                        <input type='text' onChange={(e) => {
                            setAddedUser({ ...addedUser, last_name: e.target.value })
                        }} />

                        <label>Roles: </label>
                        {admin ?/*only admins can make users with these roles*/
                            <select type='text' onChange={(e) => {
                                setAddedUser({ ...addedUser, roles: e.target.value })
                            }}>
                                <option value=" ">Choose Role</option>
                                <option value="Gym Owner">Gym Owner</option>
                                <option value="Professor">Professor</option>
                                <option value="Student">Student</option>
                                <option value="Parent">Parent</option>
                            </select>
                            :
                            gymOwner ?/*gym owners can make student or professor accounts, not other gym owner accounts*/
                                <select type='text' onChange={(e) => {
                                    setAddedUser({ ...addedUser, roles: e.target.value })
                                }}>
                                    <option value=" ">Choose Role</option>
                                    <option value="Student">Student</option>
                                    <option value="Professor">Professor</option>
                                </select>
                                :/*parents are what is left, they can only create student accounts. I think I don't want this to be the case, so I built out the ability to create "players" the parent can reference when taking stats, rather than creating a whole student account here, but I havent taken this part out yet*/
                                <select type='text' onChange={(e) => {
                                    setAddedUser({ ...addedUser, roles: e.target.value })
                                }}>
                                    <option value="Student">Student</option>
                                </select>
                        }
                    </div>
                    {gymOwner || admin ?
                        <>
                            <div className="input-group">
                                <label>Username: </label>
                                <input type='text' onChange={(e) => {
                                    setAddedUser({ ...addedUser, username: e.target.value })
                                }} />
                                <label>Password: </label>
                                <input type='text' onChange={(e) => {
                                    setAddedUser({ ...addedUser, password: e.target.value })
                                }} />
                            </div>
                        </>
                        :
                        <></>
                    }
                    <div className="input-group">
                        <label>School:</label>
                        <input type='txt' onChange={(e) => {
                            setAddedUser({ ...addedUser, school_affiliation: e.target.value })
                        }} />
                    </div>
                </div>
                <button onClick={onAddUserSubmit}>Create User</button>
            </div>
            :
            <div>You can't add users!</div>/*anyone not in the roles dealt with here will be simply shown this message, they are not allowed to do this. Currently only student accounts are like that*/


}

export default AddUser