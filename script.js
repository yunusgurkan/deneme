// Love messages array for variety
const loveMessages = [
    "Seni çok seviyorum! 💕",
    "Sen benim her şeyimsin! 🌟",
    "Seninle her gün daha mutluyum! 😊",
    "Kalbimin tek sahibi sensin! 💖",
    "Sana olan aşkım sonsuz! ∞",
    "Sen benim hayat arkadaşımsın! 👫",
    "Seninle geçen her an özel! ✨",
    "Gözlerin benim evim! 🏠💕"
];

// Q&A Flow Data
const qaFlow = {
    "küs-müyüz": {
        question: "Küs müyüz? 🥺",
        yes: {
            next: "neden-küstün",
            message: "Ohh hayır! 😔 Neden küstün ki?"
        },
        no: {
            message: "Yaşasın! O zaman mutluyuz! 🎉💕",
            celebration: true
        }
    },
    "neden-küstün": {
        question: "Ben bir şey yaptım mı? 🤔",
        yes: {
            next: "özür-dilerim",
            message: "Çok üzgünüm... 😢 Ne yaptığımı söyler misin?"
        },
        no: {
            next: "nasıl-barışırız",
            message: "O zaman neden küstün ki canım? 🤗"
        }
    },
    "özür-dilerim": {
        question: "Özür diliyorum... Beni affeder misin? 🥺💕",
        yes: {
            message: "Yaşasın! Seni çok seviyorum! 🎉💖",
            celebration: true
        },
        no: {
            next: "nasıl-barışırız",
            message: "Lütfen... Nasıl telafi edebilirim? 😔"
        }
    },
    "nasıl-barışırız": {
        question: "Barışmak için ne yapmamı istersin? 🤗",
        yes: {
            message: "Her istediğini yaparım! Sen sadece mutlu ol! 💕✨",
            celebration: true
        },
        no: {
            message: "Tamam o zaman... Zamanla geçer umarım 😌💕",
            gentle: true
        }
    }
};

// Current Q&A state
let currentQA = null;
let currentLoveMessageIndex = 0;
let isPlaying = false;

// DOM elements
const messageDisplay = document.getElementById('messageDisplay');
const messageText = document.getElementById('messageText');
const hugPopup = document.getElementById('hugPopup');
const confettiContainer = document.getElementById('confettiContainer');
const qaSystem = document.getElementById('qaSystem');
const mainButtons = document.getElementById('mainButtons');
const qaInterface = document.getElementById('qaInterface');
const funActivities = document.getElementById('funActivities');
const questionText = document.getElementById('questionText');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');

// Music control functions
function toggleMusic() {
    if (!backgroundMusic) {
        console.warn('Music file not found or audio element not available');
        displayMessage('Müzik dosyası bulunamadı! 🎵 music.mp3 dosyasını ekleyin.');
        return;
    }
    
    if (isPlaying) {
        backgroundMusic.pause();
        musicIcon.textContent = '🎵';
        musicText.textContent = 'Müziği Başlat';
        musicBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        backgroundMusic.play().then(() => {
            musicIcon.textContent = '🎶';
            musicText.textContent = 'Müziği Durdur';
            musicBtn.classList.add('playing');
            isPlaying = true;
        }).catch((error) => {
            console.warn('Could not play music:', error);
            displayMessage('Müzik çalınamadı! 🎵 Tarayıcı müzik dosyasını desteklemiyor olabilir.');
        });
    }
}

// Initialize music when page loads
function initializeMusic() {
    if (backgroundMusic) {
        backgroundMusic.volume = 0.3; // Set volume to 30%
        backgroundMusic.addEventListener('ended', () => {
            // Reset button when music ends
            musicIcon.textContent = '🎵';
            musicText.textContent = 'Müziği Başlat';
            musicBtn.classList.remove('playing');
            isPlaying = false;
        });
        
        backgroundMusic.addEventListener('error', () => {
            console.warn('Music file could not be loaded');
            musicBtn.style.display = 'none'; // Hide button if music can't load
        });
    }
}

// Q&A System Functions
function startQAFlow() {
    currentQA = "küs-müyüz";
    showQAInterface();
    updateQAQuestion();
}

function showQAInterface() {
    mainButtons.style.display = 'none';
    funActivities.style.display = 'none';
    qaInterface.style.display = 'block';
}

function goBackToMain() {
    mainButtons.style.display = 'grid';
    qaInterface.style.display = 'none';
    funActivities.style.display = 'none';
    currentQA = null;
    displayMessage("İşte buradayım! Bir butona tıkla ve sürprizi gör! 🌈");
}

function updateQAQuestion() {
    if (currentQA && qaFlow[currentQA]) {
        questionText.textContent = qaFlow[currentQA].question;
        questionText.style.animation = 'none';
        setTimeout(() => {
            questionText.style.animation = 'questionPulse 2s ease-in-out infinite';
        }, 100);
    }
}

