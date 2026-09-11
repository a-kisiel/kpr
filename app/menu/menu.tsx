import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from 'react-router';
import { FaBars, FaEtsy } from 'react-icons/fa';
import { SiInstagram } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';
import './menu.css';
import { useState } from 'react';

export default function MenuBar(props: any) {   
    const [portfolioOpen, setPortfolio] = useState(false);
    const [portfolioAnchor, setPortfolioAnchor] = useState(null);
    const [contactOpen, setContact] = useState(false);
    const [contactAnchor, setContactAnchor] = useState(null);

    const openPortfolio = (e: any) => {
        setPortfolio(true);
        setPortfolioAnchor(e.currentTarget);
    };
    const closePortfolio = () => setPortfolio(false);
    const openContact = (e: any) => {
        setContact(true);
        setContactAnchor(e.currentTarget);
    };
    const closeContact = () => setContact(false);
    
    const menuComponent = 
        <div id='desktop-menu' className='menu-bar'>
            <div id='signature' className='menu-item'><img src='https://d239vh0ohrdra5.cloudfront.net/signature.png' alt='Katie Kisiel' /></div>
                <div className='nav-menu'>
                    <Button onClick={openPortfolio}>Portfolio</Button>
                    <Menu
                        id="portfolio-menu-component"
                        className='menu-component'
                        aria-haspopup="true"
                        open={portfolioOpen}
                        onClose={closePortfolio}
                        anchorEl={portfolioAnchor}
                    >
                        <MenuItem onClick={closePortfolio}>
                            <Link to="/portfolio?mode=collection"><span>View Collections</span><span></span></Link>
                        </MenuItem>
                        <MenuItem onClick={closePortfolio}>
                            <Link to="/portfolio?mode=date"><span>View By Year</span><span></span></Link>
                        </MenuItem>
                        <MenuItem onClick={closePortfolio}>
                            <Link to="/portfolio?mode=full"><span>View All</span><span></span></Link>
                        </MenuItem>
                    </Menu>
                    {/* <span>|</span> */}
                    <Button onClick={openContact}>Contact</Button>
                    <Menu
                        id="contact-menu-component"
                        className='menu-component'
                        aria-haspopup="true"
                        open={contactOpen}
                        onClose={closeContact}
                        anchorEl={contactAnchor}
                    >
                        <MenuItem onClick={closeContact}>
                            <a href='https://www.instagram.com/kmkisiel/' target='_blank' rel='noreferrer' className='external-link'>
                                <SiInstagram className='contact-icon'/> kmkisiel
                            </a>
                        </MenuItem>
                        <MenuItem onClick={closeContact}>
                            <a href='mailto:katiekisiel6@gmail.com' target='_blank' rel='noreferrer' className='external-link'>
                                <FiMail className='contact-icon'/> katiekisiel6@gmail.com
                            </a>
                        </MenuItem>
                        {/* <MenuItem onClick={closeContact}>
                            <a href="" target='_blank' rel='noreferrer' className='external-link' style={{pointerEvents : 'none', opacity: '.5'}}>
                                <FaEtsy className='contact-icon' /> Store (coming soon)
                            </a>
                        </MenuItem> */}
                    </Menu>
                </div>
        </div>
    
    const smallMenuComponent = 
        <div id='mobile-menu' className='menu-bar'>
            <Accordion style={{width: '100%'}}>
                <AccordionSummary id='accordion-button' expandIcon={<FaBars id='hamburger-icon'/>}>
                    <div id='signature' className='menu-item'><img src='https://d239vh0ohrdra5.cloudfront.net/signature.png' alt='Katie Kisiel' /></div>
                </AccordionSummary>
                <AccordionDetails id='accordion-details'>
                    <div className='mobile-nav-menu'>
                        <Link to="/portfolio?mode=collection"><span>View Collections</span><span></span></Link>
                        <Link to="/portfolio?mode=date"><span>View By Year</span><span></span></Link>
                        <Link to="/portfolio?mode=full"><span>View All</span><span></span></Link>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>

    return (
        <div className='menu-wrapper'>
            {smallMenuComponent}
            {menuComponent}
        </div>
    )
}