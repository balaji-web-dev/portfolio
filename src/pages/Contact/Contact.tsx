import './styles.scss';

import Lottie from 'lottie-react';
import React from 'react';

import * as contactAnimi from '../../assets/lotties/contactAnimi.json';
import { IMenuItems } from '../../interfaces';

export const Contact: React.FC<{ dataMenu?: IMenuItems }> = ({ dataMenu }) => {
    return (
        <div
            className='contact'
            id={dataMenu
                ?.replace(/([a-z])([A-Z])/g, '$1-$2')
                .replace(/[\s_]+/g, '-')
                .toLowerCase()}
            data-menu={dataMenu}
        >
            <div className='contact-animi'>
                <Lottie animationData={contactAnimi} loop={true} />
            </div>
            <div className='contact-section'>
                <div className='contact-heading'>Contact Me</div>
                <div className='form-wrapper'>
                    <form className='contact-form'>
                        <label htmlFor='name'>Full name</label>
                        <input id='name' type='text' />
                        <label htmlFor='mail'>E-mail</label>
                        <input id='mail' type='text' />
                        <label htmlFor='msg'>Message</label>
                        <textarea id='msg'></textarea>
                        <button type='submit'>Sent</button>
                    </form>
                    <div className='contact-info'>
                        <label htmlFor='my-email'>Contact</label>
                        <input id='my-email' type='text' value={'balls.ksj@gmail.com'} />
                        <label htmlFor='my-email'>Based in</label>
                        <input id='my-email' type='text' value={'Coimbatore, Tamilnadu'} />
                    </div>
                </div>
            </div>
        </div>
    );
};
