import PropTypes from 'prop-types';

function Beats({beats, beatCounting}) {
  return (
    <div className='beats-container'>

      {
        Array.from({length: beats}, (_, i) => i + 1).map((e, index) => (
          <div key={e} className={`metronome-beats${index === beatCounting ? " selected" : '' }`}></div>
        ))
      }

    </div>
  );
}

Beats.propTypes = {
  beats: PropTypes.number,
  beatCounting: PropTypes.number
};

export default Beats;