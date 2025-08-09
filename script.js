// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Image Slider
let currentSlide = 1;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (n > slides.length) currentSlide = 1;
    if (n < 1) currentSlide = slides.length;
    
    slides[currentSlide - 1].classList.add('active');
    dots[currentSlide - 1].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide += 1);
}

function prevSlide() {
    showSlide(currentSlide -= 1);
}

window.goToSlide = function(n) {
    showSlide(currentSlide = n);
};

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // เปลี่ยนเป็น Public Key ของคุณ
})();

// Form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
            showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[0-9-+\s()]+$/;
        if (!phoneRegex.test(data.phone)) {
            showNotification('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง', 'error');
            return;
        }
        
        // Show loading notification
        showNotification('กำลังส่งข้อความ...', 'info');
        
        // Prepare email template parameters
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            from_phone: data.phone,
            subject: data.subject,
            message: data.message,
            to_name: 'โฮมสเตย์บีชเกาะช้าง'
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('ส่งข้อความสำเร็จ! เราจะติดต่อกลับภายใน 24 ชั่วโมง', 'success');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showNotification('เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง', 'error');
            });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 15px;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Booking buttons functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('จอง')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const roomType = this.closest('.room-card')?.querySelector('h3')?.textContent || 
                           this.closest('.package-card')?.querySelector('h3')?.textContent || 
                           'บริการ';
            
            showNotification(`กำลังนำคุณไปยังหน้าจอง ${roomType}...`, 'info');
            
            // Scroll to contact form
            setTimeout(() => {
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Auto-fill subject based on button clicked
                const subjectSelect = document.getElementById('subject');
                if (subjectSelect) {
                    if (roomType.includes('ห้อง')) {
                        subjectSelect.value = 'booking';
                    } else if (roomType.includes('แพ็คเกจ')) {
                        subjectSelect.value = 'package';
                    }
                }
            }, 1000);
        });
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.room-card, .package-card, .feature');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    if (img.classList.contains('lazy')) {
        imageObserver.observe(img);
    }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.classList.remove('loading');
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    .btn.loading {
        position: relative;
        color: transparent !important;
    }
    
    .btn.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle);

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-3px)';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('โฮมสเตย์บีชเกาะช้าง - เว็บไซต์พร้อมใช้งาน!');
    
    // Add some interactive elements
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}); 

// Video background handling
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video-bg');
    const fallback = document.querySelector('.video-fallback');
    
    if (video) {
        // Handle video loading errors
        video.addEventListener('error', function() {
            console.log('Video failed to load, showing fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
        });
        
        // Handle video load success
        video.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully');
            if (fallback) {
                fallback.style.display = 'none';
            }
        });
        
        // Force video to play (for mobile devices)
        video.addEventListener('canplay', function() {
            video.play().catch(function(error) {
                console.log('Video autoplay failed:', error);
                // Show fallback if autoplay fails
                if (fallback) {
                    fallback.style.display = 'block';
                }
            });
        });
        
        // Check if video is supported
        if (video.readyState === 0) {
            // Video not loaded yet, show fallback temporarily
            if (fallback) {
                fallback.style.display = 'block';
            }
        }
    }
}); 

// Gallery Filter Functionality
function initializeGallery() {
    console.log('Initializing gallery...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    console.log('Found filter buttons:', filterButtons.length);
    console.log('Found gallery items:', galleryItems.length);
    
    // Filter functionality
    filterButtons.forEach(button => {
        console.log('Adding click listener to button:', button.textContent);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Filter button clicked:', this.getAttribute('data-filter'));
            console.log('Button text:', this.textContent);
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            console.log('Filtering by:', filterValue);
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                console.log('Item category:', category, 'Filter:', filterValue);
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        // Add a simple test click to verify the button is clickable
        button.style.cursor = 'pointer';
        button.addEventListener('mouseenter', function() {
            console.log('Mouse entered button:', this.textContent);
        });
    });
    
    // Gallery item click to enlarge
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent || '';
            const description = item.querySelector('p')?.textContent || '';
            
            showImageModal(img.src, title, description);
        });
    });
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Simulate loading more images
            loadMoreBtn.textContent = 'กำลังโหลด...';
            loadMoreBtn.disabled = true;
            
            setTimeout(() => {
                // Add more gallery items here if needed
                showNotification('ไม่มีภาพเพิ่มเติมในขณะนี้', 'info');
                loadMoreBtn.textContent = 'โหลดภาพเพิ่มเติม';
                loadMoreBtn.disabled = false;
            }, 2000);
        });
    }
}

