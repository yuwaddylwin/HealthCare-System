// You can add any client-side JavaScript functionality here
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (if needed)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav ul');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
    }
    
    // Form validation examples
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!valid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Password confirmation check
    const passwordConfirmForms = document.querySelectorAll('form[data-password-confirm]');
    passwordConfirmForms.forEach(form => {
        const password = form.querySelector('#password');
        const confirmPassword = form.querySelector('#confirmPassword');
        
        if (password && confirmPassword) {
            form.addEventListener('submit', function(e) {
                if (password.value !== confirmPassword.value) {
                    e.preventDefault();
                    confirmPassword.style.borderColor = 'red';
                    alert('Passwords do not match!');
                }
            });
        }
    });
});