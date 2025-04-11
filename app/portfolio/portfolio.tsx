import { useContext, useState, useEffect } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router';
import { BsArrowLeftShort } from 'react-icons/bs';
import Collection from '../galleries/collection';
import Date from '../galleries/date';
import Full from '../galleries/full';
import Lightbox from '../lightbox/lightbox';
import Select from 'react-select';
import './portfolio.css';

function Gallery(mode: String) {
    if (mode === 'collection')
        return <Collection />;
    if (mode === 'date')
        return <Date />;
    return <Full />;
};

export default function Portfolio(props: any) {
    const metadata = useOutletContext();
    const [params, setParams] = useSearchParams();
    const mode = params.get('mode') ?? 'full';
    const [showSelect, setShowSelect] = useState(mode === 'full');

    const media = metadata.media;
    
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
        <div id='portfolio' className={!props.showAtlas ? '' : 'hidden'}>
            <div id='portfolio-header'>
                {/* <h2 id='section-header'>{title}</h2> */}
                <div className='filter-wrapper' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <a id='back-home' href='/'><BsArrowLeftShort className='back-home-icon' /> Back</a>
                    {   showSelect &&
                        <Select
                            id='selector'
                            // className={visibleFilters.includes('media') ? '' : 'hidden'}
                            isMulti
                            placeholder='All Media'
                            // onChange={setFilters}
                            options={selectOptions}
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
                    }
                </div>
                <div>{Gallery(mode)}</div>
            </div>
            <div className='clear'></div>
        </div>
    )
}