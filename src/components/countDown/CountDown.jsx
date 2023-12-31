import { useState, useEffect, useContext } from "react";
import MetronomeContext from '../../context/MetronomeContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './CountDown.css';

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
      <div className="countdown-wrapper">
        <p>Increase BPM per second</p>
        <RemoveIcon sx={{ fontSize: '1rem' }} className="complement-bpm left" onClick={ () => setComplementBpm(prev =>  prev <= 1 ? 1 : (prev - 1))} />
        <p>{ complementBpm }</p>
        <AddIcon sx={{ fontSize: '1rem' }} className="complement-bpm right" onClick={ () => setComplementBpm(prev =>  prev >= 20 ? 20 : (prev + 1)) } />
        <h2>{ countDown }</h2>
        <button className="countdown-toggler" onClick={ () => { setIsCountDownStarted(prev => !prev); } }>
          { isCountDownStarted == true ? <PauseIcon /> : <PlayArrowIcon /> }
        </button>
      </div>
    </>
  );
}

export default CountDown;