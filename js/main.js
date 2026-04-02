document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Sticky Navbar & Active Link Update on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !hasCounted) {
                statNumbers.forEach(stat => {
                    const targetText = stat.getAttribute('data-target') || stat.innerText;
                    const target = parseInt(targetText.replace(/\D/g, ''));
                    const suffix = targetText.replace(/[0-9]/g, '');
                    const duration = 2000; // ms
                    const stepTime = Math.abs(Math.floor(duration / target));
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += Math.ceil(target / 100);
                        if(current >= target) {
                            stat.innerHTML = target + '<span>' + suffix + '</span>';
                            clearInterval(timer);
                        } else {
                            stat.innerHTML = current + '<span>' + suffix + '</span>';
                        }
                    }, stepTime);
                });
                hasCounted = true;
            }
        });
    }, { threshold: 0.5 });
    
    const statsContainer = document.querySelector('.stats-container');
    if(statsContainer) {
        countObserver.observe(statsContainer);
    }

    // 5. Contact Form Mock Submit
    const contactForm = document.getElementById('demo-contact-form');
    const modalOverlay = document.getElementById('success-modal');
    const modalClose = document.getElementById('close-modal');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Loading state
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            setTimeout(() => {
                // Show modal
                if(modalOverlay) {
                    modalOverlay.classList.add('active');
                }
                
                // Reset form
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    if(modalClose) {
        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    // Close modal on outside click
    if(modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if(e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
});
