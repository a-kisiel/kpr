import { useState } from 'react';
import './greeting.css';
import Atlas from '~/atlas/atlas';

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
            <Atlas />
        </div>
    )
}