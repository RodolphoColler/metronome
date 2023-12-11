import { useEffect, useState } from "react";
import MetronomeContext from "./MetronomeContext";
import PropTypes from 'prop-types';
import Timer from '../Timer';
import { useHotkeys } from 'react-hotkeys-hook';

function initialBpm() {
  const bpm = Number(localStorage.getItem('bpm'));  // eslint-disable-line

  if (!bpm) return 60;

  return bpm;
}

function MetronomeProvider({children}) {
  const [bpm, setBpm] = useState(initialBpm);
  const [beats, setBeats] = useState(4);
  const [beatCounting, setBeatCounting] = useState(0);
  const [timer] = useState(new Timer(bpm, setBeatCounting, beats));
  const [shouldMetronomeStart, setShouldMetronomeStart] =  useState(false);
  useHotkeys('ArrowRight, Add', () => increaseBpm());
  useHotkeys('ArrowLeft, Subtract', () => decreaseBpm());
  useHotkeys(' ', () => setShouldMetronomeStart(prev => !prev));
  useHotkeys('ArrowUp', () => setBeats(prev =>  prev >= 10 ? 10 : (prev + 1)));
  useHotkeys('ArrowDown', () => setBeats(prev =>  prev <= 1 ? 1 : (prev - 1)));


  function increaseBpm() {
    setBpm(prev =>  prev >= 400 ? 400 : (prev + 1));
  }

  function decreaseBpm() {
    setBpm(prev =>  prev <= 60 ? 60 : (prev - 1));
  }

  useEffect(() => {
    timer.stop();

    timer.bpm = bpm;
    timer.beats = beats;

    localStorage.setItem('bpm', bpm);  // eslint-disable-line

    if (shouldMetronomeStart) timer.start();
    }, [bpm, beats]);

  return (
    <MetronomeContext.Provider value={{bpm, setBpm,increaseBpm, decreaseBpm, beats, setBeats, setBeatCounting, beatCounting, shouldMetronomeStart, setShouldMetronomeStart, timer }}>
      { children }
    </MetronomeContext.Provider>
  );
}

MetronomeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MetronomeProvider;