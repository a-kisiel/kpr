import { useOutletContext, useSearchParams } from 'react-router';
import Lightbox from '../lightbox/lightbox';
import './gallery.css';

export default function Date(props: any) {
    const metadata = Object.create(useOutletContext());
    const media = metadata.media;
    const pieces = metadata.pieces ?? [];
    
    const years = {};
    if (pieces) {
        const pattern = '-*([^\/]+)$';
        pieces.forEach((piece: any) => {
            if (piece.omitFromGallery || piece.parent_id || !piece.active || !piece.end_date) {
                return;
            }
            const year = piece.end_date.match(pattern)[0];
            if (!years[year])
                years[year] = [];

            const srcSet = `https://d239vh0ohrdra5.cloudfront.net/hashed_compressed/${piece.hash}.webp` + ', ' + `https://d239vh0ohrdra5.cloudfront.net/hashed_uncompressed/${piece.hash}.jpg`;
            const parsedMedia: String[] = [];
            piece.media.forEach((m: number) => {
                parsedMedia.push(media.find((medium: any) => medium.id === m));
            });

            years[year].push(<div className="box">
                <Lightbox
                    hash={piece.hash}
                    source={srcSet}
                    name={piece.title}
                    media={parsedMedia}
                    startDate={piece.start_date}
                    endDate={piece.end_date}
                />
            </div>);
        });
    }

    const reverseChron = Object.keys(years).sort((a,b) => b - a);

    const content = [];
    reverseChron.forEach(y => [
        content.push(<div>
            <div className='date-title'>{y}</div>
            <div className='gallery-wrapper'>
                {years[y]}
            </div>
        </div>)
    ]);
    
    return (
        <div id='date-gallery'>
            {content}
        </div>
    )
}