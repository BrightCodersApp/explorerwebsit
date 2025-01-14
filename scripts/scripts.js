// scripts/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === "" || email === "" || message === "") {
                formMessage.innerHTML = '<div class="alert alert-danger">Please fill in all fields.</div>';
                return;
            }

            // Simulate form submission (replace with actual submission logic)
            formMessage.innerHTML = '<div class="alert alert-success">Thank you for contacting us!</div>';
            contactForm.reset();
        });
    }

    // Footer Icons Interactivity
    const controlsIcon = document.getElementById('controls-icon');
    const optionsIcon = document.getElementById('options-icon');
    const infoIcon = document.getElementById('info-icon');

    if (controlsIcon) {
        controlsIcon.addEventListener('click', () => {
            // Implement Controls functionality if needed
            alert('Controls clicked!');
        });
    }

    if (optionsIcon) {
        optionsIcon.addEventListener('click', () => {
            // Implement Options functionality if needed
            alert('Options clicked!');
        });
    }

    if (infoIcon) {
        infoIcon.addEventListener('click', () => {
            // Implement Info functionality if needed
            alert('Info clicked!');
        });
    }
});
