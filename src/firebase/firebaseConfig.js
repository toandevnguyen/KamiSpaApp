import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDMc-mx61Yoitz89s8LiuFn_WermR9Tac8',
  authDomain: 'duytoanexpoapp.firebaseapp.com',
  projectId: 'duytoanexpoapp',
  storageBucket: 'duytoanexpoapp.appspot.com',
  messagingSenderId: '871893177611',
  appId: '1:871893177611:web:4a19ffa906da2b2fa9be0e',
  measurementId: 'G-19KH15K14L',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
// Initialize Firebase
export const FIRE_BASE_EXPO_APP = initializeApp(firebaseConfig);
export const FIRE_BASE_AUTH = getAuth(FIRE_BASE_EXPO_APP);

// const FIRE_BASE_FIRE_STORE_DB = FIRE_BASE_EXPO_APP.fir;
// export default FIRE_BASE_FIRE_STORE_DB;

// const analytics = getAnalytics(app);
