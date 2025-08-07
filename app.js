
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2TSTqMDaFAl_XH9RRGZf8voeABUzMSHc",
  authDomain: "sportscoaches-820f0.firebaseapp.com",
  projectId: "sportscoaches-820f0",
  storageBucket: "sportscoaches-820f0.appspot.com",
  messagingSenderId: "269051841171",
  appId: "1:269051841171:web:660b180b02e76ceaf8f25c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signupForm["signupEmail"].value;
    const password = signupForm["signupPassword"].value;
    const role = signupForm["signupRole"].value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        await setDoc(doc(db, "users", user.uid), {
          email: email,
          role: role,
          location: { lat, lng }
        });

        alert("User registered successfully!");
      });
    } catch (error) {
      alert("Signup Failed: " + error.message);
    }
  });
}

if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signinForm["signinEmail"].value;
    const password = signinForm["signinPassword"].value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert("Logged in as: " + user.email);
    } catch (error) {
      alert("Signin Failed: " + error.message);
    }
  });
}
