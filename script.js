//Side nav/bar on left side
document.getElementById("toggleBtn").addEventListener("click", function () {
  let sidebar = document.getElementById("sidebar");
  let button = document.getElementById("toggleBtn");

  if (sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
      button.innerHTML = "☰"; // Show menu icon when closed
  } else {
      sidebar.classList.add("show");
      button.innerHTML = "✖"; // Show X when open
  }
});

// Gallery modul
function openModal(imgElement) {
  let modal = document.getElementById("imageModal");
  let fullImage = document.getElementById("fullImage");
  let captionText = document.getElementById("caption");

  fullImage.src = imgElement.src;
  captionText.innerHTML = imgElement.alt; // Set image caption
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = getFirestore(app);

// Function to submit message
async function submitMessage(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  db.collection("submissions").add({
    name: name,
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
  .then(() => {
    alert("Message submitted successfully!");
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
    alert("Error submitting message: " + error);
  });
}



