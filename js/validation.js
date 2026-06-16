document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission for validation

    const email = document.getElementById('email').value;
    const phone = document.getElementById('number').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Updated regex to check for exactly 10 digits

    let valid = true;

    // Validate email
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        valid = false;
    }

    // Validate phone number
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number (10 digits only).');
        valid = false;
    }

    if (valid) {
        // If both validations pass, you can submit the form
        alert('Form submitted successfully!');
        // Uncomment to actually submit the form
        // document.forms[0].submit();
    }
});
