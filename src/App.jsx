import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useHotkeys } from 'react-hotkeys-hook';
import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import Timer from './Timer';
import './app.css';

function initialBpm() {
  const bpm = Number(localStorage.getItem('bpm'));  // eslint-disable-line

  if (!bpm) return 60;

  return bpm;
}

function App() {
  const [bpm, setBpm] = useState(initialBpm);
  useHotkeys('ArrowRight, Add', () => setBpm(prev => prev + 1));
  useHotkeys('ArrowLeft, Subtract', () => setBpm(prev => prev - 1));
  useHotkeys(' ', () => setShouldMetronomeStart(prev => !prev));
  const [timer] = useState(new Timer(bpm));
  const [shouldMetronomeStart, setShouldMetronomeStart] =  useState(false);

  useEffect(() => {
    if (shouldMetronomeStart) return timer.start();

    timer.stop();
  }, [shouldMetronomeStart]);

  useEffect(() => {
    timer.stop();

    timer.bpm = bpm;

    localStorage.setItem('bpm', bpm);  // eslint-disable-line

    if (shouldMetronomeStart) timer.start();
    }, [bpm]);

  return (
    <div className='main-wrapper'>
      <div>
        <p>BPM</p>
        <h1 className='bpm'>{ bpm }</h1>
      </div>


      <div className="bpm-setters-container">
        <RemoveIcon onClick={ () => setBpm(prev =>  prev <= 60 ? 60 : (prev - 1)) } />

        <Slider min={ 60 } max={ 400 } value={ bpm } sx={{ width: '70%', margin: '0 20px 0 20px' }} onChange={ e => { setBpm(e.target.value); } } />

        <AddIcon onClick={ () => setBpm(prev =>  prev >= 400 ? 400 : (prev + 1))} />
      </div>

      <PlayCircleFilledIcon  onClick={ () => { setShouldMetronomeStart(prev => !prev); } } />

    </div>
  );
}

export default App;
