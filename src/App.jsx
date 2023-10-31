import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import Timer from './Timer';
import './app.css';

function App() {
  const [bpm, setBpm] = useState(60);
  const [timer] = useState(new Timer(bpm));
  const [shouldMetronomeStart, setShouldMetronomeStart] =  useState(false);

  useEffect(() => {
    if (shouldMetronomeStart) return timer.start();

    timer.stop();
  }, [shouldMetronomeStart]);

  useEffect(() => {
    timer.stop();

    timer.bpm = bpm;

    if (shouldMetronomeStart) timer.start();
    }, [bpm]);

  return (
    <div className='main-wrapper'>
      <h1>{ bpm } bpm</h1>

      <div className="bpm-setters-container">
        <RemoveIcon onClick={ () => setBpm(prev =>  prev <= 60 ? 60 : (prev - 1)) } />

        <Slider min={ 60 } max={ 400 } value={ bpm } sx={{ width: '70%', margin: '0 20px 0 20px' }} onChange={ e => { setBpm(e.target.value); } } />

        <AddIcon onClick={ () => setBpm(prev =>  prev >= 400 ? 400 : (prev + 1))} />
      </div>

      <PlayCircleFilledIcon onClick={ () => { setShouldMetronomeStart(prev => !prev); } } />

    </div>
  );
}

export default App;
