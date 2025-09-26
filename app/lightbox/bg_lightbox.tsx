import { useState } from 'react';
import { Link } from 'react-router';
import Modal from '@mui/material/Modal';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './lightbox.css';
import { makeStyles } from '@mui/material';

export default function Lightbox(props: any) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const imgSet = `url(${props.webpSrc}), url(${props.jpgSrc})`;

  const clickable = <div 
      onClick={handleOpen}
      className='lightbox-icon'
      title={props.name}
      aria-label={props.name}
      alt={props.name}
      style={{
        "width": props.width,
        "height": props.height,
        "backgroundImage": imgSet,
      }}
    ></div>
    
  const title = <div className='gallery-img-title'>{props.name}</div>;

  return (
    <div className='gallery-img-wrap'>
      {clickable}
      {title}
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
                <img srcSet={props.source} className='zoomable' alt={props.name}/>
              </TransformComponent>
            </TransformWrapper>
            <div className='img-description'>
              <div className='img-description-left'>
                <h2 className="img-title">{props.name}</h2>
                <h2 className='img-media'>{props.media.join(', ')}</h2>
                <h2 className='img-date'>{props.date}</h2>  
              </div>
              <div className='img-description-right'>
                <Link to={`/portfolio/${props.hash}`}>See more</Link>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}