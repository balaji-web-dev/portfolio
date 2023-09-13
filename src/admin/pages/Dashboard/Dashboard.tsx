import './styles.scss';

import { get, ref } from 'firebase/database';
import React, { useEffect } from 'react';

import { database } from '../../../firebase';

export const Dashboard: React.FC = () => {
    useEffect(() => {
        get(ref(database, 'users/')).then((data) => console.log('users', data.val()));
    }, []);
    return <div className='dashboard'>DASHBOARD</div>;
};
