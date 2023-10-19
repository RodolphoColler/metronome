import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Slider } from '@mui/material';
import { useState } from 'react';

function App() {
  const [bpm, setBpm] = useState(40);

  return (
    <div>
      <h1>300 bpm</h1>
      <div>
        <RemoveIcon />
        <Slider min={40} max={400} onChange={ e => { setBpm(e.target.value); } } />
        <AddIcon />
      </div>
    </div>
  );
}

export default App;
