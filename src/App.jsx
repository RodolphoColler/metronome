import Slider from '@mui/material/Slider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useContext } from 'react';
import MetronomeContext from './context/MetronomeContext';
import Beats from './components/Beats';
import './App.css';
import InstructionsModal from './components/InstructionsModal';

function App() {
  const { bpm, setBpm,increaseBpm, decreaseBpm, beats, setBeats, beatCounting, setShouldMetronomeStart } = useContext(MetronomeContext);

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
            sx={{
              width: '70%',
              margin: '0 20px 0 20px',
              height: '8px',
              '& .MuiSlider-thumb': {
                height: 35,
                width: 35,
                '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                  boxShadow: 'none',
                },
              },
            }}
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

        <PlayCircleFilledIcon className="metronome-toggler" onClick={ () => { setShouldMetronomeStart(prev => !prev); } } />
      </div>
    </>
  );
}

export default App;
