
import styles from '../styles/Home.module.css'
import Timer from '../components/Timer';
import audio from '../public/alarm.wav';

import {useState, useEffect} from 'react';

import Settings from '../components/Settings';


export default function Home() {
  const [pomodoro, setPomodoro] = useState(2)
  const [shortTime, setShortTime] = useState(5)
  const [longTime, setLongTime] = useState(15)

  const [initialMinutes, setInitialMinutes] = useState(pomodoro)
  const [minutes, setMinutes] = useState(pomodoro);
  const [seconds, setSeconds] =  useState(0);
  const [strokeOffset, setStrokeOffset] = useState(minutes*60);
  
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [currentPhase, setCurrentPhase] = useState(1);
  const [selectedColour, setSelectedColour] = useState('#ff6f68');
  const [font, setFont] = useState('Nunito');

  const [currentCycle, setCurrentCycle] = useState(1);
  // const [isInTransition, setIsInTransition] = useState(false)

  // Refresh timer when settings are changed 
  useEffect(() => {
    setMinutes(0)
    setInitialMinutes(pomodoro);
    setMinutes(pomodoro);
    setSeconds(0)
    setCurrentPhase(1)
  }, [pomodoro, shortTime, longTime]);



  useEffect(() => {
    console.log(initialMinutes, minutes)
  }, [initialMinutes, minutes])

  // Proceed to next phase on time end
  useEffect(() => {
    if(seconds === 0 && minutes === 0) {

      if(currentCycle < 4) {
        if(currentPhase === 1) {
          setCurrentPhase(2)
        } else if (currentPhase === 2) {
          // Next cycle after break
          setCurrentPhase(1)
          setCurrentCycle((prev) => prev + 1)
        }
      }
      if(currentCycle === 4) {
        if(currentPhase === 1) {
          setCurrentPhase(2)
        } else if (currentPhase === 2) {
          setCurrentPhase(3) // Long break
        } else if (currentPhase === 3) {
          setCurrentPhase(1)
          setCurrentCycle(1)
        }

      }
    }
  }, [seconds]);


  useEffect(() => {
    setSeconds(0)
    if(currentPhase === 1) {
      setInitialMinutes(pomodoro)
      setMinutes(pomodoro)
    } else if (currentPhase === 2) {
      
      setInitialMinutes(shortTime)
      setMinutes(shortTime)
    } else if (currentPhase === 3) {
      setInitialMinutes(longTime)
      setMinutes(longTime)
    }
  }, [currentPhase])


  function togglePause() {
    //new Audio(audio).play()
    setIsPaused((prev) => !prev)
  }

  function toggleSettings() {
    setShowSettings((prev) => !prev)
  }

  const calcStrokeOffset = () => {
    if(minutes === 0 && seconds === 0) {
      return 283
    }

    return 283 - 283 / (initialMinutes * 60 / strokeOffset)
  };

 



  


  return (
    <div className={styles.container}>
      <span className="title">pomodoro</span>
      <audio src="alarm.mp3" autoPlay loop controls>Hey</audio>
      <div className='phase_wrapper'>
        <div onClick={() => {setCurrentPhase(1)}} className={currentPhase === 1 ? 'phase active' : 'phase'}>
          <span>pomodoro</span> 
        </div>
        <div onClick={() => {setCurrentPhase(2)}} className={currentPhase === 2 ? 'phase active' : 'phase'}>
          <span>short break</span>
        </div>
        <div onClick={() => {setCurrentCycle(4); setCurrentPhase(3)}} className={currentPhase === 3 ? 'phase active' : 'phase'}>
          <span>long break</span>
        </div>
      </div>
      <div className='cycle-indicator_wrapper'>
        <div className={currentCycle >= 1 ? 'cycle-indicator active-cycle' : 'cycle-indicator'} />
        <div className={currentCycle >= 2 ? 'cycle-indicator active-cycle' : 'cycle-indicator'} />
        <div className={currentCycle >= 3 ? 'cycle-indicator active-cycle' : 'cycle-indicator'} />
        <div className={currentCycle === 4 ? 'cycle-indicator active-cycle' : 'cycle-indicator'} />
      </div>
      <button className='skip' onClick={() => {setMinutes(0); setSeconds(0)}}>Skip</button>
      <div className='timer_wrapper'>
          
          <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g className="base-timer__circle">
             <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" strokeDashoffset={calcStrokeOffset()} />
             
            </g>
          </svg>
            <div className="timer_text_wrapper">
              {/* <span className='timer'>{formatTimeLeft(timeLeft)}</span> */}
              <Timer isPaused={isPaused} minutes={minutes} setMinutes={setMinutes} seconds={seconds} setSeconds={setSeconds} setStrokeOffset={setStrokeOffset}/>
              <button className='toggle' onClick={togglePause}>{isPaused ? `RESUME` : `PAUSE`}</button>
            </div>
         
      </div>

      <button className='cog_btn' onClick={toggleSettings}>
        <svg className='cog_icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M444.788 291.1l42.616 24.599c4.867 2.809 7.126 8.618 5.459 13.985-11.07 35.642-29.97 67.842-54.689 94.586a12.016 12.016 0 0 1-14.832 2.254l-42.584-24.595a191.577 191.577 0 0 1-60.759 35.13v49.182a12.01 12.01 0 0 1-9.377 11.718c-34.956 7.85-72.499 8.256-109.219.007-5.49-1.233-9.403-6.096-9.403-11.723v-49.184a191.555 191.555 0 0 1-60.759-35.13l-42.584 24.595a12.016 12.016 0 0 1-14.832-2.254c-24.718-26.744-43.619-58.944-54.689-94.586-1.667-5.366.592-11.175 5.459-13.985L67.212 291.1a193.48 193.48 0 0 1 0-70.199l-42.616-24.599c-4.867-2.809-7.126-8.618-5.459-13.985 11.07-35.642 29.97-67.842 54.689-94.586a12.016 12.016 0 0 1 14.832-2.254l42.584 24.595a191.577 191.577 0 0 1 60.759-35.13V25.759a12.01 12.01 0 0 1 9.377-11.718c34.956-7.85 72.499-8.256 109.219-.007 5.49 1.233 9.403 6.096 9.403 11.723v49.184a191.555 191.555 0 0 1 60.759 35.13l42.584-24.595a12.016 12.016 0 0 1 14.832 2.254c24.718 26.744 43.619 58.944 54.689 94.586 1.667 5.366-.592 11.175-5.459 13.985L444.788 220.9a193.485 193.485 0 0 1 0 70.2zM336 256c0-44.112-35.888-80-80-80s-80 35.888-80 80 35.888 80 80 80 80-35.888 80-80z"/></svg>
      </button>

      {showSettings? <Settings font={font} setFont={setFont} pomodoro={pomodoro} shortTime={shortTime} longTime={longTime} selectedColour={selectedColour} setSelectedColour={setSelectedColour} setShowSettings={setShowSettings} setPomodoro={setPomodoro} setShortTime={setShortTime} setLongTime={setLongTime} toggleSettings={toggleSettings} /> : null}
    </div>
  )
}
