// Animaciones para la página de cerveza
document.addEventListener("DOMContentLoaded", function () {
  // Animación de burbujas en el hero
  createBeerBubbles();

  // Animación al hacer scroll para los elementos
  initScrollAnimations();

  // Animación para las tarjetas de cerveza
  animateBeerCards();

  // Efecto para la línea de tiempo del proceso
  animateProcessTimeline();

  // Funcionalidad para mostrar/ocultar detalles de servicios
  setupServicesToggle();




  
  // Animación para el botón CTA
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-5px) scale(1.05)";
    });

    ctaButton.addEventListener("mouseout", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    ctaButton.addEventListener("click", function () {
      document.querySelector("#tipos").scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  // Validación del formulario
  setupFormValidation();
});

// Función para crear burbujas de cerveza en el hero
function createBeerBubbles() {
  const beerAnimation = document.getElementById("beer-animation");
  if (!beerAnimation) return;

  // Crear entre 30-50 burbujas
  const bubbleCount = Math.floor(Math.random() * 20) + 30;

  for (let i = 0; i < bubbleCount; i++) {
    createBubble(beerAnimation);
  }
}

// Crear una burbuja individual
function createBubble(container) {
  const bubble = document.createElement("div");

  // Estilos de la burbuja
  const size = Math.floor(Math.random() * 30) + 10; // Tamaño entre 10-40px
  const left = Math.floor(Math.random() * 100); // Posición horizontal aleatoria

  // Asignar estilos a la burbuja
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${left}%`;
  bubble.style.bottom = `-${size}px`;
  bubble.style.position = "absolute";
  bubble.style.borderRadius = "50%";
  bubble.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  bubble.style.boxShadow = "inset 0 0 10px rgba(255, 255, 255, 0.5)";

  // Calcular duración y retraso de la animación
  const duration = Math.random() * 5 + 3; // Entre 3-8 segundos
  const delay = Math.random() * 5; // Retraso de 0-5 segundos

  // Aplicar animación
  bubble.style.animation = `rise ${duration}s ease-in ${delay}s infinite`;

  // Crear keyframes para la animación rise si no existen
  if (!document.querySelector("#bubbleAnimation")) {
    const style = document.createElement("style");
    style.id = "bubbleAnimation";
    style.textContent = `
            @keyframes rise {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 0;
                }
                20% {
                    opacity: 0.8;
                }
                50% {
                    transform: translateY(-40vh) scale(1.2);
                }
                80% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-80vh) scale(0.8);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  // Añadir la burbuja al contenedor
  container.appendChild(bubble);
}

// Animaciones al hacer scroll
function initScrollAnimations() {
  // Detectar elementos cuando aparecen en el viewport
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transition = "opacity 1s ease, transform 1s ease";
    section.style.transform = "translateY(30px)";
    observer.observe(section);
  });

  // Estilo de la clase fade-in
  const style = document.createElement("style");
  style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);
}

