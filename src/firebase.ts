import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
  storageBucket: 'gs://sfx-interim.appspot.com/',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
