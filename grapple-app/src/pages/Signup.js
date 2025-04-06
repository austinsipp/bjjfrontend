import { useState } from "react"


const Signup = () => {
    const [emailToAdd, setEmailToAdd] = useState('')
    

    return (
        <div>
            <label>Please enter your email address to sign up!</label>
            <input type='text' onChange={(e) => {
                setEmailToAdd(e.target.value)
            }} />
            <button>Submit</button>
        </div>
    )
}

export default Signup;