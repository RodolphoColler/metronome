import { useState, useEffect, useContext } from "react";
import MetronomeContext from '../../context/MetronomeContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const initialCount = 10;

function CountDown() {
  const { increaseBpm } = useContext(MetronomeContext);
  let count = initialCount;
  const [intervalCountDown, setIntervalCountdown] = useState();
  const [complementBpm, setComplementBpm] = useState(1);
  const [countDown, setCountDown] = useState('00:10');
  const [isCountDownStarted, setIsCountDownStarted] = useState(false);

  useEffect(() => {
    if(isCountDownStarted) {
      setIntervalCountdown(setInterval(() => {
        if (count === 0) {
          increaseBpm(complementBpm);
          count = initialCount;
        }
        count-=1;
        setCountDown(`${String(Math.floor(count / 60)).padStart(2, '0')}:${String(count % 60).padStart(2, '0')}`);
      }, 1000));
    }
    else {
      clearTimeout(intervalCountDown);
    }
  }, [isCountDownStarted]);

  return (
    <>
      <RemoveIcon sx={{ fontSize: '5rem' }} onClick={ () => setComplementBpm(prev =>  prev <= 1 ? 1 : (prev - 1))} />
      <p>{ complementBpm }</p>
      <AddIcon sx={{ fontSize: '5rem' }} onClick={ () => setComplementBpm(prev =>  prev >= 20 ? 20 : (prev + 1)) } />
      <h2>{ countDown }</h2>
      <button onClick={ () => { setIsCountDownStarted(prev => !prev); }}>start count down</button>
    </>
  );
}

export default CountDown;