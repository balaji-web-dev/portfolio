import './styles.scss';

import React from 'react';

import { IMenuItems } from '../../interfaces';

export const Skills: React.FC<{ dataMenu?: IMenuItems }> = ({ dataMenu }) => {
    return (
        <div
            className='skills'
            id={dataMenu
                ?.replace(/([a-z])([A-Z])/g, '$1-$2')
                .replace(/[\s_]+/g, '-')
                .toLowerCase()}
            data-menu={dataMenu}
        >
            <div className='skill-card'>1</div>
            <div className='skill-card'>2</div>
            <div className='skill-card'>3</div>
            <div className='skill-card'>4</div>
            <div className='skill-card'>5</div>
            <div className='skill-card'>6</div>
            <div className='skill-card'>7</div>
            <div className='skill-card'>8</div>
        </div>
    );
};
