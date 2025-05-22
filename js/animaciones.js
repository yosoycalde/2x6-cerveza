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