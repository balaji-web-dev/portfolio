import './styles.scss';

import Lottie from 'lottie-react';
import React, { PropsWithChildren } from 'react';

import tryeAnimi from '../../assets/lotties/trye.json';

const Dialog: React.FC<PropsWithChildren<{ onClose?: () => void }>> = ({ children, onClose }) => {
    return (
        <div id='demo-modal' className='modal'>
            <div className='modal__content'>
                {children}

                <a href='#' className='modal__close' onClick={onClose}>
                    &times;
                </a>
            </div>
        </div>
    );
};

const OpenButton: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='wrapper'>
            <a href='#demo-modal'>{!children ? `Open` : children}</a>
        </div>
    );
};

export const Modal = {
    Dialog,
    OpenButton,
};
