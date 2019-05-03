import Firebase from 'firebase'

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();
export const dbBurgerOrders = db.ref('burgerorders');