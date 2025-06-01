document.addEventListener('DOMContentLoaded', function() {
    // "Show more" button functionality
    const showMoreBtn = document.getElementById('showMoreBtn');
    const moreDetails = document.getElementById('moreDetails');

    if (showMoreBtn && moreDetails) {
        showMoreBtn.addEventListener('click', function() {
            if (moreDetails.style.display === 'none' || moreDetails.style.display === '') {
                moreDetails.style.display = 'block';
                showMoreBtn.textContent = 'Show Less';
            } else {
                moreDetails.style.display = 'none';
                showMoreBtn.textContent = 'Show More About Me';
            }
        });
    }

    // Recruiter form validation
    const recruiterForm = document.getElementById('recruiterForm');
    if (recruiterForm) {
        recruiterForm.addEventListener('submit', function(event) {
            let isValid = true;
            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());

            // Validate Recruiter Name
            const recruiterName = document.getElementById('recruiterName');
            if (!recruiterName.value.trim()) {
                displayError(recruiterName, 'Recruiter name is required.');
                isValid = false;
            }

            // Validate Recruiter Email
            const recruiterEmail = document.getElementById('recruiterEmail');
            if (!recruiterEmail.value.trim()) {
                displayError(recruiterEmail, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(recruiterEmail.value.trim())) {
                displayError(recruiterEmail, 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Message
            const recruiterMessage = document.getElementById('recruiterMessage');
            if (!recruiterMessage.value.trim()) {
                displayError(recruiterMessage, 'Message cannot be empty.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Prevent form submission if validation fails
            } else {
                // Optionally, you can handle form submission here (e.g., via AJAX)
                // For this example, we'll just let it submit (or prevent if action="#" is used)
                alert('Message submitted (simulated)!'); // Placeholder for actual submission
                event.preventDefault(); // Prevent actual submission for this demo
                recruiterForm.reset(); // Reset form after successful "submission"
            }
        });
    }

    function displayError(inputElement, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
