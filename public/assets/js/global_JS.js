function displayPopup() {
    setTimeout(function() {
        document.getElementById('popupModal').style.display = 'block';
    }, 5000); // 5000 milliseconds = 5 seconds
}

// Function to close the popup modal when clicking on the close button
document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('popupModal').style.display = 'none';
}

// Call the displayPopup function when the window loads
window.onload = function() {
    displayPopup();
};