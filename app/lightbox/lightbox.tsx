import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './lightbox.css';

export default function Lightbox(props: any) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='gallery-img-wrap'>
      <img
        onClick={handleOpen}
        srcSet={props.source}
        className='gallery-img'
        aria-label={props.name}
        alt={props.name}
      />
      <div className='gallery-img-title'>{props.name}</div>
        <div className='lightbox-wrapper'>
          <Modal
              className='lightbox'
              open={open}
              onClose={handleClose}
              closeAfterTransition
          >
            <div className="img-lightbox">
              <TransformWrapper doubleClick={{mode: 'reset'}}>
                <TransformComponent>
                  <img srcSet={props.source} className='zoomable' alt=""/>
                </TransformComponent>
              </TransformWrapper>
              <div className='img-description'>
                <h2 className="img-title">{props.name}</h2>
                <h2 className='img-media'>{props.media.join(', ')}</h2>
                <h2 className='img-date'>{props.date}</h2>
              </div>
            </div>
          </Modal>
        </div>
    </div>
  );
}
