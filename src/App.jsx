import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Slider } from '@mui/material';
import { useState } from 'react';
import Timer from './Timer';
import './app.css';

function App() {
  const [bpm, setBpm] = useState(40);
  const timer = new Timer(bpm);
  let shouldMetronomeStart = true;

  function toggleTimer() {
    if (shouldMetronomeStart) {
      timer.start();
    } else  {
      timer.stop();
    }

    shouldMetronomeStart = !shouldMetronomeStart;
  }

  return (
    <div className='main-wrapper'>
      <h1>{ bpm } bpm</h1>

      <div className="bpm-setters-container">
        <RemoveIcon onClick={ () => setBpm(prev =>  prev <= 40 ? 40 : (prev - 1)) } />

        <Slider min={ 40 } max={ 400 } value={ bpm } sx={{ width: '70%', margin: '0 20px 0 20px' }} onChange={ e => { setBpm(e.target.value); } } />

        <AddIcon onClick={ () => setBpm(prev =>  prev >= 400 ? 400 : (prev + 1))} />
      </div>

      <PlayCircleFilledIcon onClick={ () => { toggleTimer(); } } />

    </div>
  );
}

export default App;
