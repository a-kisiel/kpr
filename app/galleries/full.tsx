
import { Link, useOutletContext, useSearchParams } from 'react-router';
import Lightbox from '../lightbox/lightbox';
import './gallery.css';

export default function Full(props: any) {
    const metadata = Object.create(useOutletContext());
    const media = metadata.media;
    const pieces = metadata.pieces ?? [];

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
        pieces.forEach((piece: any) => {
            if (
                piece.omitFromGallery || piece.parent_id || piece.parent_id ||
                (selectedMedia.length > 0 && !piece.media.some((m:number) => selectedMedia.includes(m)))
            ) {
                return;
            }

            const webpSrc = `https://d239vh0ohrdra5.cloudfront.net/hashed_compressed/${piece.hash}.webp`;
            const jpgSrc = `https://d239vh0ohrdra5.cloudfront.net/hashed_uncompressed/${piece.hash}.jpg`;

            const parsedMedia: String[] = [];
            piece.media.forEach((m: number) => {
                parsedMedia.push(media.find((medium: any) => medium.id === m));
            });

            lightboxes.push(<div className="box">
                <Lightbox
                    hash={piece.hash}
                    source={`${webpSrc}, ${jpgSrc}`}
                    webpSrc={webpSrc}
                    jpgSrc={jpgSrc}
                    name={piece.title}
                    media={parsedMedia}
                    startDate={piece.start_date}
                    endDate={piece.end_date}
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