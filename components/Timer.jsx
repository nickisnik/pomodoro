import React, {useState, useEffect} from 'react'

const Timer = ({minutes, setMinutes, seconds, setSeconds, setStrokeOffset, isPaused}) => {

    useEffect(()=>{
    let myInterval = setInterval(() => {
            if(!isPaused) {
                
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        //clearInterval(myInterval)
                        setStrokeOffset(0)
                        
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
                
                setStrokeOffset((minutes*60 + seconds - 1))
        }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <>
        { minutes === 0 && seconds === 0
            ? <span className='timer'>0:00</span>
            : <span className='timer'> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</span> 
        }
        </>
    )
}

export default Timer;