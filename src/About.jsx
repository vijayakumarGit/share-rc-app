import React, { useContext, useEffect, useRef, useState } from "react";
import withModal from './withModal'
import { Link } from "react-router-dom";
import { ModalContext } from "./App";
 


const About = (props)=>{
    const [count,setCount]=useState(0)
    const [value,setValue]=useState(0)
    const [openModel,setOpenModel]=useState(false)
    const [modelAction,setModelAction]=useState({})
    const [proValue,setProValue]=useState(0)
    const modalAccess=useContext(ModalContext)
    const timer=useRef(null);
    const startCounter=()=>{
        timer.current=setInterval(()=>{
            setCount((prevCount)=>prevCount+1)
        },1000)
    }
    const modalFun=()=>new Promise((resolve,reject)=>{
        clearInterval(timer.current)
        setOpenModel(true)
        setModelAction({
            onProcess:(p)=>resolve(true),
            onCancel:()=>reject(false)
        })
     
        
    })
    const handleClick= async ()=>{
        console.log("The Value V",value)
        const canproceed= await modalFun();
        if(!canproceed) return false
        console.log("The Value v",value)
        // setProValue((v)=>{
        //     return count*value
        // })
        // setOpenModel(false)
       
    }
    return(
        <div>
           Start Counter : <button onClick={startCounter}>Start </button> {count} 
           <br />
           Open Model : <button onClick={handleClick}>Open </button>
           <br />
           Processed Value : <label>{proValue}</label>{value}
          
           {openModel && <div className={'model-window'}>
               Enter the value: <input onChange={(e)=>setValue(e.target.value)} />
               <br /> 
               <button onClick={modelAction.onProcess}>Ok</button> <button onClick={()=>modelAction.onCancel()}>Cancel</button>
           </div>}
        </div>
    )
}

export default withModal(About)