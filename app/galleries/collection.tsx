import { useContext, useState, useEffect } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router';
import Lightbox from '../lightbox/lightbox';
import './gallery.css';

export default function Collection(props: any) {
    const metadata = useOutletContext();
    const [params, setParams] = useSearchParams();
    const collections = metadata.collections;
    const media = metadata.media;
    const pieces = metadata.pieces;
    
    const selectOptions: any[] = [];
    if (media) {
        Object.values(media).forEach(m => {
            selectOptions.push({
                value: m,
                label: m
            });
        });
    }

    return (
        <div id='collection-gallery'>
            [collection!]
        </div>
    )
}