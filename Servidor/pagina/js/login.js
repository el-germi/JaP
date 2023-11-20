document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login").addEventListener("click", async () => {

        const email = document.getElementById("inputEmail").value;
        const password = document.getElementById("inputPassword").value;

        try {
            
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {

                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("email", email);
                location.href = "./index.html"; 

            } else {

                const errorMensaje = await response.json();
                Swal.fire("Error!", errorMensaje.error, "error");

            }

        } catch (error) {

            console.error('Error:', error);
            Swal.fire("Error!", "Ocurrió un error al querer iniciar sesión", "error");

        }
    });
});

//obtener email del usuario
function guardarDato() {
    localStorage.getItem("email");
}