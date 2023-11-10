import { useState } from "react";
import MetronomeContext from "./MetronomeContext";
import PropTypes from 'prop-types';

function initialBpm() {
  const bpm = Number(localStorage.getItem('bpm'));  // eslint-disable-line

  if (!bpm) return 60;

  return bpm;
}

function MetronomeProvider({children}) {
  const [bpm, setBpm] = useState(initialBpm);

  function increaseBpm() {
    setBpm(prev =>  prev >= 400 ? 400 : (prev + 1));
  }

  function decreaseBpm() {
    setBpm(prev =>  prev <= 60 ? 60 : (prev - 1));
  }

  return (
    <MetronomeContext.Provider value={{bpm, setBpm,increaseBpm, decreaseBpm}}>
      { children }
    </MetronomeContext.Provider>
  );
}

MetronomeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MetronomeProvider;