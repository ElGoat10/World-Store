document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    
    var inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    var isValid = true;
  
    inputs.forEach(function(input) {
      if (input.value.trim() === '') {
        isValid = false;
      }
    });
  
    // Validación de los campos
    if (!isValid) {
      document.getElementById('formError').textContent = 'Por favor complete todos los campos.';
      document.getElementById('formError').style.display = 'block'; // Mostrar el mensaje de error
      return false; // Evitar el envío del formulario si hay error
    }
  
    // Si llega aquí, el formulario es válido
    // Redireccionar a la página de inicio
    window.location.href = 'index.html'; // Cambia 'index.html' por la URL de tu página de inicio
  });
  
  // Limpiar mensajes de error al escribir en los campos
  document.querySelectorAll('input, textarea').forEach(function(element) {
    element.addEventListener('input', function() {
      document.getElementById('formError').textContent = ''; // Limpiar el mensaje de error
      document.getElementById('formError').style.display = 'none'; // Ocultar el mensaje de error
    });
  });