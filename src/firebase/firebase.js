import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCti1LroREwTgjBgkfnY7OC_-KAAvwY49c",
  authDomain: "velerioimeteosystem-182e7.firebaseapp.com",
  projectId: "velerioimeteosystem-182e7",
  storageBucket: "velerioimeteosystem-182e7.firebasestorage.app",
  messagingSenderId: "263613817369",
  appId: "1:263613817369:web:19137750166f7d7447c088",
  measurementId: "G-T5ES97XWY6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;