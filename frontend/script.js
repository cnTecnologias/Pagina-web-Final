// 1. Manejo del Formulario con Conexión Real al Backend
    const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = contactForm.querySelector('input[type="text"]').value.trim();
        const whatsapp = contactForm.querySelector('input[type="tel"]').value.trim();
        const tipo_negocio = contactForm.querySelector('select').value;

        if (nombre === "" || whatsapp === "") {
            alert("⚠️ Por favor, rellena tu nombre y WhatsApp.");
            return;
        }

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "ENVIANDO SOLICITUD...";
        btn.disabled = true;

        fetch('http://localhost:3000/api/contacto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, whatsapp, tipo_negocio })
        })
        .then(response => {
            if (!response.ok) throw new Error("Error en el servidor");
            return response.json();
        })
        .then(data => {
            // USAMOS EL PADRE DEL FORMULARIO PARA QUE LA ANIMACIÓN NO LO BORRE
            const container = contactForm.parentElement;
            container.innerHTML = `
                <div class="text-center py-10" style="opacity: 1 !important; transform: none !important;">
                    <div class="bg-green-500/20 text-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-2 text-white">¡Solicitud Enviada!</h3>
                    <p class="text-gray-400">Gracias <strong>${nombre}</strong>. En breve te escribiremos por <strong>WhatsApp</strong> para activar tu demo.</p>
                    <button onclick="location.reload()" class="mt-6 text-sm text-blue-400 hover:underline">Volver a enviar</button>
                </div>
            `;
        })
        .catch(error => {
            console.error("Error:", error);
            alert("❌ Error de conexión. Verificá que el servidor esté corriendo.");
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
