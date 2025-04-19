import { useContext, useState, useEffect } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router';
import { BsArrowLeftShort } from 'react-icons/bs';
import Collection from '../galleries/collection';
import Date from '../galleries/date';
import Full from '../galleries/full';
import Select from 'react-select';
import './portfolio.css';

function Gallery(mode: String, params: any) {
    if (mode === 'collection')
        return <Collection />;
    if (mode === 'date')
        return <Date />;
    return <Full params={params} />;
};

export default function Portfolio(props: any) {
    const metadata = useOutletContext();
    const [params, setParams] = useSearchParams();
    const mode = params.get('mode') ?? 'full';
    const [showSelect, setShowSelect] = useState(mode === 'full');

    const media = metadata.media;
    
    const selected = params.getAll('media');
    const selectedIDs: number[] = [];
    if (selected && selected[0])
        selected[0].split(',').forEach(s => {
            selectedIDs.push(+s);
        });
        
    const selectedOptions: any[] = [];
    const selectOptions: any[] = [];
    if (media) {
        Object.keys(media).forEach(key => {
            const option = {
                value: key,
                label: media[key]
            };
            selectOptions.push(option);
            if (selectedIDs.includes(+key))
                selectedOptions.push(option);
        });
    }

    const changeFilter = (values: any) => {
        const filters: any[] = [];
        Object.keys(values).forEach(vk => {
            filters.push(values[vk].value);
        });
        params.set("mode", "full");
        params.set("media", filters);
        setParams(params);
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
                            isMulti
                            placeholder='All Materials'
                            onChange={changeFilter}
                            options={selectOptions}
                            value={selectedOptions}
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
                <div>{Gallery(mode, params)}</div>
            </div>
            <div className='clear'></div>
        </div>
    )
}