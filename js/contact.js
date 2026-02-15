 // Navbar scroll effect
        document.addEventListener('DOMContentLoaded', function() {
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Fade-in animation observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        });

        // Form validation and submission
        const messageForm = document.getElementById('messageForm');
        
        messageForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (!name.value.trim()) {
                name.classList.add('is-invalid');
                nameError.textContent = 'Name is required';
                isValid = false;
            } else if (name.value.length < 2) {
                name.classList.add('is-invalid');
                nameError.textContent = 'Name must be at least 2 characters';
                isValid = false;
            } else {
                name.classList.remove('is-invalid');
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            if (!email.value) {
                email.classList.add('is-invalid');
                emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!email.value.includes('@') || !email.value.includes('.')) {
                email.classList.add('is-invalid');
                emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            } else {
                email.classList.remove('is-invalid');
            }
            
            // Validate subject
            const subject = document.getElementById('subject');
            const subjectError = document.getElementById('subjectError');
            if (!subject.value) {
                subject.classList.add('is-invalid');
                subjectError.textContent = 'Please select a subject';
                isValid = false;
            } else {
                subject.classList.remove('is-invalid');
            }
            
            // Validate message
            const message = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (!message.value.trim()) {
                message.classList.add('is-invalid');
                messageError.textContent = 'Message is required';
                isValid = false;
            } else if (message.value.length < 10) {
                message.classList.add('is-invalid');
                messageError.textContent = 'Message must be at least 10 characters';
                isValid = false;
            } else {
                message.classList.remove('is-invalid');
            }
            
            if (isValid) {
                const newsletter = document.getElementById('newsletter').checked;
                alert(`Thank you, ${name.value}! Your ${subject.options[subject.selectedIndex].text.toLowerCase()} inquiry has been received. We'll respond to ${email.value} within 24-48 hours.${newsletter ? '\n\nYou have been subscribed to our newsletter!' : ''}`);
                messageForm.reset();
            }
        });

        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    this.value = `(${value}`;
                } else if (value.length <= 6) {
                    this.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    this.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
        });

        // Character counter for message
        const messageTextarea = document.getElementById('message');
        const charCounter = document.getElementById('charCounter');
        
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCounter.textContent = `${count} characters`;
            charCounter.style.color = count < 10 ? '#dc3545' : '#5D7B6F';
        });

        // Newsletter subscription
        function subscribeNewsletter() {
            const email = document.getElementById('newsletterEmail').value;
            const messageElement = document.getElementById('subscriptionMessage');
            
            if (email && email.includes('@') && email.includes('.')) {
                messageElement.textContent = `Thank you for subscribing with ${email}!`;
                messageElement.className = "mt-2 small text-success";
                document.getElementById('newsletterEmail').value = '';
                
                // Store in localStorage (simulating)
                let subscribers = JSON.parse(localStorage.getItem('luminaSubscribers') || '[]');
                subscribers.push({ email, date: new Date().toLocaleDateString() });
                localStorage.setItem('luminaSubscribers', JSON.stringify(subscribers));
            } else {
                messageElement.textContent = "Please enter a valid email address.";
                messageElement.className = "mt-2 small text-warning";
            }
        }

        // Subject change event - update placeholder
        document.getElementById('subject').addEventListener('change', function() {
            const messageField = document.getElementById('message');
            switch(this.value) {
                case 'wellness':
                    messageField.placeholder = "Tell us about your wellness goals...";
                    break;
                case 'support':
                    messageField.placeholder = "Describe the technical issue you're experiencing...";
                    break;
                case 'feedback':
                    messageField.placeholder = "We'd love to hear your thoughts about Lumina Wellness...";
                    break;
                default:
                    messageField.placeholder = "How can we help you today?";
            }
        });

        // Clear validation on input
        document.querySelectorAll('.form-control, .form-select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });