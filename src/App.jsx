import Slider from '@mui/material/Slider';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useHotkeys } from 'react-hotkeys-hook';
import { useContext, useEffect, useState } from 'react';
import Timer from './Timer';
import MetronomeContext from './context/MetronomeContext';
import Beats from './components/beats';
import './App.css';

function App() {
  const { bpm, increaseBpm, decreaseBpm, setBpm } = useContext(MetronomeContext);
  const [shouldMetronomeStart, setShouldMetronomeStart] =  useState(false);
  const [beats, setBeats] = useState(4);
  const [beatCounting, setBeatCounting] = useState(0);
  const [timer] = useState(new Timer(bpm, setBeatCounting, beats));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useHotkeys('ArrowRight, Add', () => increaseBpm());
  useHotkeys('ArrowLeft, Subtract', () => decreaseBpm());
  useHotkeys(' ', () => setShouldMetronomeStart(prev => !prev));
  useHotkeys('ArrowUp', () => setBeats(prev =>  prev >= 10 ? 10 : (prev + 1)));
  useHotkeys('ArrowDown', () => setBeats(prev =>  prev <= 1 ? 1 : (prev - 1)));

  useEffect(() => {
    if (shouldMetronomeStart) return timer.start();

    timer.stop();
  }, [shouldMetronomeStart]);

  useEffect(() => {
    timer.stop();

    timer.bpm = bpm;
    timer.beats = beats;

    localStorage.setItem('bpm', bpm);  // eslint-disable-line

    if (shouldMetronomeStart) timer.start();
    }, [bpm, beats]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className='modal-wrapper'>
          <h2>Hotkeys</h2>
          <div className='instruction-wrapper'>
            <ArrowBackIcon className='key-wrapper' />
            <ArrowForwardIcon className='key-wrapper' />
            <p>Left and Right key are used to decrease and increase bpm respectively.</p>
          </div>
          <div className='instruction-wrapper'>
            <ArrowDownwardIcon className='key-wrapper' />
            <ArrowUpwardIcon className='key-wrapper' />
            <p>Downward and Upward key are used to decrease and increase beats respectively.</p>
          </div>
          <div className='instruction-wrapper'>
            <SpaceBarIcon className='key-wrapper' />
            <p>Space Key is used to start and stop metronome.</p>
          </div>
        </div>
      </Modal>
      <div className='modal-button'>
        <QuestionMarkIcon onClick={handleOpen}/>
      </div>
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
