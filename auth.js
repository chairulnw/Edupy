import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4G8x7MV6S7CZmjfT1O7lm5KHEN1tbCbk",
    authDomain: "edupy-pawm22.firebaseapp.com",
    projectId: "edupy-pawm22",
    storageBucket: "edupy-pawm22.appspot.com",
    messagingSenderId: "702785045667",
    appId: "1:702785045667:web:23ff439d3dad49b0526b16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Register function
function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        // Save user data and course data to Firestore in parallel
        Promise.all([
            setDoc(doc(db, 'users', user.uid), {
                name: name,
                email: email,
                uid: user.uid,
                completedvar: false,
                completedcond: false,
                completedloop: false,
                totalcompleted: 0
            }),
        ])
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error("Error saving data: ", error);
        });
    })
    .catch((error) => {
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
    });

}

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
        });
}

// Logout function
function logout() {
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error("Error during logout:", error.message);
        });
}

// Display user data on index.html
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                document.getElementById('name').textContent = userDoc.data().name;
                document.getElementById('username').textContent = userDoc.data().name;
                document.getElementById('lessonsCompleted').textContent = userDoc.data().totalcompleted;
            }
        }
    });
});

// Attach event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener("click", function(event) {
            event.preventDefault();
            login();
        });
    }

    const registerButton = document.getElementById('register-button');
    if (registerButton) {
        registerButton.addEventListener("click", function(event) {
            event.preventDefault();
            register();
        });
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});

export { auth, db };