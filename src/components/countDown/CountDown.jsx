import { useState, useEffect } from "react";

function CountDown() {
  let count = 60;
  const [timer, setTimer] = useState('1:00');
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  useEffect(() => {
    if(isTimerStarted) {
      setInterval(() => {
        count-=1;
        setTimer(`${String(Math.floor(count / 60)).padStart(2, '0')}:${String(count % 60).padStart(2, '0')}`);
      }, 1000);
    }
  }, [isTimerStarted]);

  return (
    <>
      <h2>{ timer }</h2>
      <button onClick={ () => {setIsTimerStarted(prev => !prev);}}>start count down</button>
    </>
  );
}

export default CountDown;