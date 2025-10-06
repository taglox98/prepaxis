// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

if (mobileMenu && nav) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Product Purchase Buttons
const productButtons = document.querySelectorAll('.btn-product');
const paymentModal = document.getElementById('paymentModal');
const closeModal = document.querySelector('.close-modal');
const modalProductName = document.getElementById('modalProductName');

if (productButtons.length > 0 && paymentModal) {
    productButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = button.getAttribute('data-product');
            
            // Set product name in modal based on selection
            if (product === 'jee') {
                modalProductName.textContent = 'JEE Complete Package';
            } else if (product === 'neet') {
                modalProductName.textContent = 'NEET Complete Package';
            } else {
                modalProductName.textContent = 'Subject-wise Package';
            }
            
            paymentModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Payment Form Submission
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const product = modalProductName.textContent;
        
        // Create WhatsApp message
        const message = `Hello! I want to purchase ${product} from PrepAxis.%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0APlease send me payment details.`;
        
        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/919653565952?text=${message}`, '_blank');
        
        // Close modal
        if (paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Reset form
        paymentForm.reset();
        
        // Show confirmation
        alert('Thank you! Opening WhatsApp to complete your purchase. Please send the message to confirm your order.');
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create WhatsApp message for contact
        const whatsappMessage = `New Contact Message from PrepAxis Website:%0A%0AName: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
        
        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/919653565952?text=${whatsappMessage}`, '_blank');
        
        // Show confirmation
        alert('Thank you for your message! Opening WhatsApp to send your inquiry.');
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu && nav) {
                mobileMenu.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .demo-card, .feature, .step');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.product-card, .demo-card, .feature, .step');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation after a short delay
    setTimeout(() => {
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Check on page load
    }, 500);
});

// Demo PDF download tracking
document.querySelectorAll('.btn-demo').forEach(button => {
    button.addEventListener('click', function() {
        const subject = this.closest('.demo-card').querySelector('h3').textContent;
        
        // Send download notification via WhatsApp
        const message = `Demo PDF Download:%0A%0ASubject: ${subject}%0ATime: ${new Date().toLocaleString()}%0A%0AUser downloaded free demo material.`;
        
        // Open WhatsApp in background (user may or may not send)
        setTimeout(() => {
            window.open(`https://wa.me/919653565952?text=${message}`, '_blank');
        }, 1000);
    });
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}