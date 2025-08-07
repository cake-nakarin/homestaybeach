// Detail Page JavaScript Functions

// Image Gallery Function
function changeImage(thumbnail, newSrc) {
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    
    // Change main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = newSrc;
        
        // Add fade effect
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.style.opacity = '1';
        }, 150);
    }
}

// Booking Form Calculations
document.addEventListener('DOMContentLoaded', function() {
    const nightsInput = document.getElementById('nights');
    const totalAmount = document.querySelector('.total-amount');
    const basePrice = 1200; // Default price for room
    
    if (nightsInput && totalAmount) {
        function updateTotal() {
            const nights = parseInt(nightsInput.value) || 1;
            const total = basePrice * nights;
            totalAmount.textContent = `฿${total.toLocaleString()}`;
        }
        
        nightsInput.addEventListener('input', updateTotal);
        updateTotal(); // Initial calculation
    }
    
    // Package booking form
    const packageForm = document.querySelector('.booking-form');
    if (packageForm) {
        packageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const checkin = document.getElementById('checkin').value;
            const guests = document.getElementById('guests').value;
            const specialRequests = document.getElementById('special-requests')?.value || '';
            
            if (!checkin || !guests) {
                showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
                return;
            }
            
            // Show loading notification
            showNotification('กำลังประมวลผลการจอง...', 'info');
            
            // Prepare booking email parameters
            const bookingParams = {
                package_name: 'แพ็คเกจโรแมนติก',
                checkin_date: checkin,
                guests: guests,
                special_requests: specialRequests,
                total_price: '฿5,500',
                to_name: 'โฮมสเตย์บีชเกาะช้าง'
            };
            
            // Send booking email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_BOOKING_TEMPLATE_ID', bookingParams)
                .then(function(response) {
                    console.log('BOOKING SUCCESS!', response.status, response.text);
                    showNotification('จองแพ็คเกจสำเร็จ! เราจะติดต่อกลับภายใน 24 ชั่วโมง', 'success');
                    packageForm.reset();
                }, function(error) {
                    console.log('BOOKING FAILED...', error);
                    showNotification('เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง', 'error');
                });
        });
    }
    
    // Room booking form
    const roomForm = document.querySelector('.booking-form');
    if (roomForm && !roomForm.querySelector('#special-requests')) {
        roomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            const nights = document.getElementById('nights').value;
            
            if (!checkin || !checkout || !guests || !nights) {
                showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
                return;
            }
            
            // Validate dates
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (checkinDate < today) {
                showNotification('วันที่เช็คอินต้องไม่ใช่วันในอดีต', 'error');
                return;
            }
            
            if (checkoutDate <= checkinDate) {
                showNotification('วันที่เช็คเอาท์ต้องมากกว่าวันที่เช็คอิน', 'error');
                return;
            }
            
            // Show loading notification
            showNotification('กำลังประมวลผลการจอง...', 'info');
            
            // Prepare room booking email parameters
            const roomBookingParams = {
                room_type: 'ห้องสแตนดาร์ด',
                checkin_date: checkin,
                checkout_date: checkout,
                guests: guests,
                nights: nights,
                total_price: totalAmount.textContent,
                to_name: 'โฮมสเตย์บีชเกาะช้าง'
            };
            
            // Send room booking email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_ROOM_BOOKING_TEMPLATE_ID', roomBookingParams)
                .then(function(response) {
                    console.log('ROOM BOOKING SUCCESS!', response.status, response.text);
                    showNotification('จองห้องพักสำเร็จ! เราจะติดต่อกลับภายใน 24 ชั่วโมง', 'success');
                    roomForm.reset();
                    updateTotal();
                }, function(error) {
                    console.log('ROOM BOOKING FAILED...', error);
                    showNotification('เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง', 'error');
                });
        });
    }
});

// Date validation for checkout
document.addEventListener('DOMContentLoaded', function() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            const nextDay = new Date(checkinDate);
            nextDay.setDate(nextDay.getDate() + 1);
            
            // Set minimum checkout date
            checkoutInput.min = nextDay.toISOString().split('T')[0];
            
            // Update checkout if it's before checkin
            if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
                checkoutInput.value = nextDay.toISOString().split('T')[0];
            }
        });
    }
});

// Gallery Lightbox Effect
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
});

function openLightbox(src, alt) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}">
        </div>
    `;
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(lightbox);
    
    // Close functionality
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => {
        lightbox.remove();
    });
    
    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            lightbox.remove();
        }
    });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
});

// Form validation enhancement
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validation rules
    if (field.required && !value) {
        field.classList.add('error');
        return false;
    }
    
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[0-9-+\s()]+$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    return true;
}

// Add CSS for form validation
const validationStyle = document.createElement('style');
validationStyle.textContent = `
    .form-group.focused {
        transform: translateY(-2px);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
    
    .form-group.focused input,
    .form-group.focused select,
    .form-group.focused textarea {
        border-color: var(--ocean-blue);
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }
`;
document.head.appendChild(validationStyle);

// Price calculation for different room types
const roomPrices = {
    'standard': 1200,
    'deluxe': 1800,
    'family': 2500
};

const packagePrices = {
    'relax': 3500,
    'romantic': 5500,
    'family': 7500
};

// Update price based on room/package type
function updatePrice(type, category = 'room') {
    const priceElement = document.querySelector('.price');
    const totalElement = document.querySelector('.total-amount');
    
    if (category === 'room' && roomPrices[type]) {
        const price = roomPrices[type];
        if (priceElement) priceElement.textContent = `฿${price.toLocaleString()}`;
        if (totalElement) totalElement.textContent = `฿${price.toLocaleString()}`;
    } else if (category === 'package' && packagePrices[type]) {
        const price = packagePrices[type];
        if (priceElement) priceElement.textContent = `฿${price.toLocaleString()}`;
        if (totalElement) totalElement.textContent = `฿${price.toLocaleString()}`;
    }
}

// Add loading animation to booking buttons
document.addEventListener('DOMContentLoaded', function() {
    const bookingButtons = document.querySelectorAll('.btn-primary');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.style.pointerEvents = 'auto';
                }, 3000);
            }
        });
    });
});

// Add CSS for loading animation
const loadingButtonStyle = document.createElement('style');
loadingButtonStyle.textContent = `
    .btn-primary.loading {
        position: relative;
        color: transparent !important;
    }
    
    .btn-primary.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingButtonStyle);

// Initialize detail page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Detail page loaded successfully!');
    
    // Add some interactive effects
    const featureItems = document.querySelectorAll('.feature-item, .include-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add parallax effect to main image
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            mainImage.style.transform = `translateY(${rate}px)`;
        });
    }
}); 