
import { Link, useOutletContext, useSearchParams } from 'react-router';
import Lightbox from '../lightbox/lightbox';
import './gallery.css';

export default function Full(props: any) {
    const metadata = useOutletContext();
    const collections = metadata.collections;
    const media = metadata.media;
    const pieces = metadata.pieces;

    const selectedMedia: number[] = [];
    if (props.params) {
        const mediaFilters = props.params.getAll('media')[0];
        mediaFilters?.split(',').forEach((m: string) => {
            if (m !== '')
                selectedMedia.push(+m);
        });
    }

    const lightboxes: any[] = [];

    if (pieces) {
        Object.keys(pieces).forEach(hash => {
            const piece = pieces[hash];
            if (
                piece.omitFromGallery || piece.related ||
                (selectedMedia.length > 0 && !piece.media.some((m:number) => selectedMedia.includes(m)))
            ) {
                return;
            }

            const srcSet = `https://katieart.s3.us-east-2.amazonaws.com/hashed_compressed/${hash}.webp` + ', ' + `https://katieart.s3.us-east-2.amazonaws.com/hashed_uncompressed/${hash}.jpg`;

            const parsedMedia: String[] = [];
            piece.media.forEach((m: number) => {
                parsedMedia.push(media[m]);
            });

            lightboxes.push(<div className="box">
                <Lightbox
                    source={srcSet}
                    hash={hash}
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