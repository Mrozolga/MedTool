import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
  apiKey: 'AIzaSyD32XboN2W1LPuO2DH3D1YarElz7UI01WI',
  authDomain: 'medtool-118f9.firebaseapp.com',
  databaseURL: 'https://medtool-118f9.firebaseio.com',
  projectId: 'medtool-118f9',
  storageBucket: 'medtool-118f9.appspot.com',
  messagingSenderId: '840753959974'
}
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings( {timestampsInSnapshots: true})
export default firebaseApp.firestore()
