// Walmart México - La Mina de Oro Oculta - Presentación Dinámica
// JavaScript para navegación e interactividad avanzada

class PresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 5;
        this.isAnimating = false;
        this.autoplayEnabled = false;
        this.autoplayInterval = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initParticles();
        this.updateSlideCounter();
        this.animateCurrentSlide();
        
        // Configurar barras de progreso después de un delay
        setTimeout(() => {
            this.setupProgressBars();
            this.setupCircularProgress();
        }, 1000);
    }

    setupEventListeners() {
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;
            
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
                case 'Escape':
                    this.toggleFullscreen();
                    break;
                case 'F5':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
            }
        });

        // Touch/swipe para dispositivos móviles
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, endX, startY, endY);
        });

        // Wheel navigation
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            if (this.isAnimating) return;
            
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }, 100);
        });

        // Prevenir zoom en dispositivos móviles
        document.addEventListener('touchmove', (e) => {
            if (e.scale !== 1) {
                e.preventDefault();
            }
        }, { passive: false });

        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleSwipe(startX, endX, startY, endY) {
        const threshold = 50;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Solo procesar swipe horizontal si es más significativo que el vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold && !this.isAnimating) {
            if (diffX > 0) {
                this.nextSlide(); // Swipe left -> next slide
            } else {
                this.prevSlide(); // Swipe right -> previous slide
            }
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideNumber) {
        if (slideNumber === this.currentSlide || this.isAnimating) return;
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;

        this.isAnimating = true;
        
        // Remove active class from current slide
        const currentSlideElement = document.getElementById(`slide-${this.currentSlide}`);
        const targetSlideElement = document.getElementById(`slide-${slideNumber}`);
        
        // Determine animation direction
        const isForward = slideNumber > this.currentSlide;
        
        // Animate out current slide
        currentSlideElement.classList.remove('active');
        if (isForward) {
            currentSlideElement.classList.add('prev');
        }
        
        // Update current slide
        const prevSlide = this.currentSlide;
        this.currentSlide = slideNumber;
        
        // Animate in new slide
        setTimeout(() => {
            targetSlideElement.classList.remove('prev');
            targetSlideElement.classList.add('active');
            
            // Update indicators
            this.updateIndicators();
            this.updateSlideCounter();
            
            // Add slide-specific animations and setup
            this.animateCurrentSlide();
            this.setupSlideSpecificFeatures();
            
            setTimeout(() => {
                this.isAnimating = false;
                currentSlideElement.classList.remove('prev');
            }, 800);
        }, 100);
    }

    updateIndicators() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index + 1 === this.currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    updateSlideCounter() {
        const currentElement = document.getElementById('current-slide');
        const totalElement = document.getElementById('total-slides');
        
        if (currentElement) currentElement.textContent = this.currentSlide;
        if (totalElement) totalElement.textContent = this.totalSlides;
    }

    animateCurrentSlide() {
        const slide = document.getElementById(`slide-${this.currentSlide}`);
        if (!slide) return;

        // Remove existing animation classes
        const animatedElements = slide.querySelectorAll('[class*="animate-"]');
        animatedElements.forEach(el => {
            el.classList.forEach(className => {
                if (className.startsWith('animate-')) {
                    el.classList.remove(className);
                }
            });
        });

        // Add animations based on slide
        setTimeout(() => {
            switch(this.currentSlide) {
                case 1:
                    this.animateHeroSlide(slide);
                    break;
                case 2:
                    this.animateOpportunitySlide(slide);
                    break;
                case 3:
                    this.animateCompetitiveSlide(slide);
                    break;
                case 4:
                    this.animateManagerSlide(slide);
                    break;
                case 5:
                    this.animateFinalSlide(slide);
                    break;
            }
        }, 300);
    }

    animateHeroSlide(slide) {
        // Animate rainbow elements
        const rainbow = slide.querySelector('.rainbow-arc');
        const rainbowGlow = slide.querySelector('.rainbow-glow');
        
        if (rainbow) {
            rainbow.style.animation = 'rainbow-pulse 4s ease-in-out infinite';
        }
        if (rainbowGlow) {
            rainbowGlow.style.animation = 'rainbow-glow 6s ease-in-out infinite';
        }

        // Animate treasure chest
        const chest = slide.querySelector('.treasure-chest');
        if (chest) {
            chest.style.animation = 'chest-bounce 4s ease-in-out infinite';
        }

        // Animate floating elements
        const floatingElements = slide.querySelectorAll('.star, .diamond');
        floatingElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'float-random 6s ease-in-out infinite';
            }, index * 200);
        });

        // Animate logos
        const walmartLogo = slide.querySelector('.walmart-logo');
        const geLogo = slide.querySelector('.ge-logo');
        
        if (walmartLogo) {
            walmartLogo.style.animation = 'float-smooth 3s ease-in-out infinite';
        }
        if (geLogo) {
            geLogo.style.animation = 'logo-float 3s ease-in-out infinite';
        }
    }

    animateOpportunitySlide(slide) {
        // Animate orbs
        const orbs = slide.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            orb.style.animation = `orb-float 8s ease-in-out infinite`;
            orb.style.animationDelay = `${index * 2}s`;
        });

        // Animate cards with staggered effect
        const cards = slide.querySelectorAll('.mega-stat-card, .benefit-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 150);
        });

        // Animate card glows
        const cardGlows = slide.querySelectorAll('.card-glow');
        cardGlows.forEach((glow, index) => {
            setTimeout(() => {
                glow.style.animation = 'card-glow 3s ease-in-out infinite';
            }, index * 300);
        });

        // Animate counters from zero
        setTimeout(() => {
            this.animateCounters(slide);
        }, 800);
    }

    animateCompetitiveSlide(slide) {
        // Animate wave
        const wave = slide.querySelector('.wave-animation');
        if (wave) {
            wave.style.animation = 'wave-move 10s linear infinite';
        }

        // Animate yellow lines sequentially
        const yellowLines = slide.querySelectorAll('.yellow-line');
        yellowLines.forEach((line, index) => {
            // Reset animation
            line.style.animation = 'none';
            line.offsetHeight; // Trigger reflow
            line.style.animation = `yellow-line-fill 2s ease-out forwards`;
            line.style.animationDelay = `${index * 0.3}s`;
        });

        // Animate floating shapes
        const shapes = slide.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            setTimeout(() => {
                shape.style.animation = 'shape-float 15s linear infinite';
            }, index * 5000);
        });

        // Animate feature items with borders
        const featureItems = slide.querySelectorAll('.animated-border');
        featureItems.forEach((item, index) => {
            const delay = parseInt(item.getAttribute('data-delay')) || index * 500;
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
                
                // Animate border
                const borderAnim = item.querySelector('.border-animation');
                if (borderAnim) {
                    borderAnim.style.animation = 'border-grow 2s ease-out forwards';
                }
            }, delay + 2000); // Delay after yellow lines finish
        });

        // Animate circular progress
        setTimeout(() => {
            this.animateCircularProgress();
        }, 3500); // Later delay to show after lines and borders
    }

    animateManagerSlide(slide) {
        // Animate grid pattern
        const grid = slide.querySelector('.grid-pattern');
        if (grid) {
            grid.style.animation = 'grid-move 20s linear infinite';
        }

        // Animate light rays
        const rays = slide.querySelector('.light-rays');
        if (rays) {
            rays.style.animation = 'rays-pulse 8s ease-in-out infinite';
        }

        // Animate new compact design
        setTimeout(() => {
            this.animateNewManagerLayout(slide);
        }, 500);
    }

    // Nuevo método para animar el diseño compacto del slide 4
    animateNewManagerLayout(slide) {
        // Animar métricas grandes
        const metrics = slide.querySelectorAll('.animated-metric');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                const target = parseInt(metric.getAttribute('data-target'));
                this.animateMetricCounter(metric, 0, target, 2000);
            }, index * 300);
        });

        // Animar barras de progreso (solo una vez)
        const progressFills = slide.querySelectorAll('.progress-fill');
        progressFills.forEach((fill, index) => {
            setTimeout(() => {
                const width = fill.getAttribute('data-width');
                fill.style.setProperty('--target-width', `${width}%`);
                fill.style.animation = 'progress-grow-once 2s ease-out forwards';
                fill.classList.add('animated');
            }, index * 300 + 1000);
        });

        // Animar bloques de beneficios con stagger
        const benefitBlocks = slide.querySelectorAll('.benefit-block');
        benefitBlocks.forEach((block, blockIndex) => {
            const items = block.querySelectorAll('.benefit-item');
            items.forEach((item, itemIndex) => {
                setTimeout(() => {
                    item.classList.add('animated');
                }, (blockIndex * 3 + itemIndex) * 100 + 2000);
            });
        });
    }

    // Método para animar métricas del manager slide
    animateManagerMetrics(slide) {
        const metrics = slide.querySelectorAll('.animated-metric');
        const bars = slide.querySelectorAll('.animated-bar');

        metrics.forEach((metric, index) => {
            setTimeout(() => {
                const target = parseInt(metric.getAttribute('data-target'));
                this.animateMetricCounter(metric, 0, target, 2000);
            }, index * 300);
        });

        bars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
                bar.classList.add('animated');
            }, index * 300);
        });
    }

    // Método para animar contador de métricas
    animateMetricCounter(element, start, end, duration) {
        const range = end - start;
        const minTimer = 50;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += 1;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = `+${current}%`;
        }, Math.max(stepTime, minTimer));
    }

    animateFinalSlide(slide) {
        // Remover efecto confetti (nieve) - NO animar
        const confetti = slide.querySelector('.confetti');
        if (confetti) {
            confetti.style.display = 'none'; // Ocultar completamente el efecto de nieve
        }

        // Animate success rays
        const rays = slide.querySelector('.success-rays');
        if (rays) {
            rays.style.animation = 'rays-rotate 20s linear infinite';
        }

        // Animate character
        const character = slide.querySelector('.walmart-character');
        if (character) {
            character.style.animation = 'character-bounce 3s ease-in-out infinite';
        }

        // Animate summary items - always visible with smooth entry
        const summaryItems = slide.querySelectorAll('.summary-item');
        summaryItems.forEach((item, index) => {
            // Ensure they are always visible
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            
            // Add entrance animation without hiding
            setTimeout(() => {
                item.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });

        // Animate contact cards - always visible with enhanced hover effects
        const contactCards = slide.querySelectorAll('.contact-card');
        contactCards.forEach((card, index) => {
            // Ensure they are always visible
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            // Ensure hover effects are always active
            card.classList.add('hover-ready');
            
            // Add entrance animation without hiding
            setTimeout(() => {
                card.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    setupSlideSpecificFeatures() {
        if (this.currentSlide === 4) {
            setTimeout(() => {
                this.setupProgressBars();
            }, 500);
        }
        
        if (this.currentSlide === 3) {
            setTimeout(() => {
                this.setupCircularProgress();
            }, 1000);
        }
    }

    setupProgressBars() {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const width = bar.getAttribute('data-width') || '100';
            bar.style.setProperty('--width', `${width}%`);
            bar.style.width = `${width}%`;
        });
    }

    animateProgressBars() {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width') || '100';
                bar.style.width = `${width}%`;
            }, index * 300);
        });
    }

    setupCircularProgress() {
        const circles = document.querySelectorAll('.circle-progress');
        circles.forEach(circle => {
            const percent = circle.getAttribute('data-percent') || '0';
            const degrees = (percent / 100) * 360;
            circle.style.background = `conic-gradient(var(--walmart-yellow) ${degrees}deg, var(--walmart-light-blue) ${degrees}deg)`;
        });
    }

    animateCircularProgress() {
        const circles = document.querySelectorAll('.animated-circle');
        const percentTexts = document.querySelectorAll('.animated-percent');

        circles.forEach((circle, index) => {
            setTimeout(() => {
                const percent = parseInt(circle.getAttribute('data-percent')) || 0;
                const degrees = (percent / 100) * 360;
                
                // Animar la línea amarilla progresivamente
                circle.style.setProperty('--target-degrees', `${degrees}deg`);
                circle.classList.add('filling');
                
                // Animar el contador del texto
                const percentText = percentTexts[index];
                if (percentText) {
                    const target = parseInt(percentText.getAttribute('data-target')) || 0;
                    this.animateCircularCounter(percentText, 0, target, 2000);
                }
            }, index * 500);
        });
    }

    // Nuevo método para animar contadores circulares
    animateCircularCounter(element, start, end, duration) {
        const range = end - start;
        const minTimer = 50;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += 1;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = `${current}%`;
        }, Math.max(stepTime, minTimer));
    }

    initParticles() {
        // Configuración de particles.js
        if (window.particlesJS) {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 50,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": ["#0073CF", "#FFD100", "#FFFFFF"]
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "bubble"
                        },
                        "onclick": {
                            "enable": false
                        },
                        "resize": true
                    },
                    "modes": {
                        "bubble": {
                            "distance": 100,
                            "size": 6,
                            "duration": 2,
                            "opacity": 0.8,
                            "speed": 3
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    handleResize() {
        // Reinitialize particles on resize
        if (window.pJSDom && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    // Utilidades para animaciones personalizadas
    animateElement(element, animationClass, duration = 1000) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    }

    // Método para mostrar información de debugging
    getDebugInfo() {
        return {
            currentSlide: this.currentSlide,
            totalSlides: this.totalSlides,
            isAnimating: this.isAnimating,
            autoplayEnabled: this.autoplayEnabled,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }

    // Método para reiniciar la presentación
    restart() {
        this.goToSlide(1);
    }

    // Método para saltar a una slide específica con validación
    jumpToSlide(slideNumber, force = false) {
        if (force || !this.isAnimating) {
            this.goToSlide(slideNumber);
        }
    }

    // Método para animar contadores desde cero
    animateCounters(slide) {
        const counters = slide.querySelectorAll('.animated-counter');
        const percentCounters = slide.querySelectorAll('.animated-counter-percent');

        counters.forEach((counter, index) => {
            setTimeout(() => {
                const target = parseInt(counter.getAttribute('data-target'));
                this.animateCounter(counter, 0, target, 2000, '$', 'M');
            }, index * 500);
        });

        percentCounters.forEach((counter, index) => {
            setTimeout(() => {
                const target = parseInt(counter.getAttribute('data-target'));
                this.animatePercentCounter(counter, 0, target, 2000);
            }, index * 500);
        });
    }

    // Método para animar contador con formato monetario
    animateCounter(element, start, end, duration, prefix = '', suffix = '') {
        const range = end - start;
        const minTimer = 50;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += Math.ceil(range / (duration / 50));
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = `${prefix}${this.formatNumber(current)}${suffix}`;
        }, Math.max(stepTime, minTimer));
    }

    // Método para animar contador de porcentaje
    animatePercentCounter(element, start, end, duration) {
        const range = end - start;
        const minTimer = 50;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += 1;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = `${current}-${current + 5}%`;
        }, Math.max(stepTime, minTimer));
    }

    // Método para formatear números con separadores de miles
    formatNumber(num) {
        return new Intl.NumberFormat('es-MX').format(Math.round(num));
    }
}