function handleAnswer(answer) {
    if (!currentQA || !qaFlow[currentQA]) return;
    
    const currentQuestion = qaFlow[currentQA];
    const response = currentQuestion[answer];
    
    if (response.celebration) {
        // Happy ending with celebration
        displayMessage(response.message);
        createCelebrationEffect();
        setTimeout(() => {
            goBackToMain();
        }, 3000);
    } else if (response.gentle) {
        // Gentle ending
        displayMessage(response.message);
        createGentleHearts();
        setTimeout(() => {
            goBackToMain();
        }, 3000);
    } else if (response.next) {
        // Continue to next question
        displayMessage(response.message);
        currentQA = response.next;
        setTimeout(() => {
            updateQAQuestion();
        }, 2000);
    } else {
        // Simple response
        displayMessage(response.message);
        setTimeout(() => {
            goBackToMain();
        }, 3000);
    }
}

// Enhanced celebration effect
function createCelebrationEffect() {
    createConfetti();
    createFloatingHearts();
    createFireworks();
    playSuccessSound();
}

// Gentle hearts effect
function createGentleHearts() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '50%';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            heart.style.animation = 'gentleFloat 4s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 200);
    }
}

// Fireworks effect
function createFireworks() {
    const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 50 + '%';
            firework.style.width = '4px';
            firework.style.height = '4px';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.borderRadius = '50%';
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '999';
            firework.style.animation = 'fireworkExplode 1s ease-out forwards';
            
            document.body.appendChild(firework);
            
            // Create explosion particles
            for (let j = 0; j < 8; j++) {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = firework.style.left;
                particle.style.top = firework.style.top;
                particle.style.width = '3px';
                particle.style.height = '3px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '999';
                particle.style.animation = `fireworkParticle${j} 1.5s ease-out forwards`;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 1500);
            }
            
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, i * 300);
    }
}

// Fun Activities Functions
function showFunActivities() {
    mainButtons.style.display = 'none';
    qaInterface.style.display = 'none';
    funActivities.style.display = 'block';
    displayMessage("Eğlenceli aktivitelerden birini seç! 🎮🌈");
}

function playKissGame() {
    let kisses = 0;
    const maxKisses = 10;
    
    function addKiss() {
        kisses++;
        createKissAnimation();
        displayMessage(`Öpücük sayısı: ${kisses}/${maxKisses} 😘💕`);
        
        if (kisses >= maxKisses) {
            setTimeout(() => {
                displayMessage("Öpücük oyunu tamamlandı! Muhteşemsin! 😘✨");
                createCelebrationEffect();
            }, 1000);
        }
    }
    
    // Create clickable kiss targets
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const kissTarget = document.createElement('div');
            kissTarget.textContent = '💋';
            kissTarget.style.position = 'fixed';
            kissTarget.style.left = Math.random() * 80 + 10 + '%';
            kissTarget.style.top = Math.random() * 60 + 20 + '%';
            kissTarget.style.fontSize = '3rem';
            kissTarget.style.cursor = 'pointer';
            kissTarget.style.zIndex = '999';
            kissTarget.style.animation = 'kissTargetFloat 2s ease-in-out infinite';
            kissTarget.style.transition = 'all 0.3s ease';
            
            kissTarget.addEventListener('click', () => {
                addKiss();
                kissTarget.remove();
            });
            
            document.body.appendChild(kissTarget);
            
            setTimeout(() => {
                if (kissTarget.parentNode) {
                    kissTarget.remove();
                }
            }, 5000);
        }, i * 1000);
    }
    
    displayMessage("Öpücüklere tıkla! 💋 ✨");
}

function showCompliments() {
    const compliments = [
        "Gözlerin yıldızlar kadar parlak! ✨",
        "Gülümsemen dünyayı aydınlatıyor! 🌅",
        "Kalbin altın kadar değerli! 💖",
        "Sesin melodi gibi tatlı! 🎵",
        "Varlığın benim için bir armagan! 🎁",
        "Sen mükemmel bir insanın! 🌟",
        "İyi ki varsın hayatımda! 🌈"
    ];
    
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    displayMessage(randomCompliment);
    createFloatingHearts();
    playComplimentSound();
}

function memoryGame() {
    const memories = [
        "İlk konuştuğumuz günü hatırlıyor musun? 💕",
        "Birlikte güldüğümüz o anlar...😂",
        "Seninle geçirdiğim en güzel an...✨",
        "Sana ilk 'seni seviyorum' dediğim gün...💖",
        "Beraber dinlediğimiz şarkılar...🎵"
    ];
    
    const randomMemory = memories[Math.floor(Math.random() * memories.length)];
    showSpecialPopup("Anı Kutusu 📫", randomMemory);
}

function wishMaker() {
    const wishes = [
        "Hep beraber mutlu olmayı diliyorum! 🌟",
        "Sevgimizin hiç bitmemesini diliyorum! ♥️",
        "Hayallerimizin gerçek olmasını diliyorum! ✨",
        "Her ningún güzel geçmesini diliyorum! 🌈",
        "Sana sınırsız mutluluk diliyorum! 😊"
    ];
    
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    showSpecialPopup("Dilek Tut ⭐", randomWish);
    createSurpriseEffect();
}

