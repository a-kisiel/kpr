import { useState } from 'react';
import './greeting.css';

export default function Greeting (props: any) {
    const metadata = props.metadata;    

    const [wallpaperTitle, setWallpaperTitle] = useState('');
    const [wallpaperSrc, setwallpaperSrc] = useState('');

    if (metadata?.pieces && !wallpaperTitle) {
        const wallpapers = Object.keys(metadata.pieces).filter((k: any) => metadata.pieces[k].wallpaper === true)
        const random = +Object.keys(wallpapers)[Math.floor(Math.random() * wallpapers.length)];
        const w = metadata.pieces[wallpapers[random]];
        setWallpaperTitle(w.title);
        setwallpaperSrc(`url(https://katieart.s3.us-east-2.amazonaws.com/hashed_compressed/wallpapers/${wallpapers[random]}.webp)`);
    }
    
    return (
        <div id='greeting' style={{backgroundImage: wallpaperSrc}}>
            <div className='greeting-title-wrapper'></div>
            <div style={{display: 'flex', flexDirection: 'column', margin: 'auto auto 0 auto', width: '100%'}}>
                <div className='greeting-title'>{wallpaperTitle}</div>
            </div>
        </div>
    )
}