// Funciones globales para los botones de navegación
function nextSlide() {
    if (window.presentation) {
        window.presentation.nextSlide();
    }
}

function prevSlide() {
    if (window.presentation) {
        window.presentation.prevSlide();
    }
}

function goToSlide(slideNumber) {
    if (window.presentation) {
        window.presentation.goToSlide(slideNumber);
    }
}

function toggleFullscreen() {
    if (window.presentation) {
        window.presentation.toggleFullscreen();
    }
}

// Utilidades adicionales
const PresentationUtils = {
    // Formatear números grandes con separadores de miles
    formatNumber: (num) => {
        if (num >= 1000000) {
            return new Intl.NumberFormat('es-MX').format((num / 1000000).toFixed(1)) + 'M';
        }
        if (num >= 1000) {
            return new Intl.NumberFormat('es-MX').format((num / 1000).toFixed(1)) + 'K';
        }
        return new Intl.NumberFormat('es-MX').format(num);
    },

    // Animar contador de números
    animateCounter: (element, start, end, duration = 2000) => {
        const range = end - start;
        const minTimer = 50;
        const stepTime = Math.abs(Math.floor(duration / range));
        
        const timer = setInterval(() => {
            start += 1;
            element.textContent = PresentationUtils.formatNumber(start);
            if (start >= end) {
                clearInterval(timer);
            }
        }, Math.max(stepTime, minTimer));
    },

    // Detectar dispositivo móvil
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Detectar soporte táctil
    isTouchDevice: () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // Obtener información del dispositivo
    getDeviceInfo: () => {
        return {
            isMobile: PresentationUtils.isMobile(),
            isTouch: PresentationUtils.isTouchDevice(),
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio || 1
        };
    },

    // Copiar texto al portapapeles
    copyToClipboard: (text) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('Texto copiado al portapapeles');
            });
        } else {
            // Fallback para navegadores más antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                console.log('Texto copiado al portapapeles (fallback)');
            } catch (err) {
                console.error('Error al copiar texto');
            }
            document.body.removeChild(textArea);
        }
    },

    // Throttle function para optimizar eventos
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Debounce function para optimizar eventos
    debounce: (func, wait, immediate) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
};

