document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío inmediato del formulario

        // Mostrar mensaje de confirmación
        const confirmationMessage = document.createElement("div");
        confirmationMessage.textContent = "✅ ¡Mensaje enviado con éxito!";
        confirmationMessage.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            font-size: 16px;
            z-index: 1000;
        `;
        document.body.appendChild(confirmationMessage);

        // Ocultar el mensaje después de unos segundos
        setTimeout(() => {
            confirmationMessage.remove();
            form.submit(); // Envía el formulario después de mostrar el mensaje
        }, 2000);
    });
});