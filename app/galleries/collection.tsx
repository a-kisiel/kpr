import { useOutletContext } from 'react-router';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Lightbox from '../lightbox/lightbox';
import './gallery.css';

export default function Collection(props: any) {
    const metadata = useOutletContext();
    const collections = metadata.collections;
    const media = metadata.media;
    const pieces = metadata.pieces;
    
    const accordions: any[] = [];
    if (collections && pieces) {
        Object.keys(collections).forEach(ck => {
            const collection = collections[ck];
            const collectionID = +ck;

            const lightboxes:any[] = [];
            Object.keys(pieces).forEach(hash => {
                const piece = pieces[hash];

                if (piece.collections && piece.collections.includes(collectionID)) {
                    const srcSet = `https://katieart.s3.us-east-2.amazonaws.com/hashed_compressed/${hash}.webp` + ', ' + `https://katieart.s3.us-east-2.amazonaws.com/hashed_uncompressed/${hash}.jpg`;
                    const parsedMedia: String[] = [];
                    piece.media.forEach((m: number) => {
                        parsedMedia.push(media[m]);
                    });
        
                    lightboxes.push(<div className="box">
                        <Lightbox
                            source={srcSet}
                            name={piece.title}
                            media={parsedMedia}
                            date={piece.date}
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