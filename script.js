// Smooth scroll for navigation
const navLinks = document.querySelectorAll('.header nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animate sections on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.sample-section').forEach(section => {
    observer.observe(section);
});

// Observe the about section for animation
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    observer.observe(aboutSection);
}

// Observe the contact section for animation
const contactSection = document.querySelector('.contact');
if (contactSection) {
    observer.observe(contactSection);
}

// Add animation class in CSS for .in-view if needed 

// Audio visualizer for each audio player

const bgCircles = [
    document.querySelector('.bg-circle1'),
    document.querySelector('.bg-circle2'),
    document.querySelector('.bg-circle3'),
    document.querySelector('.bg-circle4'),
    document.querySelector('.bg-circle5'),
    document.querySelector('.bg-circle6')
];

function setBgPulse(volume) {
    // Scale and opacity based on volume (0-1)
    const scale = 1 + volume * 0.5;
    const opacity = 0.25 + volume * 0.5;
    bgCircles.forEach((circle, i) => {
        if (circle) {
            circle.classList.add('pulse');
            circle.style.transform = `scale(${scale + i*0.07})`;
            circle.style.opacity = opacity;
        }
    });
}
function resetBgPulse() {
    bgCircles.forEach((circle) => {
        if (circle) {
            circle.style.transform = '';
            circle.style.opacity = '';
            circle.classList.remove('pulse');
        }
    });
}

document.querySelectorAll('.audio-visualizer').forEach(canvas => {
    const audioId = canvas.getAttribute('data-audio');
    const audio = document.getElementById(audioId);
    if (!audio) return;

    const ctx = canvas.getContext('2d');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 32;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let source;
    let animationId;

    function draw() {
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Visualizer bars
        const barWidth = (canvas.width / bufferLength) - 2;
        for (let i = 0; i < bufferLength; i++) {
            const value = dataArray[i];
            const percent = value / 255;
            const barHeight = canvas.height * percent;
            let color;
            if (percent > 0.7) color = '#ff2a00';
            else if (percent > 0.4) color = '#ffb347';
            else color = '#aaff00';
            ctx.fillStyle = color;
            ctx.fillRect(i * (barWidth + 2), canvas.height - barHeight, barWidth, barHeight);
        }

        // Background pulse effect
        const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength / 255;
        setBgPulse(avg);

        animationId = requestAnimationFrame(draw);
    }

    audio.addEventListener('play', () => {
        if (!source) {
            source = audioCtx.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }
        audioCtx.resume();
        draw();
    });

    audio.addEventListener('pause', () => {
        cancelAnimationFrame(animationId);
        resetBgPulse();
    });
    audio.addEventListener('ended', () => {
        cancelAnimationFrame(animationId);
        resetBgPulse();
    });
}); 

// Smooth scroll for Contact Me button in intro
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
} 

// Typing effect for welcome heading
const typingSpan = document.querySelector('.typing-effect');
if (typingSpan) {
    const fullText = typingSpan.textContent;
    typingSpan.textContent = '';
    let i = 0;
    function typeChar() {
        if (i <= fullText.length) {
            typingSpan.textContent = fullText.slice(0, i);
            i++;
            setTimeout(typeChar, 60);
        }
    }
    typeChar();
} 

// Scroll-to-top button logic
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
} 
