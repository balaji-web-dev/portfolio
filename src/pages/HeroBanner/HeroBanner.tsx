import './styles.scss';

import Lottie from 'lottie-react';
import React from 'react';

import boyAnimi from '../../assets/lotties/boyAnimi.json';
import floatingAnimi from '../../assets/lotties/floatingAnimi.json';
import { IMenuItems } from '../../interfaces';

export const HeroBanner: React.FC<{ dataMenu?: IMenuItems }> = ({ dataMenu }) => {
    return (
        <>
            <div
                className='hero-banner'
                id={dataMenu
                    ?.replace(/([a-z])([A-Z])/g, '$1-$2')
                    .replace(/[\s_]+/g, '-')
                    .toLowerCase()}
                data-menu={dataMenu}
            >
                <div className='intro-head'>
                    <p className='name-sentence'>Hi, I am</p>
                    <p className='name'>Balaji.</p>
                    <Lottie
                        animationData={boyAnimi}
                        loop={true}
                        style={{ position: 'absolute', inset: 'auto 0 0 auto', marginLeft: 'auto', zIndex: 99999 }}
                    />
                </div>
                <div className='intro-content'>
                    <div className='intro-bar'></div>
                    <div className='intro-content-head'>Web Developer, coimbatore</div>
                    <p className='into-article'>
                        Self-motivated team player with one years of experience seeking a position as a web developer with Next Generation
                        Web Development where I can apply my advanced knowledge of web design with my leadership abilities to meet client
                        needs and exceed their expectations.
                    </p>
                    <div className='button-container'>
                        <button className='email-me'>Email Me</button>
                        <button className='download-cv'>Download CV</button>
                    </div>
                    <div className='intro-bar invert'></div>
                </div>
                <Lottie
                    animationData={floatingAnimi}
                    loop={true}
                    style={{
                        position: 'absolute',
                        bottom: '-5px',
                        filter: 'blur(1px)',
                        opacity: '0.5',
                        zIndex: -1,
                    }}
                />
            </div>
        </>
    );
};
