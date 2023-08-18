import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "Your API Key",
    authDomain: "Your Auth Domain",
    projectId: "Your Project ID",
    storageBucket: "Your Storage Bucket",
    messagingSenderId: "Your Messaging Sender ID",
    appId: "Your App ID"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
