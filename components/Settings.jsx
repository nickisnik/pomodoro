import React, {useState, useEffect} from 'react';

const Settings = ({font, setFont, pomodoro, shortTime, longTime, selectedColour, setSelectedColour, toggleSettings, setShowSettings, setPomodoro, setShortTime, setLongTime}) => {
    const [pomodoroValue, setPomodoroValue] = useState(pomodoro);
    const [shortValue, setShortValue] = useState(shortTime);
    const [longValue, setLongValue] = useState(longTime)
    

    useEffect(() => {
        //console.log(selectedColour)
    }, [selectedColour]);

    function timeSubmit(e) {
        e.preventDefault();
        setPomodoro(pomodoroValue);
        setShortTime(shortValue);
        setLongTime(longValue);
        /* setPomodoro(parseInt(e.target[0].value))
        setShortTime(parseInt(e.target[1].value))
        setLongTime(parseInt(e.target[2].value)) */
        setShowSettings(false);
        document.documentElement.style.setProperty('--accent-color', selectedColour)
        document.documentElement.style.setProperty('--font', font)
        //console.log(e);
    }

  return (
    <div className='settings_wrapper'>
        <div className='settings_box'>
            <header className='settings_header'>
                <span>Settings</span>
                <button onClick={toggleSettings}>x</button>
            </header>
            <main className='settings_main'>
                <span className='settings-subtitle'>TIME (MINUTES)</span>
                <form onSubmit={timeSubmit} id="time_form" className='time-settings_wrapper'>
                    <div className="time-settings_box">
                        <span>pomodoro</span>
                        <input value={pomodoroValue} required onChange={(i) => {setPomodoroValue(parseInt(i.target.value))}} max="99" maxLength="2" className='time-input' type="number" placeholder='25'/>
                    </div>
                    <div className="time-settings_box">
                        <span>short break</span>
                        <input value={shortValue} required onChange={(i) => {setShortValue(parseInt(i.target.value))}} min="1" max="99" className='time-input' type="number" placeholder='25'/>
                    </div>
                    <div className="time-settings_box">
                        <span>long break</span>
                        <input value={longValue} required onChange={(i) => {setLongValue(parseInt(i.target.value))}} min="1" max="99" className='time-input' type="number" placeholder='25'/>
                    </div>
                </form>
                
                
                <section className='font-settings_wrapper'>
                    <span className='settings-subtitle'>FONT</span>
                    <div className='font-settings_buttons_wrapper'>
                        <button className={font === 'Nunito' ? 'font-settings_button activeFont' : 'font-settings_button'} id='font1' onClick={() => {setFont('Nunito')}}>Aa</button>
                        <button className={font === 'Montserrat' ? 'font-settings_button activeFont' : 'font-settings_button'}  id='font2' onClick={() => {setFont('Montserrat')}}>Aa</button>
                        <button className={font === 'Karla' ? 'font-settings_button activeFont' : 'font-settings_button'}  id='font3' onClick={() => {setFont('Karla')}}>Aa</button>
                    </div>
                </section>
                <section className='font-settings_wrapper'>
                    <span className='settings-subtitle'>COLOR</span>
                    <div className='font-settings_buttons_wrapper'>
                        <button className={selectedColour === '#ff6f68' ? 'activeColour color-settings_button' : 'color-settings_button'} id='orange' onClick={() => {setSelectedColour('#ff6f68')}} />
                        <button className={selectedColour === 'cyan' ? 'activeColour color-settings_button' : 'color-settings_button'} id='cyan' onClick={() => {setSelectedColour('cyan')}} />
                        <button className={selectedColour === '#1cdb1c' ? 'activeColour color-settings_button' : 'color-settings_button'} id='green' onClick={() => {setSelectedColour('#1cdb1c')}} />
                    </div>
                </section>
                
            </main>
            <button value="submit" type='submit' form="time_form" className="apply-btn">Apply</button>
        </div>
    </div>
  )
}

export default Settings