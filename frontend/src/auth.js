import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// Firebase configuration
const firebaseConfig = { apiKey: "AIzaSyD-8KxqCgZRod1cdLXH_pG-07crCxI3r1Y", authDomain: "trentplayground.firebaseapp.com", projectId: "trentplayground", storageBucket: "trentplayground.appspot.com", messagingSenderId: "88515633291", appId: "1:88515633291:web:39f0416cf465b1a287348e", measurementId: "G-6VEJ8NV7DH" };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Function to verify the user's token
const verifyUserToken = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No token found.");
    }

    //console.log("Token retrieved:", token);

    // You can add further validation or logic here
    // For now, we're just logging the token
    // Optionally, validate the token server-side for added security
  } catch (error) {
    console.error("Token verification failed:", error.message);
    window.location.href = "fail.html"; // Redirect to login if no token or invalid token
  }
};

// Call the verifyUserToken function on page load
document.addEventListener("DOMContentLoaded", verifyUserToken);