const contactForm = document.getElementById("contactForm");
const statusMessage = document.getElementById("statusMessage");
const successNameSpan = document.getElementById("successName");
const formWrapper = document.getElementById("form-wrapper");
const successMessageDiv = document.getElementById("success-message");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que la página se recargue

  // Bloqueamos el botón para evitar doble clic
  const btn = document.getElementById("btnEnviar");
  btn.disabled = true;
  // Verificación de seguridad para que el script no muera si el div no está
  if (!statusMessage) {
    console.error("No se encontró el elemento 'statusMessage' en el HTML");
    return;
  }

  statusMessage.innerText = "Procesando tu solicitud...";
  statusMessage.classList.remove("text-red-500", "text-green-500");

  const data = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    negocio: document.getElementById("tipoNegocio").value, // Chequeá que el select tenga este ID
  };

  try {
    const response = await fetch(
      "https://evonectech-api.fedepedano2003.workers.dev/",
      {
        // <-- TU URL AQUÍ
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    if (response.ok) {
      // 1. Personalizamos el mensaje con el nombre del usuario (Toque PRO)
      successNameSpan.innerText = document.getElementById("nombre").value;
      // PASO 1: Desvanecer el formulario (Fade Out)
      formWrapper.classList.remove("opacity-100", "translate-y-0");
      formWrapper.classList.add("opacity-0", "-translate-y-4"); // Se va hacia arriba y desaparece

      // Esperamos 500ms (lo que dura la animación) antes de quitarlo del HTML
      setTimeout(() => {
        formWrapper.classList.add("hidden"); // Lo sacamos del flujo

        // PASO 2: Preparar el mensaje de éxito (sigue invisible pero ya ocupa espacio)
        successMessageDiv.classList.remove("hidden");

        // Pequeño truco: Esperamos 50ms para que el navegador procese el "display: block"
        // antes de activar la animación de entrada.
        setTimeout(() => {
          successMessageDiv.classList.remove("opacity-0", "translate-y-4");
          successMessageDiv.classList.add("opacity-100", "translate-y-0"); // Aparece suavemente
          successMessageDiv.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 50);
      }, 500); // Este tiempo debe coincidir con el duration-500 del HTML
    } else {
      statusMessage.innerText = "Error al enviar. Intenta de nuevo.";
    }
  } catch (error) {
    console.error("EL CULPABLE ES ESTE:", error);
    statusMessage.innerText = "Error de conexión con el servidor.";
  } finally {
    btn.disabled = false;
  }
});
