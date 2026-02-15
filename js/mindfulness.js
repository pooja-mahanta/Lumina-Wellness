var timerInterval;
        var timeLeft = 300;
        var isRunning = false;
        var currentPreset = 5;
        var activePresetElement = null;
        
        // Array of mindfulness tips
        var mindfulnessTips = [
            "Take 5 deep breaths, focusing on the sensation of air entering and leaving your body.",
            "Notice 3 things you can see, 2 things you can hear, and 1 thing you can feel right now.",
            "Practice gratitude by thinking of 3 things you're thankful for today.",
            "Do a body scan from head to toe, noticing any tension and consciously relaxing each area.",
            "Spend 1 minute just listening to all the sounds around you without judgment.",
            "Practice mindful eating with your next meal - notice colors, smells, textures, and flavors.",
            "Take a short walk and pay attention to each step and your surroundings.",
            "Write down 3 positive things that happened today, no matter how small."
        ];
        
        function updateTime() {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            
            if (hours < 10) {
                hours = '0' + hours;
            }
            
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            
            document.getElementById('currentTime').innerHTML = hours + ':' + minutes + ':' + seconds;
        }
        
        setInterval(updateTime, 1000);
        
        function initTimer() {
            activePresetElement = document.getElementById('presetContainer').getElementsByTagName('div')[2];
            updateTimerDisplay();
        }
        
        function startTimer() {
            if (isRunning) return;
            
            isRunning = true;
            document.getElementById('startBtn').disabled = true;
            document.getElementById('pauseBtn').disabled = false;
            
            timerInterval = setInterval(function() {
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    document.getElementById('startBtn').disabled = false;
                    document.getElementById('pauseBtn').disabled = true;
                    
                    alert('Meditation session complete! Take a moment to notice how you feel.');
                    return;
                }
                
                timeLeft = timeLeft - 1;
                updateTimerDisplay();
            }, 1000);
        }
        
        function pauseTimer() {
            if (!isRunning) return;
            
            clearInterval(timerInterval);
            isRunning = false;
            document.getElementById('startBtn').disabled = false;
            document.getElementById('pauseBtn').disabled = true;
        }
        
        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            timeLeft = currentPreset * 60;
            updateTimerDisplay();
            document.getElementById('startBtn').disabled = false;
            document.getElementById('pauseBtn').disabled = true;
        }
        
        function updateTimerDisplay() {
            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft % 60;
            
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            
            document.getElementById('timerDisplay').innerHTML = minutes + ' : ' + seconds;
        }
        
        function setPresetTime(minutes, element) {
            if (activePresetElement) {
                activePresetElement.className = 'preset-time';
            }
            
            element.className = 'preset-time active';
            activePresetElement = element;
            
            currentPreset = minutes;
            if (!isRunning) {
                timeLeft = minutes * 60;
                updateTimerDisplay();
            }
        }
        
        function setActiveNav(element) {
            var navLinks = document.getElementById('navList').getElementsByTagName('a');
            
            for (var i = 0; i < navLinks.length; i++) {
                navLinks[i].className = '';
            }
            
            element.className = 'active';
        }
        
        // Start meditation function
        function startMeditation() {
            var response = confirm('Start a 5-minute meditation session?');
            
            if (response) {
                alert('Find a comfortable position. Close your eyes if you wish. Focus on your breath. Begin your meditation now.');
                resetTimer();
                startTimer();
            }
        }
        
        function showAlert(message) {
            alert(message);
        }
        
        function showMindfulnessTip() {
            var randomIndex = Math.floor(Math.random() * mindfulnessTips.length);
            var randomTip = mindfulnessTips[randomIndex];
            
            var resultBox = document.getElementById('tipResult');
            resultBox.innerHTML = '<h3 style="color:#2c3e50; margin-bottom:15px;">Today\'s Mindfulness Tip 💡</h3><p style="color:#2c3e50; font-size:18px;">' + randomTip + '</p>';
            resultBox.style.display = 'block';
        }
        
        function getUserName() {
            var userName = prompt("What is your name?", "Meditation Beginner");
            if (userName) {
                alert("Welcome to Lumina Wellness, " + userName + "! Start your mindfulness journey today.");
            }
        }
        
        window.onload = function() {
            updateTime();
            initTimer();
        };
        
        console.log('Lumina Wellness Mindfulness page loaded');