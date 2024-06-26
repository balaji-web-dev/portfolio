import './styles.scss';

import React, { useState } from 'react';

import gmailIco from '../../assets/images/contact/gmailIco.png';
import linkedinIco from '../../assets/images/contact/linkedinIco.png';
import phoneIco from '../../assets/images/contact/phoneIco.png';

import { IMenuItems } from '../../interfaces';

const initialData = { name: '', mail: '', msg: '' };

const replacements = {
    '\n': '%0A',
    ' ': '%20',
};

// Create a regular expression pattern that matches all the keys in the replacements object
const pattern = new RegExp(Object.keys(replacements).join('|'), 'g');

export const Contact: React.FC<{ dataMenu?: IMenuItems }> = ({ dataMenu }) => {
    const [formData, setFormData] = useState<typeof initialData>(initialData);
    const [queryUrl, setQueryUrl] = useState(
        `mailto:recipient@example.com?subject=From%20Portfolio%20(Messager%20name:)&body=Hi%20Balaji%0A%0Abody%0A%0AThank%20and%20regards%0AYour%20name`
    );

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => {
            const updatedData = { ...prev, [e.target.name]: e.target.value };

            setQueryUrl(
                `mailto:balls.ksj@gmail.com?subject=From%20Portfolio%20(Messager%20name:%20${
                    updatedData.name
                })&body=Hi%20Balaji%0A%0A${updatedData.msg.replace(
                    pattern,
                    (match) => replacements[match as keyof typeof replacements]
                )}%0A%0AThank%20and%20regards%0AYour%20name`
            );

            return updatedData;
        });
    };

    return (
        <div
            className='contact'
            id={dataMenu
                ?.replace(/([a-z])([A-Z])/g, '$1-$2')
                .replace(/[\s_]+/g, '-')
                .toLowerCase()}
            data-menu={dataMenu}
        >
            <div className='contact-details'>
                <h2 className='contact-name'>BALAJI K</h2>
                <div className='social-links'>
                    <a href='mailto:balls.ksj@gmail.com'>
                        <img src={gmailIco} alt='Email' style={{ height: '25px', width: '25px' }} />
                        balls.ksj@gmail.com
                    </a>
                    <a href='tel:9384176200'>
                        <img src={phoneIco} alt='Phone' style={{ height: '25px', width: '25px' }} />
                        +91 9384176200
                    </a>
                    <a href='https://www.linkedin.com/in/balajik20/' target='_blank'>
                        <img src={linkedinIco} alt='linkedIn' style={{ height: '25px', width: '25px' }} />
                        LinkedIn
                    </a>
                </div>
            </div>
            {/* <div className='contact-animi'>
                <Lottie animationData={contactAnimi} loop={true} />
            </div>
            <div className='contact-section'>
                <div className='contact-heading'>Contact Me</div>
                <div className='form-wrapper'>
                    <form className='contact-form' onSubmit={(e) => e.preventDefault()}>
                        <div className='input-wrapper'>
                            <label htmlFor='name'>Full name</label>
                            <input id='name' name='name' type='text' value={formData.name} onChange={handleFormData} />
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor='mail'>E-mail</label>
                            <input id='mail' name='mail' type='text' value={formData.mail} onChange={handleFormData} />
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor='msg'>Message</label>
                            <textarea name='msg' id='msg' value={formData.msg} onChange={handleFormData}></textarea>
                        </div>
                        <a href={queryUrl}>Sent</a>
                    </form>
                    <div className='contact-info'>
                        <div className='input-wrapper'>
                            <label htmlFor='my-email'>Contact</label>
                            <input id='my-email' type='text' value={'balls.ksj@gmail.com'} />
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor='my-email'>Based in</label>
                            <input id='my-email' type='text' value={'Coimbatore, Tamilnadu'} />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};
