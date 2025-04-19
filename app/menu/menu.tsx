import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Link } from 'react-router';
import { FaBars, FaEtsy } from 'react-icons/fa';
import { SiInstagram } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';
import './menu.css';

export default function MenuBar(props: any) {
    const width = 1000;
    
    let menuComponent = 
        <div className='menu-bar'>
            <div id='signature' className='menu-item'><img src='https://katieart.s3.us-east-2.amazonaws.com/signature.png' alt='Katie Kisiel' /></div>
                <div className='nav-menu'>
                    <Accordion disableGutters className='accordion-wrap'>
                        <AccordionSummary className='contact-button'>
                            <div className='menu-item'>Portfolio</div>
                        </AccordionSummary>
                        <AccordionDetails className='contact-expanded' style={{width: '251px'}}>
                            <Link to="/portfolio?mode=collection"><span>View Collections</span><span></span></Link>
                            <Link to="/portfolio?mode=date"><span>View By Year</span><span></span></Link>
                            <Link to="/portfolio?mode=full"><span>View All</span><span></span></Link>
                        </AccordionDetails>
                    </Accordion>
                    <p className='menu-item'> | </p>
                    <Accordion disableGutters className='accordion-wrap'>
                        <AccordionSummary className='contact-button'>
                            <div className='menu-item'>Contact</div>
                        </AccordionSummary>
                        <AccordionDetails className='contact-expanded'>
                            <a href='https://www.instagram.com/kmkisiel/' target='_blank' rel='noreferrer' className='external-link'>
                                <SiInstagram className='contact-icon'/> kmkisiel
                            </a>
                            <a href='mailto:katiekisiel6@gmail.com' target='_blank' rel='noreferrer' className='external-link'>
                                <FiMail className='contact-icon'/> katiekisiel6@gmail.com
                            </a>
                            <a href="" target='_blank' rel='noreferrer' className='external-link' style={{pointerEvents : 'none', opacity: '.5'}}>
                                <FaEtsy className='contact-icon' /> Store (coming soon)
                            </a>
                        </AccordionDetails>
                    </Accordion>
                </div>
        </div>
    if (width < 620) {
        menuComponent = 
            <div className='menu-bar'>
                <Accordion>
                    <AccordionSummary id='accordion-button' expandIcon={<FaBars id='hamburger-icon'/>}>
                        <div id='signature' className='menu-item'><img src='https://katieart.s3.us-east-2.amazonaws.com/signature.png' alt='Katie Kisiel' /></div>
                    </AccordionSummary>
                    <AccordionDetails id='accordion-details'>
                        <div className='nav-menu' style={{margin: 'auto'}}>
                            {/* <AnchorLink className='menu-item' href='#portfolio'>Portfolio</AnchorLink> */}
                            <p className='menu-item'> | </p>
                            {/* <AnchorLink className='menu-item' href='#contact'>Contact</AnchorLink> */}
                            <Accordion>
                                <AccordionSummary id="contact-button" style={{color: '#DEE2E6'}}>Contact</AccordionSummary>
                                <AccordionDetails className='contact-expanded'>
                                    <a href='https://www.instagram.com/kmkisiel/' target='_blank' rel='noreferrer' className='external-link'><SiInstagram className='contact-icon'/> kmkisiel</a>
                                    <a href='mailto:katiekisiel6@gmail.com' target='_blank' rel='noreferrer' className='external-link'><FiMail className='contact-icon'/> katiekisiel6@gmail.com</a>
                                    <a href="" target='_blank' rel='noreferrer' className='external-link' style={{pointerEvents : 'none', opacity: '.5'}}><FaEtsy className='contact-icon' /> Store (coming soon)</a>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
    }
    return (
        <div className='menu-wrapper' style={{height: '60px'}}>
            {/* <Fade> */}
                {menuComponent}
            {/* </Fade> */}
            <div className='clear'></div>
        </div>
    )
}