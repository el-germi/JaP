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







  document.getElementById("formulario").addEventListener("submit", e => {
    e.preventDefault();

    const isValid = validarCampos()

    if (!isValid) {
        e.stopPropagation();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Complete los espacios en rojo!',
        });
    } else {
        setTimeout(() => {
            formulario.submit();
            document.location.reload();
        }, 3000);
        Swal.fire({
            icon: 'success',
            title: 'Datos Guardados correctamente'
        });
    }
    formulario.classList.add('was-validated');
});

function validarCampos() {
    const campos = document.querySelectorAll(".needs-validation");

    for (const campo of campos) {
        if (!campo.value.trim()) {
      
            campo.classList.add('is-invalid');
            return false;
        } else {
            campo.classList.remove('is-invalid');
        }
    }

    return true;
}


const botonPerfil = document.getElementById("BotonPerfil")
botonPerfil.addEventListener("click", ()=>{

  document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();

    const datosUsuario = {};

    const campos = document.querySelectorAll(".input");
    campos.forEach(campo => {
        datosUsuario[campo.id] = campo.value;
    });

  
    localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

           })
 })


 window.addEventListener("load", function () {
  const datosGuardados = localStorage.getItem("datosUsuario");
  if (datosGuardados) {
      const datosUsuario = JSON.parse(datosGuardados);
      const campos = document.querySelectorAll(".input");
      campos.forEach(campo => {
          campo.value = datosUsuario[campo.id] || '';
          
          // Deshabilitar campos que tienen datos cargados
          if (campo.value.trim() !== '') {
              campo.setAttribute('disabled', true);
              const spans = document.querySelectorAll(".input + span");
                spans.forEach(span => {
                    span.parentNode.removeChild(span);
                });
          }
      });
  }
});