// Animación para las tarjetas de cerveza
function animateBeerCards() {
  const cards = document.querySelectorAll(".beer-card");

  cards.forEach((card, index) => {
    // Añadir un retraso escalonado para cada tarjeta
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.5s ease ${
      index * 0.2
    }s, transform 0.5s ease ${index * 0.2}s`;

    // Añadir animación al color de la tarjeta cuando se hace hover
    card.addEventListener("mouseenter", function () {
      const beerImg = this.querySelector(".beer-img");
      if (beerImg) {
        beerImg.style.transition = "transform 0.5s ease";
        beerImg.style.transform = "scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const beerImg = this.querySelector(".beer-img");
      if (beerImg) {
        beerImg.style.transform = "scale(1)";
      }
    });
  });

  // Esperar a que se cargue la página para mostrar las tarjetas
  setTimeout(() => {
    cards.forEach((card) => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  }, 500);
}

// Animación para la línea de tiempo del proceso
function animateProcessTimeline() {
  const steps = document.querySelectorAll(".proceso-step");

  steps.forEach((step, index) => {
    step.style.opacity = "0";
    step.style.transform =
      index % 2 === 0 ? "translateY(30px)" : "translateY(-30px)";
    step.style.transition = `opacity 0.8s ease ${
      index * 0.3
    }s, transform 0.8s ease ${index * 0.3}s`;
  });

  // Observer para la sección de proceso
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            steps.forEach((step) => {
              step.style.opacity = "1";
              step.style.transform = "translateY(0)";
            });
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const procesoSection = document.querySelector(".proceso-section");
  if (procesoSection) {
    observer.observe(procesoSection);
  }
}

// Función para configurar la funcionalidad de toggle de servicios
function setupServicesToggle() {
  const servicios = document.querySelectorAll(".servicio");

  // Agregar estilos CSS para los detalles
  if (!document.querySelector("#serviciosStyles")) {
    const style = document.createElement("style");
    style.id = "serviciosStyles";
    style.textContent = `
      .detalles {
        display: none;
        margin-top: 10px;
        padding: 15px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        border-left: 4px solid #d4af37;
        font-size: 0.9rem;
        line-height: 1.4;
        transition: all 0.3s ease;
      }
      
      .detalles.visible {
        display: block;
        animation: slideDown 0.3s ease;
      }
      
      .servicio {
        cursor: pointer;
        transition: transform 0.2s ease;
      }
      
      .servicio:hover {
        transform: translateY(-2px);
      }
      
      .servicio.active {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      @keyframes slideDown {
        from {
          opacity: 0;
          max-height: 0;
        }
        to {
          opacity: 1;
          max-height: 200px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Agregar event listener a cada servicio
  servicios.forEach((servicio) => {
    servicio.addEventListener("click", function(e) {
      // Prevenir que el click se propague si hay enlaces dentro
      if (e.target.tagName === 'A') return;
      
      const detalles = this.querySelector(".detalles");
      
      if (detalles) {
        const estaVisible = detalles.classList.contains("visible");
        
        // Cerrar todos los otros detalles primero
        servicios.forEach((otroServicio) => {
          const otrosDetalles = otroServicio.querySelector(".detalles");
          if (otrosDetalles && otroServicio !== this) {
            otrosDetalles.classList.remove("visible");
            otroServicio.classList.remove("active");
          }
        });
        
        // Toggle del servicio clickeado
        if (estaVisible) {
          detalles.classList.remove("visible");
          this.classList.remove("active");
        } else {
          detalles.classList.add("visible");
          this.classList.add("active");
        }
      }
    });
  });
}

// Validación del formulario de contacto
function setupFormValidation() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    let isValid = true;

    // Función para mostrar error
    function showError(element, message) {
      const formGroup = element.parentElement;

      // Comprobar si ya existe un mensaje de error
      let errorElement = formGroup.querySelector(".error-message");

      if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.style.color = "#ff3333";
        errorElement.style.fontSize = "0.8rem";
        errorElement.style.marginTop = "5px";
        formGroup.appendChild(errorElement);
      }

      errorElement.textContent = message;
      element.style.borderColor = "#ff3333";
      isValid = false;
    }

    // Función para eliminar error
    function removeError(element) {
      const formGroup = element.parentElement;
      const errorElement = formGroup.querySelector(".error-message");

      if (errorElement) {
        formGroup.removeChild(errorElement);
      }

      element.style.borderColor = "";
    }

    // Validar nombre
    if (nombre.value.trim() === "") {
      showError(nombre, "Por favor, ingrese su nombre");
    } else {
      removeError(nombre);
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
      showError(email, "Por favor, ingrese su email");
    } else if (!emailRegex.test(email.value)) {
      showError(email, "Por favor, ingrese un email válido");
    } else {
      removeError(email);
    }

    // Validar mensaje
    if (mensaje.value.trim() === "") {
      showError(mensaje, "Por favor, ingrese su mensaje");
    } else {
      removeError(mensaje);
    }

    // Si el formulario es válido, mostrar mensaje de éxito
    if (isValid) {
      // Crear y mostrar mensaje de éxito
      const successMessage = document.createElement("div");
      successMessage.textContent =
        "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
      successMessage.style.backgroundColor = "#4CAF50";
      successMessage.style.color = "white";
      successMessage.style.padding = "10px";
      successMessage.style.borderRadius = "4px";
      successMessage.style.marginTop = "20px";
      successMessage.style.textAlign = "center";

      form.appendChild(successMessage);

      // Resetear formulario
      form.reset();

      // Eliminar mensaje después de 5 segundos
      setTimeout(() => {
        if (form.contains(successMessage)) {
          form.removeChild(successMessage);
        }
      }, 5000);
    }
  });

  // Validar en tiempo real para mejorar la experiencia del usuario
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value.trim() === "") {
        this.style.borderColor = "#ff3333";
      } else {
        this.style.borderColor = "#4CAF50";
      }
    });

    input.addEventListener("focus", function () {
      this.style.borderColor = "";
    });
  });
}


// Navegación suave para los botones del menú
document.addEventListener("DOMContentLoaded", function () {
  // Configurar navegación suave
  setupSmoothNavigation();
  
  // Configurar efectos visuales para los botones
  setupNavigationEffects();
  
  // Configurar indicador de sección activa
  setupActiveSection();
});


// Función principal para configurar la navegación suave
function setupSmoothNavigation() {
  // Seleccionar todos los enlaces del menú de navegación
  const navLinks = document.querySelectorAll('.menu a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevenir comportamiento por defecto
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Configuración de scroll suave personalizada
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        // Scroll suave personalizado con mejor control
        smoothScrollTo(targetPosition, 1000); // 1000ms = 1 segundo
        
        // Actualizar URL sin hacer scroll brusco
        history.pushState(null, null, targetId);
        
        // Agregar clase activa al enlace clickeado
        updateActiveNavLink(this);
      }
    });
  });
}