// Special popup function
function showSpecialPopup(title, message) {
    const popup = document.createElement('div');
    popup.className = 'special-popup';
    popup.style.display = 'flex';
    
    popup.innerHTML = `
        <div class="popup-content">
            <button class="close-popup" onclick="this.parentElement.parentElement.remove()">❌</button>
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 5000);
}

// Function to show love messages
function showLoveMessage() {
    const message = loveMessages[currentLoveMessageIndex];
    displayMessage(message);
    currentLoveMessageIndex = (currentLoveMessageIndex + 1) % loveMessages.length;
    
    // Add hearts animation
    createFloatingHearts();
}

// Function to show hug message and popup
function showHugMessage() {
    hugPopup.style.display = 'flex';
    displayMessage("Sana sımsıkı sarılıyorum! 🤗");
}

// Function to close hug popup
function closeHugPopup() {
    hugPopup.style.display = 'none';
}

// Function to show surprise message
function showSurpriseMessage() {
    displayMessage("Sürpriz! Sen benim en büyük hediyemsin! 🎁💖");
    createSurpriseEffect();
}

// Function to display message with animation
function displayMessage(message) {
    messageText.style.opacity = '0';
    messageText.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        messageText.textContent = message;
        messageText.style.opacity = '1';
        messageText.style.transform = 'scale(1)';
        messageText.style.transition = 'all 0.5s ease';
        
        // Add pulse animation
        messageDisplay.style.animation = 'messagePulse 0.6s ease-in-out';
        setTimeout(() => {
            messageDisplay.style.animation = '';
        }, 600);
    }, 200);
}

// Function to create floating hearts
function createFloatingHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = ['💖', '💕', '💗', '💝', '❤️'][Math.floor(Math.random() * 5)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            heart.style.animation = 'floatUp 3s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

// Function to add button shake effect
function addButtonShake() {
    const buttons = document.querySelectorAll('.cute-button');
    buttons.forEach(button => {
        button.style.animation = 'buttonShake 0.5s ease-in-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    });
}

// Function to create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 20);
    }
}

// Function to create kiss animation
function createKissAnimation() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const kiss = document.createElement('div');
            kiss.textContent = ['😘', '💋', '💕'][Math.floor(Math.random() * 3)];
            kiss.style.position = 'fixed';
            kiss.style.left = Math.random() * 100 + '%';
            kiss.style.top = Math.random() * 100 + '%';
            kiss.style.fontSize = '2rem';
            kiss.style.pointerEvents = 'none';
            kiss.style.zIndex = '999';
            kiss.style.animation = 'kissFloat 2s ease-out forwards';
            
            document.body.appendChild(kiss);
            
            setTimeout(() => {
                kiss.remove();
            }, 2000);
        }, i * 150);
    }
}

// Function to create surprise effect
function createSurpriseEffect() {
    // Create sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '999';
            sparkle.style.animation = 'sparkleExplosion 1.5s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }, i * 50);
    }
    
    // Add page shake effect
    document.body.style.animation = 'pageShake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes buttonShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes messagePulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes kissFloat {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0.5) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkleExplosion {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0.2) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pageShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }
    
    @keyframes gentleFloat {
        0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
        }
        50% {
            transform: translateY(-50px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) scale(0.3);
            opacity: 0;
        }
    }
    
    @keyframes fireworkExplode {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(20);
            opacity: 0;
        }
    }
    
    @keyframes kissTargetFloat {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(10deg);
        }
    }
`;

// Add firework particle animations
for (let i = 0; i < 8; i++) {
    const angle = (i * 45) * (Math.PI / 180); // Convert to radians
    const distance = 50;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    style.textContent += `
        @keyframes fireworkParticle${i} {
            0% {
                transform: translate(0, 0);
                opacity: 1;
            }
            100% {
                transform: translate(${x}px, ${y}px);
                opacity: 0;
            }
        }
    `;
}

// Add click sound effect (optional - using Web Audio API)
function playClickSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Success sound for celebrations
function playSuccessSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
    }
}

// Compliment sound
function playComplimentSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// Add click sound to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cute-button, .answer-btn, .activity-btn');
    buttons.forEach(button => {
        button.addEventListener('click', playClickSound);
    });
});

// Add keyboard support for accessibility
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (hugPopup.style.display === 'flex') {
            closeHugPopup();
        }
        const popups = document.querySelectorAll('.special-popup');
        popups.forEach(popup => popup.remove());
    }
});

// Add some random floating animations on page load
window.addEventListener('load', function() {
    // Initialize music
    initializeMusic();
    
    // Add some initial floating hearts after page loads
    setTimeout(() => {
        createFloatingHearts();
    }, 1000);
    
    // Add periodic sparkles
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 5 seconds
            const sparkle = document.createElement('div');
            sparkle.textContent = ['✨', '⭐'][Math.floor(Math.random() * 2)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1';
            sparkle.style.animation = 'sparkleExplosion 2s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }, 5000);
});