import React, {useState, useEffect} from 'react';
import * as workerTimers from 'worker-timers';

const Timer = ({audio, minutes, setMinutes, seconds, setSeconds, setStrokeOffset, isPaused}) => {

    useEffect(()=>{
    let myInterval = workerTimers.setInterval(() => {
            if(!isPaused) {
                
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        new Audio(audio).play()
                        console.log('play sound')
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
            workerTimers.clearInterval(myInterval);
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