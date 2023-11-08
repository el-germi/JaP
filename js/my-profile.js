let btnSwitch = document.getElementById("switch");

// Recupera el estado del modo oscuro desde el localStorage
const isDarkMode = localStorage.getItem("darkMode") === "true";

// Aplica el modo oscuro si estaba activado
if (isDarkMode) {
  document.body.classList.add("dark");
  btnSwitch.classList.add("active");
}

// Agrega un evento de clic al botón
btnSwitch.addEventListener("click", () => {
    // Alterna la clase "dark" en el cuerpo del documento
    document.body.classList.toggle("dark");

    // Alterna la clase "active" en el propio botón
    btnSwitch.classList.toggle("active");

    // Guarda el estado actual del modo oscuro en el localStorage
    const isDarkModeActive = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDarkModeActive);
});

//funcion para obtener email de localstorage

 const datoRecuperado = localStorage.getItem("email");
        if (datoRecuperado) {
            document.getElementById("email").value = datoRecuperado;
  }

//funcion para cambiar foto de perfil

  function cambiarFotoDePerfil() {
    const inputElement = document.getElementById('formFileSm');
    const imageElement = document.getElementById('profile-image');
  
    if (inputElement.files && inputElement.files[0]) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        imageElement.src = e.target.result;
  
        localStorage.setItem('profileImage', e.target.result);
      };
  
      reader.readAsDataURL(inputElement.files[0]);
    }
  }
  
  window.onload = function () {
    const storedImage = localStorage.getItem('profileImage');
    const imageElement = document.getElementById('profile-image');
  
    if (storedImage) {
      imageElement.src = storedImage;
    }
  };