import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAjf5hfCyR_Ol-2b337fi2PQu5AQw05WE4",
  authDomain: "music-demo-52147.firebaseapp.com",
  projectId: "music-demo-52147",
  storageBucket: "music-demo-52147.firebasestorage.app",
  messagingSenderId: "603364748744",
  appId: "1:603364748744:web:739b61c95f73cd475964fd"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default auth