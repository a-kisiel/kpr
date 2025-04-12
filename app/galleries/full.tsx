
import { Link, useOutletContext, useSearchParams } from 'react-router';
import Lightbox from '../lightbox/lightbox';
import './gallery.css';

export default function Full() {
    const metadata = useOutletContext();
    const [params, setParams] = useSearchParams();
    const collections = metadata.collections;
    const media = metadata.media;
    const pieces = metadata.pieces;

    const lightboxes: any[] = [];

    if (pieces) {
        Object.keys(pieces).forEach(hash => {
            const piece = pieces[hash];

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
        });
    }

    return (
        <div id='full-gallery' className='gallery-wrapper'>
            {lightboxes}
        </div>
    )
}