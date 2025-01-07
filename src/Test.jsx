import React from 'react'
import { Link } from 'react-router-dom'


const Test=()=>{
    return(
        <div>
            Test page
            <Link to={'/'}> <h1>Home</h1></Link>
        </div>
    )
}
export default Test;