import { useState } from 'react';
import { Link } from 'react-router';
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
  
  const imgSet = `url(${props.webpSrc}), url(${props.jpgSrc})`;

  const clickable = props.useSmall ?
    <div 
      onClick={handleOpen}
      className='img-sm'
      title={props.name}
      aria-label={props.name}
      alt={props.name}
      style={{"backgroundImage": imgSet}}
    ></div>
    :
    <img
      onClick={handleOpen}
      srcSet={props.source}
      className='gallery-img'
      aria-label={props.name}
      alt={props.name}
    />
    
  const title = props.useSmall ?
    null :
    <div className='gallery-img-title'>{props.name}</div>;

  const mediaArr: string[] = [];
  props.media.forEach((m: any) => mediaArr.push(m?.title));

  let date = '';
  if (props.startDate)
    date += props.startDate;
  if (props.startDate && props.endDate)
    date += ' - ';
  if (props.endDate)
    date += props.endDate;

  const description = props.noDescription ?
    null :
    <div className='img-description'>
      <Link to={`/portfolio/${props.hash}`}>
        <h2 className="img-title">{props.name}</h2>
        <h2 className='img-media'>{mediaArr.join(', ')}</h2>
        <h2 className='img-date'>{date}</h2>
        <h2 className='view-page' style={{marginTop: '5px', marginBottom: '5px'}}>View more</h2>
      </Link>
    </div>

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
            {description}
          </div>
        </Modal>
      </div>
    </div>
  );
}
