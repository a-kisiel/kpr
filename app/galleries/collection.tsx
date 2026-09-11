import { useOutletContext } from 'react-router';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Lightbox from '../lightbox/lightbox';
import './gallery.css';

export default function Collection(props: any) {
    const metadata = Object.create(useOutletContext());
    const collections = metadata.collections;
    const media = metadata.media;
    const pieces = metadata.pieces;
    
    const accordions: any[] = [];
    if (collections && pieces) {
        Object.keys(collections).forEach(ck => {
            const collection = collections[ck];

            const lightboxes:any[] = [];
            pieces.forEach((piece: any) => {
                if (piece.omitFromGallery || piece.parent_id || !piece.active) {
                    return;
                }

                if (piece.collections && piece.collections.includes(collection.id)) {
                    const srcSet = `https://d239vh0ohrdra5.cloudfront.net/hashed_compressed/${piece.hash}.webp` + ', ' + `https://d239vh0ohrdra5.cloudfront.net/hashed_uncompressed/${piece.hash}.jpg`;
                    const parsedMedia: String[] = [];
                    piece.media.forEach((m: number) => {
                        parsedMedia.push(media.find((medium: any) => medium.id === m));
                    });
        
                    lightboxes.push(<div className="box">
                        <Lightbox
                            hash={piece.hash}
                            source={srcSet}
                            name={piece.title}
                            media={parsedMedia}
                            startDate={piece.start_date}
                            endDate={piece.end_date}
                        />
                    </div>);
                }
            });

            accordions.push(
                <Accordion className='collection-accordion'>
                    <AccordionSummary className='accordion-summary'>
                        <div className='collection-title'>{collection.title}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='collection-gallery gallery-wrapper'>
                            {lightboxes}
                        </div>
                    </AccordionDetails>
                </Accordion>
            );
        });
    }

    const content = <div>
        {accordions}
    </div>

    return (
        <div id='collection-galleries'>
            { content }
        </div>
    )
}