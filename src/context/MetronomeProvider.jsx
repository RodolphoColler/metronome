import MetronomeContext from "./MetronomeContext";
import PropTypes from 'prop-types';

function MetronomeProvider({children}) {
  return (
    <MetronomeContext.Provider>
      { children }
    </MetronomeContext.Provider>
  );
}

MetronomeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MetronomeProvider;