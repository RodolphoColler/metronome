import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useHotkeys } from 'react-hotkeys-hook';
import { Slider } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Timer from './Timer';
import './App.css';
import MetronomeContext from './context/MetronomeContext';
import Beats from './components/beats';

function App() {
  const { bpm, increaseBpm, decreaseBpm, setBpm } = useContext(MetronomeContext);
  useHotkeys('ArrowRight, Add', () => increaseBpm());
  useHotkeys('ArrowLeft, Subtract', () => decreaseBpm());
  useHotkeys(' ', () => setShouldMetronomeStart(prev => !prev));
  const [shouldMetronomeStart, setShouldMetronomeStart] =  useState(false);
  const [beats] = useState(4);
  const [beatCounting, setBeatCounting] = useState(0);
  const [timer] = useState(new Timer(bpm, setBeatCounting, beats));

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
      <div className='bpm-container'>
        <p>BPM</p>
        <h1>{ bpm }</h1>
      </div>

      <div className="bpm-setters-container">
        <RemoveIcon sx={{ fontSize: '5rem' }} onClick={ () => decreaseBpm() } />

        <Slider min={ 60 } max={ 400 } value={ bpm } sx={{ width: '70%', margin: '0 20px 0 20px' }} onChange={ e => { setBpm(e.target.value); } } />

        <AddIcon sx={{ fontSize: '5rem' }} onClick={ () => increaseBpm() } />
      </div>

      <Beats beats={ beats } beatCounting={ beatCounting } />

      <PlayCircleFilledIcon className="metronome-toggler" onClick={ () => { setShouldMetronomeStart(prev => !prev); } } />
    </div>
  );
}

export default App;
