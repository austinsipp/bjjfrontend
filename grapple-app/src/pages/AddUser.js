import { useState } from 'react'

const AddUser = (currentUser) => {
    let currentUserDisagg = currentUser.currentUser
    let [addedUser, setAddedUser] = useState({ first_name: '', last_name: '', roles: '', username: '', password: '', school_affiliation: '' })/*declare state variable to store user input from the form*/
    let [requestSent, setRequestSent] = useState(false)/*this flag is used to control whether the success/failure message gets displayed, i.e., whether the form has been submitted yet*/
    let [messageDisplayed, setMessageDisplayed] = useState('')/*this stores the message that gets displayed, will say success or error*/
    let admin = currentUserDisagg.roles == 'Admin'
    let gymOwner = currentUserDisagg.roles == 'Gym Owner'
    let parent = currentUserDisagg.roles == 'Parent'
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
            body: JSON.stringify(addedUser), //make the object json 
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )

        //get the json response
        const json = await response.json()
        if (response.ok) {
            setMessageDisplayed(`New ${addedUser.roles} added!`)
            setRequestSent(true)
        } else {
            /*setMessageDisplayed('There was an error, please try again!')*/
            setMessageDisplayed(json.error)
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
        admin || gymOwner || parent ?
            <div>
                <label>First Name: </label>
                <input type='text' onChange={(e) => {
                    setAddedUser({ ...addedUser, first_name: e.target.value })
                }} />
                <label>Last Name: </label>
                <input type='text' onChange={(e) => {
                    setAddedUser({ ...addedUser, last_name: e.target.value })
                }} />
                <label>Roles: </label>
                {admin ?
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
                    gymOwner ?
                        <select type='text' onChange={(e) => {
                            setAddedUser({ ...addedUser, roles: e.target.value })
                        }}>
                            <option value=" ">Choose Role</option>
                            <option value="Student">Student</option>
                            <option value="Professor">Professor</option>
                        </select>
                        :
                        <select type='text' onChange={(e) => {
                            setAddedUser({ ...addedUser, roles: e.target.value })
                        }}>
                            <option value="Student">Student</option>
                        </select>
                }
                {gymOwner || admin ?
                <>
                <label>Username: </label>
                <input type='text' onChange={(e) => {
                    setAddedUser({ ...addedUser, username: e.target.value })
                }} />
                <label>Password: </label>
                <input type='text' onChange={(e) => {
                    setAddedUser({ ...addedUser, password: e.target.value })
                }} />
                </>
                :
                <></>
            }
                <label>School:</label>
                <input  type='txt' onChange={(e) => {
                    setAddedUser({...addedUser,school_affiliation: e.target.value})
                }} />
                <button onClick={onAddUserSubmit}>Create User</button>
            </div>
            :
            <div>You can't add users!</div>


}

export default AddUser