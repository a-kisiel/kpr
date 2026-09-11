import { useState } from 'react';
import Lightbox from '~/lightbox/lightbox';
import './exhibit.css';
import { Link } from 'react-router';

export default function Exhibit (props: any) {
    const hash = props.hash;
    const metadata = props.metadata;
    const media = metadata.media;
    const collections = metadata.collections;

    if (!metadata.pieces)
        return;

    const piece = metadata.pieces.find((p: any) => p.hash === hash);
    const srcSet = `https://d239vh0ohrdra5.cloudfront.net/hashed_compressed/${hash}.webp` + ', ' + `https://d239vh0ohrdra5.cloudfront.net/hashed_uncompressed/${hash}.jpg`;

    // Description
    const description = piece.description ?
        <div className='exhibit-description'>{piece.description}</div> :
        null;

    // Collections
    let collectionsDiv = null;
    if (piece.collections?.length > 0) {
        const collectionItems: any[] = [];
        piece.collections.forEach((ck: number) => {
            const c = collections.find((c: any) => c.id === ck);

            const dateSection = c.initial_date && c.end_date ?
                <div className='exhibit-collection-date'>
                    <span>{c.initial_date} - {c.end_date}</span>
                </div>
                :
                null;

            collectionItems.push(<div className='exhibit-collection'>
                <div className='exhibit-collection-header'>{c.title}</div>
                {dateSection}
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
    metadata.media.forEach((m: any) => {
        if (piece.media.includes(m.id)) {
            parsedMedia.push(m);
            mediaItems.push(<li><Link to={`/portfolio?media=${m.id}`}>{m.title}</Link></li>);
        }
    })
    const mediaDiv = <ul className='materials-list'>{mediaItems}</ul>;

    // Related imgs
    let relatedContent: any = null;
    const relatedItems: any[] = [];
    metadata.pieces.forEach((p: any) => {
        if (p.active && piece.children.includes(p.id)) {
            const webpSrc = `https://d239vh0ohrdra5.cloudfront.net/hashed_compressed/${p.hash}.webp`;
            const jpgSrc = `https://d239vh0ohrdra5.cloudfront.net/hashed_uncompressed/${p.hash}.jpg`;
            const src = webpSrc + ', ' + jpgSrc;
            relatedItems.push(<li className='related-img'>
                <Lightbox
                    source={src}
                    webpSrc={webpSrc}
                    jpgSrc={jpgSrc}
                    hash={p.hash}
                    name={p.title}
                    media={parsedMedia}
                    startDate={p.start_date}
                    endDate={p.end_date}
                    useSmall={true}
                    noDescription={true}
                />
            </li>);
        }
    });
    if (relatedItems.length > 0) {
        relatedContent = <ul className='exhibit-related-imgs'>{relatedItems}</ul>
    }

    let date = '';
    if (piece.start_date)
        date += piece.start_date;
    if (piece.start_date && piece.end_date)
        date += ' - ';
    if (piece.end_date)
        date += piece.end_date;

    return (
        <div id="exhibit">
            <div className='exhibit-title'>
                <h1>{piece.title}</h1>
                <span>{date}</span>
            </div>
            <div className='exhibit-wrap'>
                <div className='exhibit-imgs'>
                    <div className='exhibit-lightbox'>
                        <Lightbox
                            source={srcSet}
                            hash={hash}
                            name={piece.title}
                            media={parsedMedia}
                            startDate={piece.start_date}
                            endDate={piece.end_date}
                            noDescription={true}
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