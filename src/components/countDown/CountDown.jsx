import { useState, useEffect, useContext } from "react";
import MetronomeContext from '../../context/MetronomeContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function CountDown() {
  const { increaseBpm } = useContext(MetronomeContext);
  let count = 5;
  const [complementBpm, setComplementBpm] = useState(1);
  const [countDown, setCountDown] = useState('0:05');
  const [isCountDownStarted, setIsCountDownStarted] = useState(false);

  useEffect(() => {
    if(isCountDownStarted) {
      setInterval(() => {
        count-=1;
        if (count === 0) {
          increaseBpm();
        }
        setCountDown(`${String(Math.floor(count / 60)).padStart(2, '0')}:${String(count % 60).padStart(2, '0')}`);
      }, 1000);
    }
  }, [isCountDownStarted]);

  return (
    <>
      <RemoveIcon sx={{ fontSize: '5rem' }} onClick={ () => setComplementBpm(prev =>  prev <= 60 ? (prev - 1) : 60)} />
      <p>{ complementBpm }</p>
      <AddIcon sx={{ fontSize: '5rem' }} onClick={ () => setComplementBpm(prev =>  prev >= 400 ? 400 : (prev + 1)) } />
      <h2>{ countDown }</h2>
      <button onClick={ () => {setIsCountDownStarted(prev => !prev);}}>start count down</button>
    </>
  );
}

export default CountDown;