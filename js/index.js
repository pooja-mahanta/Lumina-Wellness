 // VIDEO SCRIPT
        const heroVideo = document.getElementById('heroVideo');
        const muteBtn = document.getElementById('muteBtn');

        const videoOptions = [
            'https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-shot-of-the-ocean-waves-3181-large.mp4',
            'https://assets.mixkit.co/videos/preview/mixkit-waves-of-water-in-sunset-1743-large.mp4',
            'https://assets.mixkit.co/videos/preview/mixkit-young-woman-doing-yoga-by-the-sea-4698-large.mp4',
            'https://assets.mixkit.co/videos/preview/mixkit-foggy-forest-1295-large.mp4',
            'https://assets.mixkit.co/videos/preview/mixkit-woman-practicing-yoga-on-the-beach-4702-large.mp4'
        ];
        let currentVideoIndex = 0;

        function toggleMute() {
            heroVideo.muted = !heroVideo.muted;
            muteBtn.innerHTML = heroVideo.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        }

        function changeVideo() {
            currentVideoIndex = (currentVideoIndex + 1) % videoOptions.length;
            const wasMuted = heroVideo.muted;
            heroVideo.src = videoOptions[currentVideoIndex];
            heroVideo.load();
            heroVideo.play().catch(e => console.log('play issue', e));
            heroVideo.muted = wasMuted;
            showNotification('🌊 new peaceful scene');
        }

        function showNotification(msg) {
            const notif = document.createElement('div');
            notif.textContent = msg;
            notif.style.cssText = 'position:fixed; top:100px; right:20px; background:#5D7B6F; color:white; padding:10px 20px; border-radius:10px; z-index:10000; animation:fadeInOut 2s;';
            document.body.appendChild(notif);
            setTimeout(() => notif.remove(), 2000);
        }

        // TRACKERS
        function calculateBMI() {
            const w = parseFloat(document.getElementById('bmiWeight').value);
            const hCm = parseFloat(document.getElementById('bmiHeight').value);
            const resultDiv = document.getElementById('bmiResult');
            if (!w || !hCm || w<=0 || hCm<=0) { resultDiv.innerHTML = '⚠️ enter valid numbers'; return; }
            const hM = hCm / 100;
            const bmi = w / (hM * hM);
            let cat = '';
            if (bmi < 18.5) cat = 'underweight';
            else if (bmi < 25) cat = 'healthy weight';
            else if (bmi < 30) cat = 'overweight';
            else cat = 'obese';
            resultDiv.innerHTML = `BMI: ${bmi.toFixed(1)} (${cat})`;
        }

        let waterCount = 0;
        function updateWaterDisplay() {
            document.getElementById('waterResult').innerHTML = `🥤 ${waterCount} glass${waterCount!==1?'es':''} (${waterCount*250} ml)`;
            document.getElementById('waterGlasses').value = waterCount;
        }
        function addWater() {
            waterCount = Math.min(20, waterCount + 1);
            updateWaterDisplay();
        }
        function resetWater() {
            waterCount = 0;
            updateWaterDisplay();
        }

        function logSleep() {
            const hrs = parseFloat(document.getElementById('sleepHours').value);
            const res = document.getElementById('sleepResult');
            if (isNaN(hrs) || hrs<0 || hrs>16) { res.innerHTML = '⏳ enter hours (0-16)'; return; }
            let feedback = '';
            if (hrs < 5) feedback = 'too little – try to rest more';
            else if (hrs < 7) feedback = 'fair, but aim for 7-9h';
            else if (hrs <= 9) feedback = 'optimal! well rested';
            else feedback = 'long sleep, may affect energy';
            res.innerHTML = `😴 ${hrs} hours – ${feedback}`;
        }

        // Original functions
        function initAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
            }, { threshold:0.1 });
            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        }

        const tips = [ "Start your day with a glass of warm lemon water to boost digestion and metabolism. This simple practice helps alkalize your body.", "Practice 5 minutes of mindful breathing before starting your workday to center yourself and reduce stress.", "Incorporate 30 minutes of gentle movement into your daily routine - even a peaceful walk in nature counts.", "Stay hydrated by drinking at least 8 glasses of water throughout the day for optimal cellular function.", "Take a 10-minute mindful walk after meals to aid digestion and connect with your surroundings.", "Get 7-8 hours of quality sleep each night - create a calming bedtime routine without screens.", "Include at least 5 servings of colorful fruits and vegetables in your daily diet for natural antioxidants.", "Practice gratitude by writing down 3 things you're thankful for each day before bedtime.", "Try a 3-minute body scan meditation to release tension and connect with your physical self.", "Incorporate fermented foods like yogurt or kimchi into your diet for gut health support." ];
        function setDailyTip() { document.getElementById('daily-tip').textContent = tips[new Date().getDate() % tips.length]; }
        function getNewTip() { 
            let t = document.getElementById('daily-tip');
            t.textContent = tips[Math.floor(Math.random()*tips.length)];
            t.style.animation='none'; setTimeout(()=> t.style.animation='fadeInUp 0.5s ease',10);
        }
        function saveTip() { alert('Tip saved: "'+document.getElementById('daily-tip').textContent+'"'); }

        const quotes = [
            {text:"Health is a state of complete harmony of the body, mind and spirit. When one is free from physical disabilities and mental distractions, the gates of the soul open.", author:"B.K.S. Iyengar"},
            {text:"The greatest wealth is health.", author:"Virgil"},
            {text:"Take care of your body. It's the only place you have to live.", author:"Jim Rohn"},
            {text:"Wellness is the complete integration of body, mind, and spirit - the realization that everything we do, think, feel, and believe has an effect on our state of well-being.", author:"Greg Anderson"},
            {text:"A healthy outside starts from the inside.", author:"Robert Urich"},
            {text:"The present moment is the only time over which we have dominion.", author:"Thich Nhat Hanh"},
            {text:"Mindfulness is the aware, balanced acceptance of the present experience.", author:"Sylvia Boorstein"},
            {text:"Peace comes from within. Do not seek it without.", author:"Buddha"},
            {text:"The body achieves what the mind believes.", author:"Napoleon Hill"},
            {text:"Happiness is the highest form of health.", author:"Dalai Lama"}
        ];
        function newQuote() {
            let r = quotes[Math.floor(Math.random()*quotes.length)];
            document.getElementById('quote-text').textContent = `"${r.text}"`;
            document.getElementById('quote-author').textContent = `- ${r.author}`;
            let qc = document.querySelector('.quote-card');
            qc.style.animation='none'; setTimeout(()=> qc.style.animation='fadeInUp 0.8s ease',10);
        }

        function subscribeNewsletter() {
            let email = document.getElementById('newsletterEmail').value;
            let msg = document.getElementById('subscriptionMessage');
            if (email && email.includes('@')) {
                msg.textContent = `Thank you for subscribing with ${email}!`;
                msg.className = "mt-2 small text-success";
                document.getElementById('newsletterEmail').value = '';
                setTimeout(() => alert('Welcome to LuminaWellness community!'),300);
            } else {
                msg.textContent = "Please enter a valid email address.";
                msg.className = "mt-2 small text-warning";
            }
        }

        const style = document.createElement('style');
        style.textContent = `@keyframes fadeInOut{0%{opacity:0;transform:translateY(-10px);}20%{opacity:1;transform:translateY(0);}80%{opacity:1;transform:translateY(0);}100%{opacity:0;transform:translateY(-10px);}}`;
        document.head.appendChild(style);

        document.addEventListener('DOMContentLoaded', function() {
            heroVideo.play().catch(err => {
                console.log('autoplay blocked', err);
                const enablePlay = () => {
                    heroVideo.play();
                    document.body.removeEventListener('click', enablePlay);
                    document.body.removeEventListener('touchstart', enablePlay);
                };
                document.body.addEventListener('click', enablePlay);
                document.body.addEventListener('touchstart', enablePlay);
            });

            initAnimations();
            setDailyTip();
            newQuote();
            resetWater();
            calculateBMI();
            logSleep();

            window.addEventListener('scroll', function() {
                document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
            });

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const target = document.querySelector(targetId);
                    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                });
            });
        });