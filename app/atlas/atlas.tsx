import { BsArrowRightShort } from 'react-icons/bs'
import './atlas.css';


export default function Atlas(props: any) {

    const changeGallery = (mode: String) => {
        props.setGalleryType(mode);
        props.toggleShowAtlas(!props.showAtlas);
    };

    return (
        <div id='atlas'>
            <div>
                <a href="/portfolio" className='portfolio-link'><span>View Collections</span><span><BsArrowRightShort /></span></a>
                <a href="/portfolio" className='portfolio-link'><span>View By Year</span><span><BsArrowRightShort /></span></a>
                <a href="/portfolio" className='portfolio-link'><span>View All</span><span><BsArrowRightShort /></span></a>
            </div>
            <div></div>
        </div>
    )
}