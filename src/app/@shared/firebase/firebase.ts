import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../../../environments/environment';

const app = initializeApp(environment.firebaseConfig);
export const auth = getAuth(app)
