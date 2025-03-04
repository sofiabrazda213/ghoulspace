document.addEventListener("DOMContentLoaded", function () {
  let sidebar = document.querySelector(".tab-bar"); // Use ".tab-bar" instead of "#sidebar"
  let button = document.getElementById("toggleBtn");

  button.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click conflicts
      sidebar.classList.toggle("show");

      if (sidebar.classList.contains("show")) {
          button.innerHTML = "✖"; // Show 'X' when open
      } else {
          button.innerHTML = "☰"; // Show ☰ when closed
      }
  });

  // Close sidebar when clicking outside (mobile fix)
  document.addEventListener("click", function (event) {
      if (!sidebar.contains(event.target) && !button.contains(event.target)) {
          sidebar.classList.remove("show");
          button.innerHTML = "☰";
      }
  });
});

// Gallery modal
function openModal(imgElement) {
  let modal = document.getElementById("imageModal");
  let fullImage = document.getElementById("fullImage");
  let captionText = document.getElementById("caption");

  if (!modal || !fullImage || !captionText) {
      console.error("Modal elements not found!");
      return;
  }

  fullImage.src = imgElement.src;
  captionText.innerHTML = imgElement.alt; // Set image caption
  modal.style.display = "block";

  // Close modal if user clicks outside the image
  modal.addEventListener("click", function (event) {
      if (event.target === modal) {
          closeModal();
      }
  });
}

function closeModal() {
  let modal = document.getElementById("imageModal");
  if (!modal) {
      console.error("Modal not found!");
      return;
  }
  modal.style.display = "none";
}

// Ensure Close Button Works
document.querySelector(".close").addEventListener("click", function () {
  closeModal();
});

// Ensure the modal is hidden when the page loads
document.addEventListener("DOMContentLoaded", function () {
  let modal = document.getElementById("imageModal");
  if (modal) {
      modal.style.display = "none"; // Force hide the modal
  }
});


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

//js for art gal
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".draggable");

  images.forEach((img) => {
      img.style.position = "absolute";

      let startX = Math.random() * (window.innerWidth - 200);
      let startY = Math.random() * (window.innerHeight - 200);

      img.style.transform = `translate(${startX}px, ${startY}px)`;
      img.dataset.x = startX;
      img.dataset.y = startY;

      img.style.animation = `float 3s infinite ease-in-out alternate ${Math.random() * 2}s`;

      img.addEventListener("pointerdown", startDrag);
  });

  function startDrag(event) {
      event.preventDefault();

      const img = event.target;
      let shiftX = event.clientX - img.dataset.x;
      let shiftY = event.clientY - img.dataset.y;

      img.style.transition = "none"; // Remove transition while dragging
      img.style.animation = "none"; // Stop floating
      img.style.cursor = "grabbing"; // Change cursor to grabbing

      function moveAt(pageX, pageY) {
          let newX = pageX - shiftX;
          let newY = pageY - shiftY;

          img.dataset.x = newX;
          img.dataset.y = newY;
          img.style.transform = `translate(${newX}px, ${newY}px)`; // Moves smoothly
      }

      function onPointerMove(event) {
          moveAt(event.clientX, event.clientY);
      }

      document.addEventListener("pointermove", onPointerMove);

      document.addEventListener("pointerup", () => {
          document.removeEventListener("pointermove", onPointerMove);
          img.style.transition = "transform 0.5s ease-out"; // Smooth drop effect
          img.style.animation = `float 3s infinite ease-in-out alternate ${Math.random() * 2}s`; // Resume floating
          img.style.cursor = "move"; // Change cursor back
      }, { once: true });

      img.ondragstart = () => false; // Prevent default drag
  }
});