// Función de scroll suave personalizada con easing
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  // Función de easing para una transición más natural
  function easeInOutCubic(t) {
    return t < 0.5 
      ? 4 * t * t * t 
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const easedProgress = easeInOutCubic(progress);
    const currentPosition = startPosition + (distance * easedProgress);
    
    window.scrollTo(0, currentPosition);
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }
  
  requestAnimationFrame(animation);
}

// Función para agregar efectos visuales a los botones de navegación
function setupNavigationEffects() {
  const navLinks = document.querySelectorAll('.menu a');
  
  // Agregar estilos CSS para los efectos
  if (!document.querySelector('#navigationStyles')) {
    const style = document.createElement('style');
    style.id = 'navigationStyles';
    style.textContent = `
      .menu a {
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
      }
      

      }
      
      .menu a:hover::before {
        left: 100%;
      }
      
      .menu a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #d4af37, #f4d03f);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateX(-50%);
      }
      
      .menu a:hover::after,
      .menu a.active::after {
        width: 100%;s
      }
      
      .menu a:hover {
        transform: translateY(-2px);
        text-shadow: 0 2px 8px rgba(0,0,0,0.3);
      }
      
      .menu a:active {
        transform: translateY(0) scale(0.98);
        transition: transform 0.1s ease;
      }
      
      .menu a.active {
        color: #d4af37;
        font-weight: bold;
      }
      
      /* Efecto de ondas al hacer clic */
      .menu a {
        position: relative;
      }
      
      .menu a .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      /* Animación de pulso para el botón activo */
      .menu a.active {
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
        100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Agregar efecto de ondas (ripple) al hacer clic
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Crear elemento de onda
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      // Calcular posición y tamaño
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      // Remover el elemento después de la animación
      setTimeout(() => {
        if (this.contains(ripple)) {
          this.removeChild(ripple);
        }
      }, 600);
    });
    
    // Efectos adicionales en hover
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(0) scale(1)';
      }
    });
  });
}

// Función para actualizar el enlace activo
function updateActiveNavLink(activeLink) {
  // Remover clase activa de todos los enlaces
  document.querySelectorAll('.menu a').forEach(link => {
    link.classList.remove('active');
    link.style.transform = 'translateY(0) scale(1)';
  });
  
  // Agregar clase activa al enlace actual
  activeLink.classList.add('active');
  activeLink.style.transform = 'translateY(-2px) scale(1.05)';
}

// Función para detectar la sección visible y actualizar el menú automáticamente
function setupActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.menu a[href^="#"]');
  
  // Configurar Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Detectar cuando la sección está en el 20%-70% del viewport
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = '#' + entry.target.id;
        const correspondingLink = document.querySelector(`.menu a[href="${sectionId}"]`);
        
        if (correspondingLink) {
          updateActiveNavLink(correspondingLink);
        }
      }
    });
  }, observerOptions);
  
  // Observar todas las secciones
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Función adicional para navegación con teclado (accesibilidad)
document.addEventListener('keydown', function(e) {
  // Navegación con teclas numéricas (1-5)
  const keyMap = {
    '1': '#inicio',
    '2': '#tipos',
    '3': '#proceso',
    '4': '#servicios',
    '5': '#contacto'
  };
  
  if (e.altKey && keyMap[e.key]) {
    e.preventDefault();
    const targetSection = document.querySelector(keyMap[e.key]);
    const correspondingLink = document.querySelector(`.menu a[href="${keyMap[e.key]}"]`);
    
    if (targetSection && correspondingLink) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = targetSection.offsetTop - headerHeight - 20;
      
      smoothScrollTo(targetPosition, 800);
      updateActiveNavLink(correspondingLink);
      history.pushState(null, null, keyMap[e.key]);
    }
  }
});

// Función para manejar navegación hacia atrás/adelante del navegador
window.addEventListener('popstate', function(e) {
  const hash = window.location.hash;
  if (hash) {
    const targetSection = document.querySelector(hash);
    const correspondingLink = document.querySelector(`.menu a[href="${hash}"]`);
    
    if (targetSection && correspondingLink) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = targetSection.offsetTop - headerHeight - 20;
      
      smoothScrollTo(targetPosition, 800);
      updateActiveNavLink(correspondingLink);
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let index = 0;

  function showSlide(i) {
    const slideWidth = slides[0].offsetWidth + 20; // 20px de gap
    carousel.style.transform = `translateX(${-slideWidth * i}px)`;
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  setInterval(nextSlide, 4000); // Cambio automático
});

const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const menu = document.getElementById('avianca-menu');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', () => {
  menu.classList.add('open');
  overlay.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  menu.classList.remove('open');
  overlay.classList.remove('show');
});

overlay.addEventListener('click', () => {
  menu.classList.remove('open');
  overlay.classList.remove('show');
});


