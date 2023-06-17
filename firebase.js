const firebaseConfig = {
    apiKey: "AIzaSyDbI8T-JIXsDn7ty7uSUoF27gzhHxrg4Vo",
    authDomain: "comp380-2227b.firebaseapp.com",
    projectId: "comp380-2227b",
    storageBucket: "comp380-2227b.appspot.com",
    messagingSenderId: "373668540147",
    appId: "1:373668540147:web:043bff9b5e81d65b9e9186",
    measurementId: "G-NB7RQTTWE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var firestore = firebase.firestore();

//Variable to access database collection
const db = firestore.collection("formData");

//Get Submit Form
let submitButton = document.getElementById("submit");

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  //Get Form Values
  let form_email = document.getElementById("email").value;
  let form_password = document.getElementById("password").value;
    
  console.log(form_email);
  console.log(form_password);

  firestore
    .collection("formData")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const em = doc.data().email;
        if (form_email === em) {
          console.log("Already Exists");
        }

        // console.log("data", doc.data().fname);
      });
    });
  //Save Form Data To Firebase
  db.doc()
    .set({
      email: form_email,
      password: form_password,
    })
    .then(() => { })
    .catch((error) => {
      console.log(error);
    });
});