import { Link } from 'react-router';
import { BsArrowRightShort } from 'react-icons/bs'
import './atlas.css';


export default function Atlas(props: any) {
    return (
        <div id='atlas'>
            <div>
                <Link to="/portfolio?mode=collection" className='portfolio-link'><span>View Collections</span><span><BsArrowRightShort /></span></Link>
                <Link to="/portfolio?mode=date" className='portfolio-link'><span>View By Year</span><span><BsArrowRightShort /></span></Link>
                <Link to="/portfolio?mode=full" className='portfolio-link'><span>View All</span><span><BsArrowRightShort /></span></Link>
            </div>
        </div>
    )
}