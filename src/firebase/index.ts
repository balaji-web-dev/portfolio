// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCf14e6zAtI8emauAKI6Y7j6kDhPK3HDAs',
    authDomain: 'balls-portfolio.firebaseapp.com',
    projectId: 'balls-portfolio',
    storageBucket: 'balls-portfolio.appspot.com',
    messagingSenderId: '202241726888',
    appId: '1:202241726888:web:a3f69862efd5a0073fe59d',
    measurementId: 'G-6Y9N6EGJE6',
    databaseURL: 'https://balls-portfolio-default-rtdb.asia-southeast1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const projectDbRef = ref(database, 'projects/');
export const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    login_hint: 'Only admin can login...!',
});

export const auth = getAuth();