// Inicializar la presentación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia global de la presentación
    window.presentation = new PresentationController();
    
    // Agregar clase para dispositivos móviles
    if (PresentationUtils.isMobile()) {
        document.body.classList.add('mobile-device');
    }
    
    if (PresentationUtils.isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
    
    // Mostrar información de debugging en desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🎯 Presentación "La Mina de Oro Oculta" cargada exitosamente');
        console.log('📱 Información del dispositivo:', PresentationUtils.getDeviceInfo());
        console.log('⌨️  Controles disponibles:');
        console.log('   • Flechas izquierda/derecha: Navegar slides');
        console.log('   • Espacio: Siguiente slide');
        console.log('   • Home/End: Primera/Última slide');
        console.log('   • Escape: Pantalla completa');
        console.log('   • F5: Reiniciar presentación');
        console.log('   • Swipe/Wheel: Navegación táctil y de rueda');
        console.log('🎨 Slides disponibles: 5');
        console.log('🚀 ¡Disfruta de la presentación!');
    }
});

// Manejar errores de carga de recursos
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('⚠️  Error cargando imagen:', e.target.src);
        // Aquí se puede agregar una imagen de placeholder si es necesario
    }
});

// Cuadrícula de referencia removida - función eliminada

// Manejar cambios de orientación en dispositivos móviles
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Ajustar layout después del cambio de orientación
        window.scrollTo(0, 0);
        if (window.presentation) {
            window.presentation.handleResize();
        }
    }, 100);
});

// Manejar visibilidad de la página (Page Visibility API)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pausar animaciones cuando la página no esté visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Reanudar animaciones cuando la página vuelva a ser visible
        document.body.style.animationPlayState = 'running';
    }
});

// Prevenir comportamientos no deseados en producción
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Desactivar menú contextual
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Desactivar selección de texto
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
    });
    
    // Desactivar drag and drop
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
}