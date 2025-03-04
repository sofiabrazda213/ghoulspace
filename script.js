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
  const gallery = document.querySelector(".artgallery");
  if (!gallery) return; // Ensure script runs only if .artgallery exists

  const images = document.querySelectorAll(".draggable");

  images.forEach((img, index) => {
    // Set a default position if not set
    img.style.position = "absolute";
    if (!img.style.left) img.style.left = `${50 + index * 150}px`; // Spread images horizontally
    if (!img.style.top) img.style.top = `${50 + index * 100}px`; // Spread images vertically

    img.addEventListener("mousedown", dragStart);
    img.addEventListener("touchstart", dragStart, { passive: false });
});

  function dragStart(event) {
      event.preventDefault(); // Prevent default behavior
      let img = event.target;
      let shiftX = (event.clientX || event.touches[0].clientX) - img.getBoundingClientRect().left;
      let shiftY = (event.clientY || event.touches[0].clientY) - img.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
          img.style.left = pageX - shiftX + "px";
          img.style.top = pageY - shiftY + "px";
      }

      function onMouseMove(event) {
          moveAt(event.pageX || event.touches[0].pageX, event.pageY || event.touches[0].pageY);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onMouseMove, { passive: false });

      document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove", onMouseMove);
      }, { once: true });

      document.addEventListener("touchend", () => {
          document.removeEventListener("touchmove", onMouseMove);
      }, { once: true });

      img.ondragstart = () => false; // Disable default drag behavior
  }
});





