import Slider from '@mui/material/Slider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useContext } from 'react';
import MetronomeContext from './context/MetronomeContext';
import Beats from './components/Beats';
import './App.css';
import InstructionsModal from './components/InstructionsModal';

function App() {
  const { bpm, setBpm,increaseBpm, decreaseBpm, beats, setBeats, beatCounting, setShouldMetronomeStart, shouldMetronomeStart } = useContext(MetronomeContext);

  return (
    <>
      <InstructionsModal />
      <div className='main-wrapper'>
        <div className='bpm-container'>
          <h1>{ bpm }</h1>
          <div>
            <p>BPM</p>
          </div>
        </div>
        <div className="bpm-setters-container">
          <RemoveIcon sx={{ fontSize: '5rem' }} onClick={ () => decreaseBpm() } />

          <Slider
            className="slider"
            min={ 60 }
            max={ 400 }
            value={ bpm }
            injectFirst
            onChange={ e => { setBpm(e.target.value); } }
          />

          <AddIcon sx={{ fontSize: '5rem' }} onClick={ () => increaseBpm() } />
        </div>

        <Beats beats={ beats } beatCounting={ beatCounting } />

        <div className="beats-setters-container">
          <p>Beats:</p>
          <div>
            <RemoveIcon sx={{ fontSize: '3rem' }} onClick={ () => setBeats(prev =>  prev <= 1 ? 1 : (prev - 1)) } />
            <p>{ beats }</p>
            <AddIcon sx={{ fontSize: '3rem' }} onClick={ () => setBeats(prev =>  prev >= 10 ? 10 : (prev + 1)) } />
          </div>
        </div>
         
        <button className="metronome-toggler">
          {
            shouldMetronomeStart == true ? 
              <PauseIcon onClick={ () => { setShouldMetronomeStart(prev => !prev); } } />
            :
              <PlayArrowIcon onClick={ () => { setShouldMetronomeStart(prev => !prev); } } />
          }
        </button>

      </div>
    </>
  );
}

export default App;
