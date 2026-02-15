// reuse animations and some functions from index
        document.addEventListener('DOMContentLoaded', function() {
            // navbar scroll
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) navbar.classList.add('scrolled');
                else navbar.classList.remove('scrolled');
            });
            // fade observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        });

        // practice start
        function startPractice(name) {
            alert(`✨ Starting your ${name} session. Breathe and move mindfully!`);
        }

        // movement quote
        const movementQuotes = [
            { text: "Movement is a medicine for creating change in a person's physical, emotional, and mental states.", author: "Carol Welch" },
            { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
            { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
            { text: "Walking is the best possible exercise. Habituate yourself to walk very far.", author: "Thomas Jefferson" },
            { text: "Yoga is the journey of the self, through the self, to the self.", author: "The Bhagavad Gita" }
        ];
        function newMovementQuote() {
            const random = movementQuotes[Math.floor(Math.random() * movementQuotes.length)];
            const quoteCard = document.querySelector('.quote-card');
            if (quoteCard) {
                quoteCard.innerHTML = `<i class="fas fa-quote-left quote-icon mb-4" style="font-size: 3rem; opacity:0.8;"></i>
                    <h3 class="mb-4">"${random.text}"</h3>
                    <p class="fs-5">— ${random.author}</p>
                    <button class="btn btn-light mt-3" onclick="newMovementQuote()">More inspiration</button>`;
            }
        }

        // newsletter (copy from index)
        function subscribeNewsletter() {
            const email = document.getElementById('newsletterEmail').value;
            const messageElement = document.getElementById('subscriptionMessage');
            if (email && email.includes('@')) {
                messageElement.textContent = `Thank you for subscribing with ${email}!`;
                messageElement.className = "mt-2 small text-success";
                document.getElementById('newsletterEmail').value = '';
                setTimeout(() => alert('Welcome to the LuminaWellness community!'), 200);
            } else {
                messageElement.textContent = "Please enter a valid email address.";
                messageElement.className = "mt-2 small text-warning";
            }
        }