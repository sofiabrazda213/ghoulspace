import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


function openTab(event, tabName) {
    var i, tabContent, tabButton;
    
    // Hide all tab content
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    
    // Remove the "active" class from all tab buttons
    tabButton = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButton.length; i++) {
        tabButton[i].className = tabButton[i].className.replace(" active", "");
    }
    
    // Show the current tab content and add "active" class to the clicked tab button
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and the modal image element
var modalImg = document.getElementById("fullImage");
var captionText = document.getElementById("caption");

// Open the modal and display the clicked image
function openModal(img) {
  modal.style.display = "block"; // Show the modal
  modalImg.src = img.src; // Set modal image source to clicked image
  captionText.innerHTML = img.alt; // Set caption (if needed)
}

// Close the modal when the X button is clicked
function closeModal() {
  modal.style.display = "none";
}


// Firebase (database) configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgp2JPsJzfStNv5Pmwg64To5bW7ss7eFY",
  authDomain: "ghoulspace-9f35d.firebaseapp.com",
  projectId: "ghoulspace-9f35d",
  storageBucket: "ghoulspace-9f35d.appspot.com",
  messagingSenderId: "366954255758",
  appId: "1:366954255758:web:47bf2dbc21e645c209c0df",
  measurementId: "G-0R5ZGKFY3W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to submit message
async function submitMessage(event) {

  event.preventDefault();  // Prevents the form from refreshing the page

  const name = document.getElementById("name").value;  // Get the user's name from input
  const message = document.getElementById("message").value;  // Get the message content

  // Add data to Firestore
  db.collection("submissions").add({
    name: "Test Name",
    message: "Test Message",
    timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Automatically set timestamp
  })
  .then(() => {
    alert("Message submitted successfully!");
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
    alert("Error submitting message: " + error);
  });
}

