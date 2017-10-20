import firebase from 'firebase';

// Initalize Firebase
const config = {
  apiKey: 'AIzaSyDbSmVKg6UsDZFa2LHTqqm4Q9hPylorbao',
  authDomain: 'hackfolio-ed6a4.firebaseapp.com',
  databaseURL: 'https://hackfolio-ed6a4.firebaseio.com',
  projectId: 'hackfolio-ed6a4',
  storageBucket: 'hackfolio-ed6a4.appspot.com',
  messagingSenderId: '977473242483',
};

export default firebase.initializeApp(config);
