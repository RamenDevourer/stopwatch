import React,{useState, useEffect, useRef} from 'react'

function Stopwatch(){
    
    const [isRunning, setIsRunning] = useState(false);
    const [elaspedTime, setElapsedTime] = useState(0);
    const timeIntervalRef = useRef(null);
    const startTimeRef = useRef(0);
    const pauseTimeRef = useRef(0);

    useEffect (() => {
        if (isRunning){
            timeIntervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current - pauseTimeRef.current)
            } , 1);
        }

        return () => {
            clearInterval(timeIntervalRef.current);
        }

    }, [isRunning]);

    function start(){
        startTimeRef.current = Date.now(); 
        setIsRunning(true);
    }

    //uncomment to add stop button function
    // function stop(){
    //     pauseTimeRef.current = 0;
    //     setIsRunning(false);
    // }

    function pause(){
        pauseTimeRef.current = -elaspedTime;
        setIsRunning(false);
    }

    function reset(){
        pauseTimeRef.current = 0;
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime(){
        let hours = Math.floor(elaspedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elaspedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elaspedTime / (1000) % 60);
        let milliseconds = Math.floor(elaspedTime % 1000);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(3, "0");

        return (<div className='time'><span className='time-front'>{hours}:{minutes}:{seconds}</span><span className='time-back'>{milliseconds}</span></div>);
    }



    return(
            <div className='container'>   
                {formatTime()}
                <div className='buttons'>
                    <button className='start-button' onClick={start}>Start</button>
                    <button className='pause-button' onClick={pause}>Pause</button>
                    {/* uncomment to add stop button */}
                    {/* <button onClick={stop}>Stop</button> */}
                    <button className='reset-button' onClick={reset}>Reset</button>
                </div>
            </div>
    );
}

export default Stopwatch;