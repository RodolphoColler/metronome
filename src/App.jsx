import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Slider } from '@mui/material';
import { useState } from 'react';

function App() {
  const [bpm, setBpm] = useState(40);

  return (
    <div>
      <h1>{ bpm } bpm</h1>
      <div>
        <RemoveIcon onClick={ () => setBpm(prev =>  prev <= 40 ? 40 : (prev - 1)) }/>

        <Slider min={ 40 } max={ 400 } value={ bpm } onChange={ e => { setBpm(e.target.value); } } />

        <AddIcon onClick={ () => setBpm(prev =>  prev >= 400 ? 400 : (prev + 1))}/>
      </div>

      <PlayCircleFilledIcon />

    </div>
  );
}

export default App;
