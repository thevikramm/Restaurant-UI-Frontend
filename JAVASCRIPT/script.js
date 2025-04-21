// script.js

// Function to handle reservation form submission
function handleReservation(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    // Simple validation
    if (!name || !email || !date || !time || !guests) {
        alert('Please fill in all fields.');
        return;
    }

    // Display a confirmation message
    alert(`Reservation confirmed for ${name} on ${date} at ${time} for ${guests} guests.`);
    
    // Optionally, you can reset the form after submission
    document.getElementById('reservationForm').reset();
}

// Function to handle contact form submission
function handleContact(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const contactName = document.getElementById('contactName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (!contactName || !contactEmail || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Display a confirmation message
    alert(`Thank you, ${contactName}! Your message has been sent.`);
    
    // Optionally, you can reset the form after submission
    document.getElementById('contactForm').reset();
}

// Attach the event listeners to the forms
document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservation);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active'); // Toggle class for showing menu
      hamburger.classList.toggle('open'); // Optional: toggle animation for hamburger
    });
  });