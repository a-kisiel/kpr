import { useState } from 'react';
import Lightbox from '~/lightbox/lightbox';
import './exhibit.css';
import { dividerClasses } from '@mui/material';
import { Link } from 'react-router';

export default function Exhibit (props: any) {
    const hash = props.hash;
    const metadata = props.metadata;
    const media = metadata.media;
    const collections = metadata.collections;

    if (!metadata.pieces)
        return;

    const piece = metadata.pieces[hash];
    const srcSet = `https://katieart.s3.us-east-2.amazonaws.com/hashed_compressed/${hash}.webp` + ', ' + `https://katieart.s3.us-east-2.amazonaws.com/hashed_uncompressed/${hash}.jpg`;

    // Description
    let description = null;
    if (piece.description) {
        description = <div className='exhibit-description'>{piece.description}</div>;
    }

    // Collections
    let collectionsDiv = null;
    if (piece.collections) {
        const collectionItems: any[] = [];
        piece.collections.forEach((ck: number) => {
            const c = collections[ck];
            collectionItems.push(<div className='exhibit-collection'>
                <div className='exhibit-collection-header'>{c.title}</div>
                <div className='exhibit-collection-date'>
                    <span>{c.initial_date} - {c.end_date}</span>
                </div>
                <div className='exhibit-collection-location'>{c.location}</div>
            </div>);
        });

        collectionsDiv = <div className='exhibit-collections'>
            <span className='content-header'>COLLECTIONS</span>
            <span className='content-underline'></span>
            {collectionItems}
        </div>;
    }

    // Media
    const parsedMedia: String[] = [];
    const mediaItems: any[] = [];
    piece.media.forEach((m: number) => {
        const value = media[m];
        parsedMedia.push(value);
        mediaItems.push(<li><Link to={`/portfolio?media=${m}`}>{value}</Link></li>);
    });
    const mediaDiv = <ul className='materials-list'>{mediaItems}</ul>;

    // Related imgs
    let relatedContent: any = null;
    const relatedItems: any[] = [];
    Object.keys(metadata.pieces).forEach((pk: any) => {
        const p = metadata.pieces[pk];
        if (p.related && p.related === hash) {
            const webpSrc = `https://katieart.s3.us-east-2.amazonaws.com/hashed_compressed/${pk}.webp`;
            const jpgSrc = `https://katieart.s3.us-east-2.amazonaws.com/hashed_uncompressed/${pk}.jpg`;
            const src = webpSrc + ', ' + jpgSrc;
            relatedItems.push(<li className='related-img'>
                <Lightbox
                    source={src}
                    webpSrc={webpSrc}
                    jpgSrc={jpgSrc}
                    hash={pk}
                    name={p.title}
                    media={parsedMedia}
                    date={p.date}
                    useSmall={true}
                />
            </li>);
        }
    });
    if (relatedItems.length > 0) {
        relatedContent = <ul className='exhibit-related-imgs'>{relatedItems}</ul>
    }

    return (
        <div id="exhibit">
            <div className='exhibit-title'>
                <h1>{piece.title}</h1>
                <span>{piece.date}</span>
            </div>
            <div className='exhibit-wrap'>
                <div className='exhibit-imgs'>
                    <div className='exhibit-lightbox'>
                        <Lightbox
                            source={srcSet}
                            hash={hash}
                            name={piece.title}
                            media={parsedMedia}
                            date={piece.date}
                        />
                    </div>
                    {relatedContent}
                </div>
                <div className='exhibit-content'>
                    {description}
                    {collectionsDiv}
                    <div className='exhibit-materials'>
                        <span className='content-header'>MATERIALS</span>
                        <span className="content-underline"></span>
                        {mediaDiv}
                    </div>
                </div>
            </div>
            
        </div>
    )
}