document.addEventListener('DOMContentLoaded', function() {
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) navbar.classList.add('scrolled');
                else navbar.classList.remove('scrolled');
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        });

        // recipe filter
        function filterRecipes(category) {
            const items = document.querySelectorAll('.recipe-item');
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.toLowerCase().includes(category) || (category==='all' && btn.textContent.trim()==='All')) 
                    btn.classList.add('active');
            });
            items.forEach(item => {
                if (category === 'all' || item.dataset.category.includes(category)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity='1', 50);
                } else {
                    item.style.display = 'none';
                }
            });
        }

        function viewRecipe(name) {
            alert(`🌿 ${name} recipe — full ingredients & instructions will be available in the premium version.`);
        }

        function newMealPlan() {
            alert("✨ New personalized meal plan generated (demo). Check back soon for full customization.");
        }

        function trackNutrition() {
            alert("📊 Nutrition tracker coming soon! You'll be able to log meals and see macros.");
        }

        const nutritionQuotes = [
            { text: "Let food be thy medicine and medicine be thy food.", author: "Hippocrates" },
            { text: "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.", author: "Ancient Ayurvedic Proverb" },
            { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
            { text: "The food you eat can be either the safest and most powerful form of medicine or the slowest form of poison.", author: "Ann Wigmore" }
        ];

        function newNutritionQuote() {
            const random = nutritionQuotes[Math.floor(Math.random() * nutritionQuotes.length)];
            const quoteCard = document.querySelector('.quote-card');
            if (quoteCard) {
                quoteCard.innerHTML = `<i class="fas fa-quote-left quote-icon mb-4" style="font-size: 3rem; opacity:0.8;"></i>
                    <h3 class="mb-4">"${random.text}"</h3>
                    <p class="fs-5">— ${random.author}</p>
                    <button class="btn btn-light mt-3" onclick="newNutritionQuote()">More wisdom</button>`;
            }
        }

        function subscribeNewsletter() {
            const email = document.getElementById('newsletterEmail').value;
            const msg = document.getElementById('subscriptionMessage');
            if (email && email.includes('@')) {
                msg.textContent = `Thanks! Recipes sent to ${email}`;
                msg.className = "mt-2 small text-success";
                document.getElementById('newsletterEmail').value = '';
            } else {
                msg.textContent = "Valid email required";
                msg.className = "mt-2 small text-warning";
            }
        }