document.addEventListener('DOMContentLoaded', function() {
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

    const recruiterForm = document.getElementById('recruiterForm');
    if (recruiterForm) {
        recruiterForm.addEventListener('submit', function(event) {
            let isValid = true;
            document.querySelectorAll('.error-message').forEach(el => el.remove());

            const recruiterName = document.getElementById('recruiterName');
            if (!recruiterName.value.trim()) {
                displayError(recruiterName, 'Recruiter name is required.');
                isValid = false;
            }

            const recruiterEmail = document.getElementById('recruiterEmail');
            if (!recruiterEmail.value.trim()) {
                displayError(recruiterEmail, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(recruiterEmail.value.trim())) {
                displayError(recruiterEmail, 'Please enter a valid email address.');
                isValid = false;
            }

            const recruiterMessage = document.getElementById('recruiterMessage');
            if (!recruiterMessage.value.trim()) {
                displayError(recruiterMessage, 'Message cannot be empty.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                alert('Message submitted (simulated)!');
                event.preventDefault();
                recruiterForm.reset();
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
