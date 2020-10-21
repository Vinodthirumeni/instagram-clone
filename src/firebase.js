import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCQaaqwzSYWzoTUuTdgsRcUV4aS7A2bG0o",
  authDomain: "instagram-clone-react-5b4eb.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-5b4eb.firebaseio.com",
  projectId: "instagram-clone-react-5b4eb",
  storageBucket: "instagram-clone-react-5b4eb.appspot.com",
  messagingSenderId: "438119293063",
  appId: "1:438119293063:web:7555572a0aabc88da21822",
  measurementId: "G-5TG8H5NQ3P",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };

// If firebase expired
// https://console.firebase.google.com/u/0/project/instagram-clone-react-5b4eb/firestore/rules
