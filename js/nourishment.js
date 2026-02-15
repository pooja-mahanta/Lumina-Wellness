        let selectedSkinType = '';
        let completedDays = 0;
        let morningCompleted = false;
        let eveningCompleted = false;
        
        function updateGreeting() {
            let now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            
            let timeString = hours.toString().padStart(2, '0') + ':' + 
                            minutes.toString().padStart(2, '0') + ':' + 
                            seconds.toString().padStart(2, '0');
            
            document.getElementById('currentTime').innerHTML = 'Current Time: ' + timeString;
            
            let greeting = '';
            let iconClass = '';
            let message = '';
            
            if (hours >= 5 && hours < 12) {
                greeting = 'Good Morning!';
                iconClass = 'fas fa-sun';
                message = 'Perfect time for morning skincare routine!';
            } else if (hours >= 12 && hours < 17) {
                greeting = 'Good Afternoon!';
                iconClass = 'fas fa-cloud-sun';
                message = 'Don\'t forget your sunscreen!';
            } else if (hours >= 17 && hours < 21) {
                greeting = 'Good Evening!';
                iconClass = 'fas fa-moon';
                message = 'Time for evening cleansing routine!';
            } else {
                greeting = 'Good Night!';
                iconClass = 'fas fa-star';
                message = 'Perfect time for overnight treatment!';
            }
            
            document.getElementById('greetingText').innerHTML = greeting;
            document.getElementById('greetingIcon').innerHTML = `<i class="${iconClass}"></i>`;
            document.getElementById('greetingMessage').innerHTML = message;
            
            console.log('Greeting: ' + greeting + ' at ' + timeString);
        }
        
        function completeMorningRoutine() {
            morningCompleted = true;
            alert('Morning skincare routine completed! ✅');
            checkDailyCompletion();
        }
        
        function completeEveningRoutine() {
            eveningCompleted = true;
            alert('Evening skincare routine completed! ✅');
            checkDailyCompletion();
        }
        
        function checkDailyCompletion() {
            if (morningCompleted && eveningCompleted) {
                alert('Excellent! You completed both routines today. 🎉');
                morningCompleted = false;
                eveningCompleted = false;
            }
        }
        
        function markDayComplete(day) {
            let dayBox = document.getElementById(day + 'Box');
            
            if (dayBox.classList.contains('completed')) {
                alert('This day is already marked as complete!');
                return;
            }
            
            dayBox.classList.add('completed');
            dayBox.querySelector('button').innerHTML = 'Completed ✓';
            dayBox.querySelector('button').disabled = true;
            
            completedDays++;
            document.getElementById('completedDays').innerHTML = completedDays;
            
            let progress = Math.round((completedDays / 7) * 100);
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('progressBar').innerHTML = progress + '%';
            document.getElementById('progressPercentage').innerHTML = progress + '%';
            
            alert('Day marked as complete! Great job! 🎉');
            
            if (completedDays === 7) {
                alert('🎉 Congratulations! You completed the entire week! Your skin thanks you!');
            }
        }
        
        function selectSkinType(type) {
            selectedSkinType = type;
            
            let allOptions = document.querySelectorAll('.quiz-option');
            for (let i = 0; i < allOptions.length; i++) {
                allOptions[i].classList.remove('selected');
            }
            
            event.currentTarget.classList.add('selected');
            
            console.log('Selected skin type: ' + type);
        }
        
        function showSkinResults() {
            if (selectedSkinType === '') {
                alert('Please select your skin type first!');
                return;
            }
            
            let skinTypes = {
                'oily': 'Oily skin produces excess sebum. Use oil-free products and gentle cleansers.',
                'dry': 'Dry skin lacks moisture. Use creamy cleansers and rich moisturizers.',
                'combination': 'Combination skin needs different care for different areas.',
                'normal': 'Normal skin is balanced. Maintain with gentle, consistent care.',
                'sensitive': 'Sensitive skin needs fragrance-free, gentle products.'
            };
            
            document.getElementById('skinTypeResult').innerHTML = selectedSkinType.toUpperCase();
            document.getElementById('skinTypeDescription').innerHTML = skinTypes[selectedSkinType];
            document.getElementById('skinResults').style.display = 'block';
            
            let recommendations = {
                'oily': 'Recommendation: Gel cleanser, oil-free moisturizer, weekly clay mask.',
                'dry': 'Recommendation: Cream cleanser, hydrating serum, rich night cream.',
                'combination': 'Recommendation: Different products for T-zone and cheeks.',
                'normal': 'Recommendation: Gentle cleanser, balanced moisturizer, regular SPF.',
                'sensitive': 'Recommendation: Fragrance-free products, patch test everything.'
            };
            
            alert('Your Skin Type: ' + selectedSkinType.toUpperCase() + '\n\n' + 
                  skinTypes[selectedSkinType] + '\n\n' + 
                  recommendations[selectedSkinType]);
        }
        
        function resetSkinQuiz() {
            selectedSkinType = '';
            
            let allOptions = document.querySelectorAll('.quiz-option');
            for (let i = 0; i < allOptions.length; i++) {
                allOptions[i].classList.remove('selected');
            }
            
            document.getElementById('skinResults').style.display = 'none';
            
            console.log('Quiz reset');
        }
        
        function startSkincareQuiz() {
            resetSkinQuiz();
            alert('Let\'s find your skin type! Select how your skin feels.');
        }
        
        window.onload = function() {
            updateGreeting();
            
            setInterval(updateGreeting, 1000);
            
            completedDays = 0;
            morningCompleted = false;
            eveningCompleted = false;
            
            console.log('Skincare page loaded successfully!');
            console.log('Ready to help you achieve healthy, glowing skin!');
        };
        
        function showTip() {
            let tips = [
                'Drink more water for hydrated skin!',
                'Never sleep with makeup on!',
                'Always apply sunscreen!',
                'Be consistent with your routine!',
                'Listen to your skin\'s needs!'
            ];
            
            let randomIndex = Math.floor(Math.random() * tips.length);
            alert('💡 Skincare Tip: ' + tips[randomIndex]);
        }