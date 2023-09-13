import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { useState } from 'react';

import { auth, provider } from '../../firebase';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(auth.currentUser);
    console.log('inside useAuth');
    const login = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                // The signed-in user info.
                // const user = result.user;
                // setUser(result.user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                // console.log({ credential, token, user, result });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log({ credential, errorCode, errorMessage, email, error });
            });
    };

    const logout = async () => {
        await signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('Succesfully Logged out...');
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    };

    return { user, setUser, login, logout };
};
