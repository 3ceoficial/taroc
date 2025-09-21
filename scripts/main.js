// ===========================
// SITIO WEB DE TAROT - JAVASCRIPT
// Autor: MiniMax Agent
// ===========================

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupNavbar();
    setupFAQ();
    setupForms();
    setupSmoothScroll();
    setupAnimations();
    setupCarousel();
}

// ===========================
// CONFIGURACIÓN DE NAVEGACIÓN
// ===========================
function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Efecto de transparencia en scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 58, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 58, 0.95)';
        }
    });
    
    // Destacar enlace activo
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===========================
// FAQ FUNCIONALIDAD
// ===========================
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('show');
            
            // Cerrar todas las respuestas
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('show');
            });
            
            // Abrir la respuesta actual si no estaba abierta
            if (!isOpen) {
                answer.classList.add('show');
            }
        });
    });
}

// ===========================
// CONFIGURACIÓN DE FORMULARIOS
// ===========================
function setupForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Validar formulario
            if (!validateForm(form)) {
                return;
            }
            
            // Simular envío
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            form.classList.add('loading');
            
            setTimeout(() => {
                showSuccessMessage('¡Mensaje enviado con éxito! Te contactaremos pronto.');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.classList.remove('loading');
            }, 2000);
        });
    });
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'Este campo es obligatorio');
            isValid = false;
        } else {
            clearError(field);
        }
        
        // Validación específica para email
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showError(field, 'Por favor ingresa un email válido');
                isValid = false;
            }
        }
        
        // Validación específica para teléfono
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\d\s\-\+\(\)]{9,}$/;
            if (!phoneRegex.test(field.value)) {
                showError(field, 'Por favor ingresa un teléfono válido');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showError(field, message) {
    clearError(field);
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ===========================
// SCROLL SUAVE
// ===========================
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Compensar navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// ANIMACIONES DE SCROLL
// ===========================
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos animables
    const animatableElements = document.querySelectorAll(
        '.mystical-card, .service-card, .section-title, .about-content'
    );
    
    animatableElements.forEach(element => {
        observer.observe(element);
    });
}

// ===========================
// CONFIGURACIÓN DE CAROUSEL
// ===========================
function setupCarousel() {
    // Auto-play para testimonios carousel
    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    if (testimonialsCarousel) {
        const carousel = new bootstrap.Carousel(testimonialsCarousel, {
            interval: 5000,
            ride: 'carousel'
        });
        
        // Pausar en hover
        testimonialsCarousel.addEventListener('mouseenter', () => {
            carousel.pause();
        });
        
        testimonialsCarousel.addEventListener('mouseleave', () => {
            carousel.cycle();
        });
    }
}

// ===========================
// FUNCIONES DE RESERVA
// ===========================
function openReservationModal(serviceTitle, servicePrice) {
    const modal = document.getElementById('reservationModal');
    if (modal) {
        const serviceField = modal.querySelector('#selectedService');
        const priceField = modal.querySelector('#servicePrice');
        
        if (serviceField) serviceField.value = serviceTitle;
        if (priceField) priceField.value = servicePrice;
        
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }
}

// ===========================
// UTILIDADES
// ===========================
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

// ===========================
// EXPORTAR FUNCIONES GLOBALES
// ===========================
window.openReservationModal = openReservationModal;