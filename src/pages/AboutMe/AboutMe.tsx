import './styles.scss';

import Lottie from 'lottie-react';
import React from 'react';

import aboutAnimi from '../../assets/lotties/aboutAnimi.json';
import { IMenuItems } from '../../interfaces';

export const AboutMe: React.FC<{ dataMenu?: IMenuItems }> = ({ dataMenu }) => {
    return (
        <div
            className='about-me'
            id={dataMenu
                ?.replace(/([a-z])([A-Z])/g, '$1-$2')
                .replace(/[\s_]+/g, '-')
                .toLowerCase()}
            data-menu={dataMenu}
        >
            <div className='about-container'>
                <div className='about-animi'>
                    <Lottie animationData={aboutAnimi} loop={true} />
                </div>
                <div className='about-section'>
                    <h1>About Me</h1>
                    <h2>Web Developer with 2+ Year Experience</h2>
                    <p>
                        Hello there! I'm Balaji, a passionate and dedicated web developer with one year of experience, on a mission to
                        create captivating digital experiences. Welcome to my personal portfolio, where I showcase my journey through the
                        world of web development and the projects that represent my passion for crafting clean and functional websites.
                    </p>
                    <h3>Why I'm Devoted to Web Development</h3>
                    <p>
                        Web development has been an exciting and fulfilling adventure for me. From the moment I wrote my first line of code,
                        I was hooked. The ability to blend creativity with technical skills, and the satisfaction of seeing my work come to
                        life, inspire me every day. Over the past year, I've had the privilege of collaborating with diverse clients and
                        being a part of projects that have made a meaningful impact.
                    </p>
                </div>
            </div>
        </div>
    );
};