// Global filter function for onclick events
window.filterGallery = function(filterValue) {
    console.log('filterGallery called with:', filterValue);
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    console.log('Found filter buttons:', filterButtons.length);
    console.log('Found gallery items:', galleryItems.length);
    
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === filterValue) {
            btn.classList.add('active');
            console.log('Activated button:', btn.textContent);
        }
    });
    
    // Filter gallery items
    let visibleCount = 0;
    galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        console.log('Checking item with category:', category);
        
        if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease';
            visibleCount++;
            console.log('Showing item:', item.querySelector('img')?.alt || 'Unknown');
        } else {
            item.style.display = 'none';
            console.log('Hiding item:', item.querySelector('img')?.alt || 'Unknown');
        }
    });
    
    console.log('Total visible items:', visibleCount);
    
    // Show notification for debugging
    if (typeof showNotification === 'function') {
        showNotification(`แสดงภาพ ${visibleCount} รายการ`, 'info');
    } else {
        console.log(`แสดงภาพ ${visibleCount} รายการ`);
    }
};

// Test function for debugging
window.testGallery = function() {
    console.log('=== GALLERY TEST ===');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    console.log('Filter buttons found:', filterButtons.length);
    console.log('Gallery items found:', galleryItems.length);
    
    filterButtons.forEach((btn, index) => {
        console.log(`Button ${index + 1}:`, {
            text: btn.textContent,
            filter: btn.getAttribute('data-filter'),
            hasOnclick: btn.hasAttribute('onclick'),
            onclick: btn.getAttribute('onclick')
        });
    });
    
    galleryItems.forEach((item, index) => {
        console.log(`Item ${index + 1}:`, {
            category: item.getAttribute('data-category'),
            display: item.style.display,
            alt: item.querySelector('img')?.alt
        });
    });
    
    // Test notification
    if (typeof showNotification === 'function') {
        showNotification('ตรวจสอบ Console สำหรับข้อมูลการทดสอบ', 'info');
    } else {
        alert('ตรวจสอบ Console สำหรับข้อมูลการทดสอบ');
    }
};

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing gallery...');
    // Wait a bit to ensure all elements are loaded
    setTimeout(() => {
        initializeGallery();
    }, 100);
});

// Also try to initialize on window load as backup
window.addEventListener('load', function() {
    console.log('Window loaded, checking gallery...');
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) {
        console.log('No filter buttons found, retrying...');
        setTimeout(() => {
            initializeGallery();
        }, 500);
    }
});

// Image Modal Function
function showImageModal(imageSrc, title, description) {
    // Remove existing modal
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${imageSrc}" alt="${title}">
                <div class="modal-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            z-index: 1;
            transition: background 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(0, 0, 0, 0.9);
        }
        
        .modal-content img {
            width: 100%;
            height: auto;
            max-height: 70vh;
            object-fit: cover;
        }
        
        .modal-info {
            padding: 20px;
            text-align: center;
        }
        
        .modal-info h3 {
            margin-bottom: 10px;
            color: var(--dark-gray);
        }
        
        .modal-info p {
            color: var(--text-gray);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                max-width: 95%;
                max-height: 95%;
            }
            
            .modal-info {
                padding: 15px;
            }
        }
    `;
    
    document.head.appendChild(modalStyle);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}