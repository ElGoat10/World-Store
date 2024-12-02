// Obtener el modal
var modal = document.getElementById('loginModal');
var modal2 = document.getElementById('registerModal');

// Obtener el botón que abre el modal
var btn = document.getElementById("userBtn");

// Cuando el usuario haga clic en el botón, abrir el modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Cuando el usuario haga clic en cualquier lugar fuera del modal, cerrarlo
modal.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
modal2.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const showRegisterLink = document.getElementById("showRegisterForm");
  const showLoginLink = document.getElementById("showLoginForm");

  // Mostrar formulario de registro y ocultar el de inicio de sesión
  showRegisterLink.addEventListener("click", function(event) {
      event.preventDefault();
      loginModal.style.display = "none";
      registerModal.style.display = "block";
  });

  // Mostrar formulario de inicio de sesión y ocultar el de registro
  showLoginLink.addEventListener("click", function(event) {
      event.preventDefault();
      registerModal.style.display = "none";
      loginModal.style.display = "block";
  });
});