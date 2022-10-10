import firebase from "firebase/app";
import "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBURk1DPcMV4py-nVrZK3Sa5_l772kPXY0",
  authDomain: "fcmtest-446ee.firebaseapp.com",
  projectId: "fcmtest-446ee",
  storageBucket: "fcmtest-446ee.appspot.com",
  messagingSenderId: "691407107590",
  appId: "1:691407107590:web:42d095348d482b560ff587",
  measurementId: "G-FMNFYZEX9W",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
