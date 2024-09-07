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

