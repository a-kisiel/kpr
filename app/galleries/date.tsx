import { useOutletContext, useSearchParams } from 'react-router';
import Lightbox from '../lightbox/lightbox';
import './gallery.css';

export default function Date(props: any) {
    const metadata = useOutletContext();
    const collections = metadata.collections;
    const media = metadata.media;
    const pieces = metadata.pieces;
    
    const years = {};
    if (pieces) {
        const pattern = '-*([^\/]+)$';
        Object.keys(pieces).forEach(hash => {
            const piece = pieces[hash];
            const year = piece.date.match(pattern)[0];
            if (!years[year])
                years[year] = [];

            const srcSet = `https://katieart.s3.us-east-2.amazonaws.com/hashed_compressed/${hash}.webp` + ', ' + `https://katieart.s3.us-east-2.amazonaws.com/hashed_uncompressed/${hash}.jpg`;
            const parsedMedia: String[] = [];
            piece.media.forEach((m: number) => {
                parsedMedia.push(media[m]);
            });

            years[year].push(<div className="box">
                <Lightbox
                    source={srcSet}
                    name={piece.title}
                    media={parsedMedia}
                    date={piece.date}
                />
            </div>);
        });
    }

    const content = [];
    Object.keys(years).forEach(y => [
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