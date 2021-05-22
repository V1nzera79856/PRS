import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyylWrfYut6r071NspjNQl5q68hBWbfUA",
    authDomain: "property-reservation-system.firebaseapp.com",
    projectId: "property-reservation-system",
    storageBucket: "property-reservation-system.appspot.com",
    messagingSenderId: "924974684575",
    appId: "1:924974684575:web:e4306450914fe146c145aa"
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore();