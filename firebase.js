// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyCR1qABBm6vxXs65NGuDoBpKDIr9hnQVBk',
   authDomain: 'singingsongsportfolio.firebaseapp.com',
   projectId: 'singingsongsportfolio',
   storageBucket: 'singingsongsportfolio.appspot.com',
   messagingSenderId: '627085470574',
   appId: '1:627085470574:web:ed20e3db55fe44ce54ef7f',
   measurementId: 'G-YXMYTMVTDS'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
