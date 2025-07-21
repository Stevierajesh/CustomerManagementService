  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = { apiKey: "AIzaSyD-8KxqCgZRod1cdLXH_pG-07crCxI3r1Y", authDomain: "trentplayground.firebaseapp.com", projectId: "trentplayground", storageBucket: "trentplayground.appspot.com", messagingSenderId: "88515633291", appId: "1:88515633291:web:39f0416cf465b1a287348e", measurementId: "G-6VEJ8NV7DH" };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  console.log("service.js Script Active");


  document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("authToken");
    console.log("Cleared token from localStorage");
  });

  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  

  
  loginForm.addEventListener("submit", async function (e) {
      
      e.preventDefault(); // Prevent default form submission
    // Get user input
    const usernameData = document.getElementById("username").value;
    const passwordData = document.getElementById("password").value;
  
    console.log("*starting login*");
    try{
        const userCredential = await signInWithEmailAndPassword(auth, usernameData, passwordData);
        

        const user = userCredential.user;

        const token = await user.getIdToken();

        localStorage.setItem("authToken", token);

        window.location.href = `dashboard.html?token=${encodeURIComponent(token)}`;

        console.log("Login Success");
    } catch (error){
        alert("Login failed: " + error.message);
    }
    
  
});



//Google Sign in possible issues is listed in documentation.

// const googleSignIn = async () =>{
//     try{
//         const result = await signInWithPopup(auth, googleProvider);
//         const user = result.user;
    
//         // Get and store the ID token
//         const token = await user.getIdToken();
//         localStorage.setItem("authToken", token);
    
//         console.log("Google Sign-In successful. Token stored:", token);
    
//         // Redirect to formdata1.html
//         window.location.href = "formdata1.html";
//     } catch(error){
//         alert("Google Sign-In Failed.")
//     }
// };
  
  
// document.getElementById("googleSignIn").addEventListener("click", googleSignIn);
