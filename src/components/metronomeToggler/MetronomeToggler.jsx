import { useContext } from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MetronomeContext from '../../context/MetronomeContext';
import './MetronomeToggler.css';

function MetronomeToggler() {
  const { setShouldMetronomeStart, shouldMetronomeStart } = useContext(MetronomeContext);

  return (
		<>
			<button className="metronome-toggler">
			{
					shouldMetronomeStart == true ? 
					<PauseIcon onClick={ () => { setShouldMetronomeStart(prev => !prev); } } />
					:
					<PlayArrowIcon onClick={ () => { setShouldMetronomeStart(prev => !prev); } } />
			}
			</button>
		</>
	)
}

export default MetronomeToggler;
