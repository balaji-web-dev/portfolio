import './styles.scss';

import React from 'react';

import { IMenuItems } from '../../interfaces';
import reactIco from '../../assets/images/skills/reactIco.png';
import jsIco from '../../assets/images/skills/jsIco.png';
import nodejsIco from '../../assets/images/skills/nodejsIco.png';
import htmlIco from '../../assets/images/skills/htmlIco.png';
import cssIco from '../../assets/images/skills/cssIco.png';
import firebaseIco from '../../assets/images/skills/firebaseIco.svg';
import expressIco from '../../assets/images/skills/expressIco.svg';
import reduxIco from '../../assets/images/skills/reduxIco.svg';

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
            <div className='skills-container'>
                <h1 className='skills-head'>Skills</h1>
                <div className='skills-card-container'>
                    <div className='skill-card'>
                        <figure>
                            <img src={reactIco} alt='' />
                            <figcaption>React</figcaption>
                        </figure>
                    </div>
                    <div className='skill-card'>
                        <figure>
                            <img src={nodejsIco} alt='' />
                            <figcaption>Node.js</figcaption>
                        </figure>
                    </div>
                    <div className='skill-card'>
                        <figure>
                            <img src={jsIco} alt='' />
                            <figcaption>JavaScript</figcaption>
                        </figure>
                    </div>
                    <div className='skill-card'>
                        <figure>
                            <img src={htmlIco} alt='' />
                            <figcaption>HTML</figcaption>
                        </figure>
                    </div>
                    <div className='skill-card'>
                        <figure>
                            <img src={cssIco} alt='' />
                            <figcaption>CSS</figcaption>
                        </figure>
                    </div>
                    <div className='skill-card'>
                        <figure>
                            <img src={reduxIco} alt='' />
                            <figcaption>Redux</figcaption>
                        </figure>
                    </div>
                    <div className='skill-card'>
                        <figure>
                            <img src={firebaseIco} alt='' />
                            <figcaption>Firebase</figcaption>
                        </figure>
                    </div>
                    <div className='skill-card'>
                        <figure>
                            <img src={expressIco} alt='' />
                            <figcaption>Express.js</figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
};
