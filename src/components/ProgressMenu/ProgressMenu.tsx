import './styles.scss';

import Lottie from 'lottie-react';
import React from 'react';

import tryeAnimi from '../../assets/lotties/trye.json';

interface IProgressMenu<T> {
    menuItems: (T | string)[];
    activeMenu: T;
}

export const ProgressMenu = <T extends string>({ menuItems, activeMenu }: IProgressMenu<T>) => {
    return (
        <div className='progress-menu'>
            <Lottie
                animationData={tryeAnimi}
                loop={true}
                style={{
                    position: 'absolute',
                    height: '100px',
                    width: '100px',
                    inset: `calc(100% * (${menuItems.indexOf(activeMenu)}/${menuItems.length - 1})) 0 0`,
                    marginLeft: 'auto',
                    zIndex: 99999,
                    transform: 'scaleY(-1) rotate(270deg) translateX(-80%) translateY(20%)',
                    transition: 'inset 1s cubic-bezier(0, 0, 0, 1.18)',
                }}
            />
            {/* <ul>
                {menuItems?.map((eachItem, index) => (
                    <li key={`${eachItem}-${index}`} className={activeMenu === eachItem ? 'disappear' : 'progress-menu-item'}>
                        {activeMenu === eachItem ? eachItem : null}
                    </li>

                    // <li key={`${eachItem}-${index}`}>{eachItem}</li>
                ))}
            </ul> */}
            <div className='active-menu'>{activeMenu}</div>
        </div>
    );
};
