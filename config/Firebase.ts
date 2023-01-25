import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9ZiofJSJC_4h0FWrivJ7ojue2Bdk6FO8",
    authDomain: "todolist-nest-next.firebaseapp.com",
    projectId: "todolist-nest-next",
    storageBucket: "todolist-nest-next.appspot.com",
    messagingSenderId: "293677364873",
    appId: "1:293677364873:web:a1beaa60c6866954a4b858"
};

const app = initializeApp(firebaseConfig);
  
export const auth = getAuth()