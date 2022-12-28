import {initializeApp} from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {
  getDatabase,
  ref as firebaseDatabaseRef,
  set as firebaseSet,
  child,
  get,
  onValue,
} from 'firebase/database';

import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from '@firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyAkShkOCp-LdPnBspldK9mV4G0UaUWP64o',
  authDomain: 'nuxt3-firestore-33ccb.firebaseapp.com',
  databaseURL:
    'https://nuxt3-firestore-33ccb-default-rtdb.firebaseio.com',
  projectId: 'nuxt3-firestore-33ccb',
  storageBucket: 'nuxt3-firestore-33ccb.appspot.com',
  appId: '1:598895098207:android:edd3459afde803530d9eea',
  messagingSenderId: '598895098207',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth().signOut();
const firebaseDatabase = getDatabase();
const storage = getStorage(app);
export {
  // auth,
  firebaseDatabase,
  // createUserWithEmailAndPassword,
  // onAuthStateChanged,
  firebaseSet,
  firebaseDatabaseRef,
  // sendEmailVerification,
  child,
  get,
  onValue, //reload when online DB changed
  // signInWithEmailAndPassword,
  storage,
  stRef,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
};
