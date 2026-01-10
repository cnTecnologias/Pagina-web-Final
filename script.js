// 1. Manejo del Formulario con Conexión Real al Backend
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Capturamos los datos
            const nombre = contactForm.querySelector('input[type="text"]').value.trim();
            const whatsapp = contactForm.querySelector('input[type="tel"]').value.trim();
            const tipo_negocio = contactForm.querySelector('select').value;

            // Validación de seguridad (No mandamos basura al server)
            if (nombre === "" || whatsapp === "") {
                alert("⚠️ Por favor, rellena tu nombre y WhatsApp.");
                return;
            }

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "ENVIANDO SOLICITUD...";
            btn.disabled = true;

            // --- AQUÍ EMPIEZA LA CONEXIÓN REAL ---
            fetch('http://localhost:3000/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    whatsapp: whatsapp,
                    tipo_negocio: tipo_negocio
                })
            })
            .then(response => {
                if (!response.ok) throw new Error("Error en el servidor");
                return response.json();
            })
            .then(data => {
                // Si el servidor responde OK, recién ahí mostramos el éxito
                alert(`¡Gracias ${nombre}! Tu solicitud fue guardada en nuestra base de datos.`);
                contactForm.reset();
            })
            .catch(error => {
                // Si el servidor está APAGADO o hubo un error, salta esto
                console.error("Error al conectar:", error);
                alert("❌ Error: No se pudo conectar con el servidor. ¿Está encendido?");
            })
            .finally(() => {
                // Esto se ejecuta SIEMPRE, para devolver el botón a su estado original
                btn.innerText = originalText;
                btn.disabled = false;
            });
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
