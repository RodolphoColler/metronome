import Modal from '@mui/material/Modal';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';

function InstructionsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className='modal-wrapper'>
          <h2>Hotkeys</h2>
          <div className='instruction-wrapper'>
            <div className='hotkeys-icon-wraper'>
              <ArrowBackIcon className='key-wrapper' />
              <ArrowForwardIcon className='key-wrapper' />
            </div>
            <p>Left and Right key are used to decrease and increase bpm respectively.</p>
          </div>
          <div className='instruction-wrapper'>
            <div className='hotkeys-icon-wraper'>
              <ArrowDownwardIcon className='key-wrapper' />
              <ArrowUpwardIcon className='key-wrapper' />
            </div>
            <p>Downward and Upward key are used to decrease and increase beats respectively.</p>
          </div>
          <div className='instruction-wrapper'>
            <div className='hotkeys-icon-wraper' >
              <SpaceBarIcon className='key-wrapper' />
            </div>
            <p>Space key is used to start and stop metronome.</p>
          </div>
        </div>
      </Modal>
      <div className='modal-button'>
        <QuestionMarkIcon onClick={handleOpen}/>
      </div>
    </>
  );
}

export default InstructionsModal;
