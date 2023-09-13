import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { auth } from '../../../firebase';
import { useAuth } from '../../hooks';

export const RequireAuth: React.FC = () => {
    const { user, setUser, login } = useAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('auth state changed...!', user);
            setUser(user);

            !user?.uid && login();
        });

        return () => unsubscribe();
    }, []);

    return user?.uid ? <Outlet /> : <div>Please Login</div>;
};
