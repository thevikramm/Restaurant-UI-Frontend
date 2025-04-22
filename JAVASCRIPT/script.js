// script.js

// Function to handle reservation form submission
async function handleReservation(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    if (!name || !email || !date || !time || !guests) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/reserve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, date, time, guests })
        });

        const data = await response.json();
        alert(data.message);  // ✅ fixed key name
        document.getElementById('reservationForm').reset();
    } catch (error) {
        alert('Error submitting reservation.');
        console.error(error);
    }
}

// Function to handle contact form submission
async function handleContact(event) {
    event.preventDefault();

    const contactName = document.getElementById('contactName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const message = document.getElementById('message').value;

    if (!contactName || !contactEmail || !message) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contactName, contactEmail, message })
        });

        const data = await response.json();
        alert(data.message);  // ✅ fixed key name
        document.getElementById('contactForm').reset();
    } catch (error) {
        alert('Error submitting contact form.');
        console.error(error);
    }
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

    // Hamburger toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }
});
