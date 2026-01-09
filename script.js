document.addEventListener('DOMContentLoaded', () => {

    // 1. Manejo del Formulario con Validación de Seguridad
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Capturamos los valores de los inputs
            const nombre = contactForm.querySelector('input[type="text"]').value.trim();
            const whatsapp = contactForm.querySelector('input[type="tel"]').value.trim();

            // VALIDACIÓN: Si alguno está vacío, cortamos la ejecución
            if (nombre === "" || whatsapp === "") {
                alert("⚠️ Por favor, rellena tu nombre y WhatsApp para que podamos enviarte la información.");
                return; // Esto evita que el formulario se "envíe"
            }

            // Si pasa la validación, procedemos con el envío
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "ENVIANDO SOLICITUD...";
            btn.disabled = true;

            setTimeout(() => {
                alert(`¡Gracias ${nombre}! Tu solicitud fue enviada con éxito. Un asesor de Cyber Nest te contactará pronto.`);
                btn.innerText = originalText;
                btn.disabled = false;
                contactForm.reset(); // Limpia el formulario para el próximo cliente
            }, 1500);
        });
    }

    // 2. Animación Infinita (Sube y Baja)
    const observerOptions = { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" 
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            } else {
                entry.target.style.opacity = "0";
                entry.target.style.transform = "translateY(30px)";
            }
        });
    }, observerOptions);

    // Seleccionamos todos los bloques visuales (Nav, Secciones, Footer y Tarjetas)
    const elementsToAnimate = document.querySelectorAll('nav, section, footer, .bg-\\[\\#1e293b\\]');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(el);
    });
});