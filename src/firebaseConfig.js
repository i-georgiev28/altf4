import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAoF1yXMMmnR4fmSejuxyUXI1a2caF4yAo",
    authDomain: "solareye-24c20.firebaseapp.com",
    projectId: "solareye-24c20",
    storageBucket: "solareye-24c20.firebasestorage.app",
    messagingSenderId: "667707733050",
    appId: "1:667707733050:web:54a5ac10ecc46c1d527103"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;
