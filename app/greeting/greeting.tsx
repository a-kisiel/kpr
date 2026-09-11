import { useState } from 'react';
import './greeting.css';
import Atlas from '~/atlas/atlas';

export default function Greeting (props: any) {
    const metadata = props.metadata;    

    const [wallpaperTitle, setWallpaperTitle] = useState('');
    const [wallpaperSrc, setwallpaperSrc] = useState('');

    if (metadata?.pieces && !wallpaperTitle) {
        const wallpapers = Object.keys(metadata.pieces).filter((k: any) => metadata.pieces[k].is_wallpaper === true)
        const random = +Object.keys(wallpapers)[Math.floor(Math.random() * wallpapers.length)];
        const w = metadata.pieces[wallpapers[random]];
        setWallpaperTitle(w.title);
        setwallpaperSrc(`url(https://d239vh0ohrdra5.cloudfront.net/hashed_compressed/${w.hash}.webp)`);
    }

    return (
        <div id='greeting' style={{backgroundImage: wallpaperSrc}}>
            <Atlas />
        </div>
    )
}