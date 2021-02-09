import React from 'react'
import fbConfig from '../config/fbConfig'

function Home() {
    const logout= () =>{
        fbConfig.auth().signOut();
    }
    return (
        <div>
            Home
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Home
