// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 2000);
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Download Timer
const windowsDownload = document.querySelector('.windows-download');
const startDate = new Date();
const endDate = new Date(startDate.getTime() + (20 * 24 * 60 * 60 * 1000)); // 20 days

function updateTimer() {
    const now = new Date();
    const timeDiff = endDate - now;

    if (timeDiff <= 0) {
        windowsDownload.textContent = 'Download for Windows';
        windowsDownload.classList.add('active');
        windowsDownload.addEventListener('click', startDownload);
        return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    windowsDownload.textContent = `Available in ${days}d ${hours}h`;
}

function startDownload(e) {
    e.preventDefault();
    // Add your download logic here
    alert('Starting download...');
}

updateTimer();
setInterval(updateTimer, 1000 * 60 * 60); // Update every hour

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(faqItem => faqItem.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Shop Functionality
const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.closest('.plan-card');
        const durationSelect = plan.querySelector('select');
        const selectedDuration = durationSelect ? durationSelect.value : 'free';
        
        // Redirect to checkout page
        window.location.href = `checkout.html?plan=${selectedDuration}`;
    });
});

// Copy Script Functionality
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const scriptCard = button.closest('.script-card');
        const scriptText = scriptCard.querySelector('h3').textContent;
        
        // In a real implementation, you would have actual script content to copy
        navigator.clipboard.writeText(`-- ${scriptText} script content here`);
        
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy Script';
        }, 2000);
    });
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .script-card, .plan-card').forEach(element => {
    observer.observe(element);
});