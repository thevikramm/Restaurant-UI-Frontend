// Function to handle reservation form submission
async function handleReservation(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    if (!name || !email || !date || !time || !guests) {
        alert('Please fill in all reservation fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/reserve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, date, time, guests })
        });

        const data = await response.json();
        alert(data.message);
        document.getElementById('reservationForm').reset();
    } catch (error) {
        alert('Error submitting reservation.');
        console.error('🧨 Reservation Error:', error);
    }
}

// Function to handle contact form submission
async function handleContact(event) {
    event.preventDefault();
    console.log("contactName element:", document.getElementById('contactName'));

    const contactName = document.getElementById('contactName').value.trim();
    const contactEmail = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!contactName || !contactEmail || !contactMessage) {
        alert('Please fill in all contact fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contactName, contactEmail, contactMessage })
        });

        const data = await response.json();
        alert(data.message);
        document.getElementById('contactForm').reset();
    } catch (error) {
        alert('Error submitting contact form.');
        console.error('🧨 Contact Form Error:', error);
    }
}

// Attach form listeners after DOM is loaded
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
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    console.log("✅ DOM fully loaded. Event listeners attached.");
});