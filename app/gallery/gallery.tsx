import { useContext, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import Lightbox from '../lightbox/lightbox';
import Select from 'react-select';
import './gallery.css';
import { meta } from '~/routes/home';

export default function Gallery(props: any) {
    const metadata = useState(props.metadata);

    const title = 'Portfolio';

    return (
        <div id='portfolio' className={!props.showAtlas ? '' : 'hidden'}>
            <div id='portfolio-header'>
                <h2 id='section-header'>{title}</h2>
                <div className='filter-wrapper' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <a id='back-home' href='/'><BsArrowLeftShort className='back-home-icon' /> Back</a>
                    <Select
                        id='selector'
                        // className={visibleFilters.includes('media') ? '' : 'hidden'}
                        isMulti
                        placeholder='All Media'
                        // onChange={setFilters}
                        // options={media}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: '5px',
                            colors: {
                                ...theme.colors,
                                primary25: '#CED4DA',
                                danger: '#F8F9FA',
                                dangerLight: '#F22',
                                neutral0: '#E9ECEF',
                                neutral10: '#CED4DA',
                                neutral80: '#343A40'
                            }
                        })}
                    />
                </div>
            </div>
            <div className='clear'></div>
        </div>
    )
}